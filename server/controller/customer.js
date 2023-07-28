import db from "../db.js";

//เพิ่มข้อมูล
export const cuscreate = (req, res) => {
  const sql =
    "INSERT INTO customer (`name_company`,`name_cus`,`card_ID`,`email_cus`,`phone_cus`,`address_cus`,`provinces`,`districts`,`subdistricts`,`zip_code`) VALUES (?)";
  const vlaues = [
    req.body.name_company,
    req.body.name_cus,
    req.body.card_ID,
    req.body.email_cus,
    req.body.phone_cus,
    req.body.address_cus,
    req.body.provinces,
    req.body.districts,
    req.body.subdistricts,
    req.body.zip_code,
  ];

  db.query(sql, [vlaues], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
};

//อ่านข้อมูลทั้งหมด
export const customer = (req, res) => {
  const sql =
    "SELECT `id_customer`,`name_company`,`name_cus`,`card_ID`,`email_cus`,`phone_cus`, CONCAT(`address_cus`, ' ',`provinces`, ' ', `districts`, ' ', `subdistricts`,' ',`zip_code`) As address FROM `customer` ORDER BY `id_customer`DESC";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

//อ่านข้อมูลแต่ละ ID
export const customerID = (req, res) => {
  const sql =
    "SELECT `id_customer`,`name_company`,`name_cus`,`card_ID`,`email_cus`,`phone_cus`, CONCAT(`address_cus`, ' ',`provinces`, ' ', `districts`, ' ', `subdistricts`,' ',`zip_code`) As address FROM `customer`  WHERE id_customer = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

// todo1  ดึงข้อมูลมาแสดง//
//อ่านข้อมูลที่จะแก้ไข
export const customerUpdate = (req, res) => {
  const sql = "SELECT * FROM `customer`  WHERE id_customer = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

// todo2  แก้ไขเสร็จบันทึกลงฐานข้อมูล//
//แก้ไขข้อมูล
export const customerUp = (req, res) => {
  const id = req.params.id;
  const sql =
    "UPDATE customer SET `name_company` = ? , `name_cus` = ? ,`card_ID` = ? ,`email_cus` = ? ,`phone_cus` = ? ,`address_cus` = ? ,`provinces` = ? ,`districts`=?, `subdistricts`=?,`zip_code`=? WHERE id_customer=?";

  db.query(
    sql,
    [
      req.body.name_company,
      req.body.name_cus,
      req.body.card_ID,
      req.body.email_cus,
      req.body.phone_cus,
      req.body.address_cus,
      req.body.provinces,
      req.body.districts,
      req.body.subdistricts,
      req.body.zip_code,
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
//todo สิ้นสุด//




//ลบข้อมูล
export const customerDelete = (req, res) => {
  const sql = "DELETE FROM `customer`  WHERE id_customer = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

