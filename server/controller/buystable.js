import db from "../db.js";

// เพิ่ม buy_staple และ detail_buystaple พร้อมกัน
export const buystableNew = (req, res) => {
  const { buy_staple, detail_buystaple } = req.body;

  // เพิ่ม buy_staple ลงในตาราง unit
  const createUnitSql =
    "INSERT INTO buy_staple(day_buy,day_admit_staple,store,refer_id,note,id_employee) VALUES (?,?,?,?,?,?)";
  db.query(
    createUnitSql,
    [
      buy_staple.day_buy,
      buy_staple.day_admit_staple,
      buy_staple.store,
      buy_staple.refer_id,
      buy_staple.note,
      buy_staple.id_employee,
    ],
    (err, UnitResult) => {
      if (err) {
        console.error("เกิดข้อผิดพลาดในการเพิ่มวัตถุดิบ: " + err.message);
        res.status(500).json({ error: "เกิดข้อผิดพลาดในการเพิ่มวัตถุดิบ" });
        return;
      }

      const UnitId = UnitResult.insertId;

      // เพิ่ม detail_buystaple ลงในตาราง detail_buystaple
      const detail_unitPromises = detail_buystaple.map((detail_buystaple) => {
        return new Promise((resolve, reject) => {
          const createDetail_unitSql =
            "INSERT INTO detail_buystaple(amount_staple,id_staple,id_buylist) VALUES (?, ?, ?)";
          db.query(
            createDetail_unitSql,
            [
              detail_buystaple.amount_staple,
              detail_buystaple.id_staple,
              UnitId,
            ],
            (err, detail_unitResult) => {
              if (err) {
                console.error(
                  "เกิดข้อผิดพลาดในการเพิ่มรายละเอียดสูตร: " + err.message
                );
                reject(err);
              } else {
                resolve(detail_unitResult.insertId);
              }
            }
          );
        });
      });

      Promise.all(detail_unitPromises)
        .then((detail_unitIds) => {
          res.status(201).json({
            message: "เพิ่ม buy_staple และ detail_buystaple สำเร็จ",
            UnitId,
            detail_unitIds,
          });
        })
        .catch((err) => {
          console.error(
            "เกิดข้อผิดพลาดในการเพิ่มรายละเอียดสูตร1: " + err.message
          );
          res
            .status(500)
            .json({ error: "เกิดข้อผิดพลาดในการเพิ่มรายละเอียดสูตร2" });
        });
    }
  );
};

// อ่านข้อมูลสั่งวัตถุดิบทั้งหมด
export const buystableRead = (req, res) => {
  const sql =
    "SELECT `id_buylist`, DATE_FORMAT(buy_staple.day_buy, '%d/%m/%Y') AS day_buy , DATE_FORMAT(buy_staple.`day_admit_staple`, '%d/%m/%Y') AS day_admit_staple , `store`, `refer_id`, `note`, employees.name FROM `buy_staple` INNER JOIN employees ON buy_staple.id_employee = employees.id_employee ORDER BY id_buylist DESC";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

// อ่านข้อมูลสั่งวัตถุดิบแต่ละไอดี
export const buystableID = (req, res) => {
  const id = req.params.id;

  const sqlUnit =
    "SELECT buy_staple.id_buylist , buy_staple.store,DATE_FORMAT(buy_staple.day_buy, '%d/%m/%Y') AS day_buy,DATE_FORMAT(buy_staple.day_admit_staple, '%d/%m/%Y') AS day_admit_staple,buy_staple.refer_id,buy_staple.note,employees.name,staple.Name_staple,detail_buystaple.amount_staple FROM buy_staple INNER JOIN employees ON buy_staple.id_employee = employees.id_employee  INNER JOIN detail_buystaple ON  buy_staple.id_buylist = detail_buystaple.id_buylist INNER JOIN staple ON detail_buystaple.id_staple = staple.id_staple WHERE buy_staple.id_buylist = ?";
  const sqlDetail_unit =
    "SELECT detail_buystaple.id_buylist , staple.Name_staple, staple.Name_INCIname , detail_buystaple.amount_staple FROM detail_buystaple INNER JOIN staple ON detail_buystaple.id_staple = staple.id_staple WHERE id_buylist = ?";

  db.query(sqlUnit, [id], (err, unitResults) => {
    if (err) {
      return res.json({
        Message: "เกิดข้อผิดพลาดในการดึงข้อมูลรายการสั่งซื้อ",
      });
    } else {
      db.query(sqlDetail_unit, [id], (err, detail_unit) => {
        if (err) {
          return res.json({
            Message: "เกิดข้อผิดพลาดในการดึงข้อมูลวัตถุดิบในรายการสั่งซื้อ",
          });
        } else {
          res.json({ unitResults: unitResults[0], detail_unit });
        }
      });
    }
  });
};
