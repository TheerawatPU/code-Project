import db from "../db.js";

// อ่านข้อมูลสูตรผลิต
export const unitRead = (req, res) => {
  const sql =
    "SELECT unit.id_unit,unit.unit_name,DATE_FORMAT(unit.day_admit_list, '%d/%m/%Y') AS day_admit_list,unit.notification_num, DATE_FORMAT(unit.date_notification_num, '%d/%m/%Y') AS date_notification_num,customer.name_cus,employees.name FROM `unit` INNER JOIN customer ON unit.id_customer = customer.id_customer INNER JOIN employees ON unit.id_employee = employees.id_employee ORDER BY unit.id_unit DESC";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

// เพิ่ม Unit และ detail_Unit พร้อมกัน
export const newAddUnit = (req, res) => {
  const { unit, detail_unit } = req.body;

  // เพิ่ม Unit ลงในตาราง unit
  const createUnitSql =
    "INSERT INTO unit (unit_name,day_admit_list,date_notification_num,notification_num,id_customer,id_employee) VALUES (?,?,?,?,?,?)";
  db.query(
    createUnitSql,
    [
      unit.unit_name,
      unit.day_admit_list,
      unit.date_notification_num,
      unit.notification_num,
      unit.id_customer,
      unit.id_employee,
    ],
    (err, UnitResult) => {
      if (err) {
        console.error("เกิดข้อผิดพลาดในการเพิ่มวัตถุดิบ: " + err.message);
        res.status(500).json({ error: "เกิดข้อผิดพลาดในการเพิ่มวัตถุดิบ" });
        return;
      }

      const UnitId = UnitResult.insertId;

      // เพิ่ม detail_unit ลงในตาราง detail_unit
      const detail_unitPromises = detail_unit.map((detail_unit) => {
        return new Promise((resolve, reject) => {
          const createDetail_unitSql =
            "INSERT INTO detail_unit (AmountP,id_staple,id_unit) VALUES (?, ?, ?)";
          db.query(
            createDetail_unitSql,
            [detail_unit.AmountP, detail_unit.id_staple, UnitId],
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
            message: "เพิ่ม unit และ detail_unit สำเร็จ",
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

// อ่านข้อมูลแต่ละไอดี
export const UreadID = (req, res) => {
  const id = req.params.id;

  const sqlUnit =
    "SELECT unit.id_unit,unit.unit_name,DATE_FORMAT(unit.day_admit_list, '%d/%m/%Y') AS day_admit_list,unit.notification_num, DATE_FORMAT(unit.date_notification_num, '%d/%m/%Y') AS date_notification_num,customer.name_cus,employees.name ,staple.Name_staple,  detail_unit.AmountP FROM `unit` INNER JOIN customer ON unit.id_customer = customer.id_customer  INNER JOIN employees ON unit.id_employee = employees.id_employee  INNER JOIN detail_unit ON  unit.id_unit = detail_unit.id_unit  INNER JOIN staple ON detail_unit.id_staple = staple.id_staple WHERE unit.id_unit = ?";
  const sqlDetail_unit =
    "SELECT detail_unit.id_unit , staple.Name_staple, staple.Name_INCIname , detail_unit.AmountP FROM detail_unit INNER JOIN staple ON detail_unit.id_staple = staple.id_staple WHERE id_unit = ?";

  db.query(sqlUnit, [id], (err, unitResults) => {
    if (err) {
      return res.json({ Message: "เกิดข้อผิดพลาดในการดึงข้อมูลสูตร" });
    } else {
      db.query(sqlDetail_unit, [id], (err, detail_unit) => {
        if (err) {
          return res.json({
            Message: "เกิดข้อผิดพลาดในการดึงข้อมูลวัตถุดิบในสูตร",
          });
        } else {
          res.json({ unitResults: unitResults[0], detail_unit });
        }
      });
    }
  });
};

// อ่านข้อมูลแต่ละไอดี
export const UreadID1 = (req, res) => {
  const id = req.params.id;

  const sqlUnit =
    "SELECT unit.id_unit,unit.unit_name,DATE_FORMAT(unit.day_admit_list, '%d/%m/%Y') AS day_admit_list,unit.notification_num, DATE_FORMAT(unit.date_notification_num, '%d/%m/%Y') AS date_notification_num,customer.name_company,customer.name_cus,employees.name,customer.phone_cus,CONCAT(customer.address_cus , ' ตำบล' , customer.subdistricts , ' อำเภอ' , customer.districts , '  จังหวัด' , customer.provinces , ' รหัสไปรษณี ' , customer.zip_code) AS address_customer ,staple.Name_staple,  detail_unit.AmountP FROM `unit` INNER JOIN customer ON unit.id_customer = customer.id_customer  INNER JOIN employees ON unit.id_employee = employees.id_employee  INNER JOIN detail_unit ON  unit.id_unit = detail_unit.id_unit  INNER JOIN staple ON detail_unit.id_staple = staple.id_staple WHERE unit.id_unit = ?;";
  const sqlDetail_unit =
    "SELECT detail_unit.id_unit , staple.Name_staple, staple.Name_INCIname , detail_unit.AmountP FROM detail_unit INNER JOIN staple ON detail_unit.id_staple = staple.id_staple WHERE id_unit = ?";

  db.query(sqlUnit, [id], (err, unitResults) => {
    if (err) {
      return res.json({ Message: "เกิดข้อผิดพลาดในการดึงข้อมูลสูตร" });
    } else {
      db.query(sqlDetail_unit, [id], (err, detail_unit) => {
        if (err) {
          return res.json({
            Message: "เกิดข้อผิดพลาดในการดึงข้อมูลวัตถุดิบในสูตร",
          });
        } else {
          res.json({ unitResults: unitResults[0], detail_unit });
        }
      });
    }
  });
};
