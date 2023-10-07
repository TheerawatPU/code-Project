import db from "../db.js";

// อ่านข้อมูลสูตรผลิต
export const productRead = (req, res) => {
  const sql = "SELECT * FROM `productorder`";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

// อ่านข้อมูลสูตรผลิต
export const Unit_staple = (req, res) => {
  const id = req.params.id;

  const sql =
    "SELECT * FROM unit INNER JOIN detail_unit ON unit.id_unit = detail_unit.id_unit INNER JOIN staple ON detail_unit.id_staple = staple.id_staple   WHERE unit.id_unit = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

export const Product_detail = (req, res) => {
  const id = req.params.id;

  const sql = `
  SELECT lots.id_lot , lots.cost,  DATE_FORMAT(lots.expiration_date, '%d/%m/%Y') AS expiration_date, lots.amount,lots.amount_re, staple.id_staple AS id_staple, staple.Name_staple FROM lots INNER JOIN staple ON lots.id_staple = staple.id_staple WHERE lots.expiration_date > NOW() AND staple.id_staple = ? `;

  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};
