import db from "../db.js";

// อ่านข้อมูลวัตถุดิบในselect
export const lotReadSelect = (req, res) => {
  const sql = "SELECT DISTINCT(Name_staple), id_staple FROM staple";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

// อ่าน id  ของ lot วัตถุดิบนั้น
export const lot_ID = (req, res) => {
  const sql =
    "SELECT lots.id_lot , staple.Name_staple FROM lots INNER JOIN staple ON lots.id_staple = staple.id_staple WHERE lots.id_staple = ?  ORDER BY id_lot DESC";
  const id = req.params.id;

  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

// อ่านข้อมูลวัตถุดิบในselect
export const lotReadSelectID = (req, res) => {
  const sql =
    "SELECT DISTINCT(Name_staple), id_staple FROM staple WHERE id_staple = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

//อ่านข้อมูลทั้งหมดของlot ตามชื่อวัตถุดิบที่เลือก
// app.get('/tableData/:category', (req, res) => {
//     const category = req.params.category;
//     const sql = 'SELECT * FROM items WHERE category = ?';
//     db.query(query, [category], (err, results) => {
//       if (err) throw err;
//       res.json(results);
//     });
//   });

export const lotTable = (req, res) => {
  const sql =
    "SELECT  lots.id_lot , DATE_FORMAT(lots.expiration_date, '%d/%m/%Y') AS expiration_date,lots.cost,lots.amount,lots.amount_re,lots.COA_name,lots.MSDS_name ,employees.name FROM `staple` INNER JOIN lots ON staple.id_staple = lots.id_staple INNER JOIN employees ON lots.id_employee = employees.id_employee WHERE staple.id_staple = ? ORDER BY  lots.id_lot DESC";
  const id = req.params.id;

  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

export const lotTable_Unit = (req, res) => {
  const sql =
    "SELECT lots.id_lot, DATE_FORMAT(lots.expiration_date, '%d/%m/%Y') AS expiration_date, lots.cost, lots.amount, lots.amount_re, employees.name FROM `staple` INNER JOIN lots ON staple.id_staple = lots.id_staple INNER JOIN employees ON lots.id_employee = employees.id_employee WHERE staple.id_staple = ? ORDER BY ABS(DATEDIFF(lots.expiration_date, NOW())) DESC";
  const id = req.params.id;

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.json({ Message: "Error inside server" });
    }

    // ตรวจสอบว่าสินค้าหมดอายุหรือไม่
    const today = new Date();
    const products = result.map((product) => {
      const expirationDate = new Date(product.expiration_date);
      product.expired = today > expirationDate;
      return product;
    });

    return res.json(products); // ส่งผลลัพธ์กลับให้ client
  });
};

// export const lotTable_Unit = (req, res) => {
//   const sql =
//     "SELECT  lots.id_lot , DATE_FORMAT(lots.expiration_date, '%d/%m/%Y') AS expiration_date,lots.cost,lots.amount,lots.amount_re,employees.name FROM `staple` INNER JOIN lots ON staple.id_staple = lots.id_staple INNER JOIN employees ON lots.id_employee = employees.id_employee WHERE staple.id_staple = ? ORDER BY  lots.expiration_date ASC";
//   const id = req.params.id;

//   db.query(sql, [id], (err, result) => {
//     if (err) return res.json({ Message: "Error inside server" });
//     return res.json(result);
//   });
// };

//! lot หน้าโชว์ตาราง และแสดงรายชื่อผู้บันทึกเข้าสู่ระบบ
// SELECT staple.Name_staple , lots.expiration_date,lots.cost,lots.amount,lots.amount_re,employees.id_employee,employees.name,employees.username FROM lots
// INNER JOIN employees ON lots.id_employee = employees.id_employee
// INNER JOIN staple ON lots.id_staple = staple.id_staple

//lotShowTable
// export const LotShowTable = (req, res) => {
//   const sql = "";
//   db.query(sql, (err, result) => {
//     if (err) return res.json({ Message: "Error inside server" });
//     return res.json(result);
//   });
// };
