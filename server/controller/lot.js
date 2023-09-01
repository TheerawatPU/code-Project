import db from "../db.js";

// อ่านข้อมูลวัตถุดิบในselect
export const lotReadSelect = (req, res) => {
  const sql = "SELECT DISTINCT(Name_staple) FROM staple";
  db.query(sql, (err, result) => {
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
    "SELECT  lots.id_lot , DATE_FORMAT(lots.expiration_date, '%d/%m/%Y') AS expiration_date,lots.cost,lots.amount,lots.amount_re,lots.COA_name,lots.MSDS_name FROM `staple` INNER JOIN lots ON staple.id_staple = lots.id_staple WHERE staple.Name_staple = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

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
