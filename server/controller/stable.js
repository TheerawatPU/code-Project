import db from "../db.js";

//อ่านข้อมูลทั้งหมดของวัตถุดิบ
export const stapleRead = (req, res) => {
  const sql =
    "SELECT staple.id_staple,staple.Name_staple ,staple.Name_INCIname,staple.reOrder , lots.cost , lots.amount FROM staple INNER JOIN lots ON staple.id_staple = lots.id_staple WHERE lots.expiration_date = (SELECT MAX(expiration_date) FROM lots WHERE lots.id_staple = staple.id_staple) GROUP BY staple.id_staple";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

//อ่านข้อมูลทั้งหมดของวัตถุดิบใช้ในการเพิ่มวัตถุดิบ
export const stapleRead_lot = (req, res) => {
  const sql = "SELECT * FROM `staple`";
  // "SELECT staple.id_staple,staple.Name_staple ,staple.Name_INCIname,staple.reOrder , lots.cost , lots.amount FROM staple INNER JOIN lots ON staple.id_staple = lots.id_staple WHERE lots.expiration_date = (SELECT MAX(expiration_date) FROM lots WHERE lots.id_staple = staple.id_staple) GROUP BY staple.id_staple";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

//อ่านข้อมูลทั้งของวัตถุดิบพร้อมเช็คเงื่อนไข
export const stabletest = (req, res) => {
  const sql =
    "SELECT staple.id_staple,staple.Name_staple ,staple.Name_INCIname,staple.reOrder , lots.cost , lots.amount FROM staple INNER JOIN lots ON staple.id_staple = lots.id_staple WHERE lots.expiration_date = (SELECT MAX(expiration_date) FROM lots WHERE lots.id_staple = staple.id_staple) GROUP BY staple.id_staple";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });

    const data = result;
    const newData = data.map((item) => ({
      ...item,
      textColor: item.reOrder > item.amount ? "red" : "black",
    }));

    return res.json(newData);
  });
};

//อ่านข้อมูลของรายการสั่งซื้อ
export const buylist = (req, res) => {
  const sql =
    "SELECT staple.id_staple,staple.Name_staple ,staple.Name_INCIname,staple.reOrder , lots.cost , lots.amount FROM staple INNER JOIN lots ON staple.id_staple = lots.id_staple WHERE lots.expiration_date = (SELECT MAX(expiration_date) FROM lots WHERE lots.id_staple = staple.id_staple) GROUP BY staple.id_staple";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

//เพิ่มข้อมูลวัตถุดิบ
export const stapleNew = (req, res) => {
  const sql =
    "INSERT INTO staple (`Name_staple`,`Name_INCIname`,`howUsing`,`howMixing`,`saving`,`melting`,`reOrder`,`id_employee`) VALUES (?)";
  const vlaues = [
    req.body.Name_staple,
    req.body.Name_INCIname,
    req.body.howUsing,
    req.body.howMixing,
    req.body.saving,
    req.body.melting,
    req.body.reOrder,
    req.body.id_employee,
  ];

  db.query(sql, [vlaues], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
};


//เพิ่มข้อมูลLot
export const LotNew = (req, res) => {
  const sql =
    "INSERT INTO lots (`expiration_date`,`cost`,`amount`,`amount_re`,`COA_name`,`MSDS_name`,`id_staple`,`id_employee`) VALUES (?)";
  const vlaues = [
    req.body.expiration_date,
    req.body.cost,
    req.body.amount,
    req.body.amount_re,
    req.body.COA_name,
    req.body.MSDS_name,
    req.body.id_staple,
    req.body.id_employee,
  ];

  db.query(sql, [vlaues], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
};

//อ่านข้อมูลแต่ละ ID
export const stableID = (req, res) => {
  const sql =
    "SELECT `id_staple`,`Name_staple`,`Name_INCIname`,`howUsing`,`howMixing`,`saving`,`melting`,`reOrder` FROM `staple`  WHERE `id_staple` = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

//อ่านข้อมูลที่จะแก้ไข
export const stableIdUpdate = (req, res) => {
  const sql = "SELECT * FROM `staple`  WHERE id_staple = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

//อัพเดตข้อมูลวัตถุดิบ
export const stableUpdate = (req, res) => {
  const id = req.params.id;
  const sql =
    "UPDATE staple SET `Name_staple`= ? , `Name_INCIname`= ? , `howUsing` = ? , `howMixing`= ? , `saving`= ? , `melting`= ? , `reOrder`= ?   WHERE `id_staple`=?";
  db.query(
    sql,
    [
      req.body.Name_staple,
      req.body.Name_INCIname,
      req.body.howUsing,
      req.body.howMixing,
      req.body.saving,
      req.body.melting,
      req.body.reOrder,
      id,
    ],
    (err, result) => {
      if (err) {
        return res.json({ Message: "Error inside server" });
      }
      return res.json(result);
    }
  );
};
