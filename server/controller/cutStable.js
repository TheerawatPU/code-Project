import db from "../db.js";

export const Lot_Stable1 = (req, res) => {
  const sql =
    "SELECT staple.id_staple, lots.id_lot, lots.amount_re FROM `staple` INNER JOIN lots ON staple.id_staple = lots.id_staple  WHERE staple.id_staple = ? ORDER BY ABS(DATEDIFF(lots.expiration_date, NOW())) DESC";
  const id = req.params.id;

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.json({ Message: "Error inside server" });
    }
    return res.json(result);

    // ตรวจสอบว่าสินค้าหมดอายุหรือไม่
    // const today = new Date();
    // const products = result.map((product) => {
    //   const expirationDate = new Date(product.expiration_date);
    //   product.expired = today > expirationDate;
    //   return product;
    // });

    // return res.json(products); // ส่งผลลัพธ์กลับให้ client
  });
};

export const lotTable = (req, res) => {
  const sql =
    "SELECT  lots.id_lot , DATE_FORMAT(lots.expiration_date, '%d/%m/%Y') AS expiration_date,lots.cost,lots.amount,lots.amount_re,lots.COA_name,lots.MSDS_name ,employees.name FROM `staple` INNER JOIN lots ON staple.id_staple = lots.id_staple INNER JOIN employees ON lots.id_employee = employees.id_employee WHERE staple.id_staple = ? ORDER BY  lots.id_lot DESC";
  const id = req.params.id;

  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

export const table_cutStock = (req, res) => {
  const sql =
    "SELECT cut_stock.id_cutStock , DATE_FORMAT(cut_stock.date_cutStock, '%d/%m/%Y') AS date_cutStock , staple.Name_staple , cut_stock.id_lot , cut_stock.amount_old , cut_stock.amount_total , cut_stock.cause , cut_stock.details_cutStock  , employees.name FROM cut_stock INNER JOIN staple ON cut_stock.id_staple =  staple.id_staple  INNER JOIN lots ON cut_stock.id_lot =  lots.id_lot  INNER JOIN employees ON cut_stock.id_employee =  employees.id_employee ORDER BY cut_stock.id_cutStock DESC";

  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

//เพิ่มข้อมูล
export const cutStock_New = (req, res) => {
  const date_cutStock = new Date();

  const sql =
    "INSERT INTO cut_stock (`date_cutStock`,`id_staple`,`id_lot`,`amount_old`,`amount_total`,`cause`,`details_cutStock`,`id_employee`) VALUES (?)";

  const vlaues = [
    date_cutStock,
    req.body.id_staple,
    req.body.id_lot,
    req.body.amount_old,
    req.body.amount_total,
    req.body.cause,
    req.body.details_cutStock,
    req.body.id_employee,
  ];

  db.query(sql, [vlaues], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
};

//อัพเดตข้อมูล
export const cutStock_Up = (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE lots SET  `amount_re` = ?  WHERE id_lot = ?";

  db.query(sql, [req.body.amount_re, id], (err, result) => {
    if (err) {
      return res.json({ Message: "Error inside server" });
    }
    return res.json(result);
  });
};

// อ่านข้อมูล lot and amount_re
export const cutStock_ID = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT `id_lot` , `amount_re` FROM `lots` WHERE `id_lot` = ?";

  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};


// อ่านข้อมูล lot and amount_re
export const cutStock_ID_read = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT id_cutStock , DATE_FORMAT(cut_stock.date_cutStock, '%d/%m/%Y') AS date_cutStock ,staple.Name_staple,cut_stock.id_lot,amount_old,amount_total,cause,details_cutStock,employees.name FROM cut_stock INNER JOIN staple ON cut_stock.id_staple = staple.id_staple INNER JOIN lots ON cut_stock.id_lot = lots.id_lot INNER JOIN employees ON cut_stock.id_employee = employees.id_employee WHERE `id_cutStock` = ?";

  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};
