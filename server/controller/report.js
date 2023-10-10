import db from "../db.js";

//อ่านข้อมูลทั้งหมดของวัตถุดิบใช้ในการเพิ่มวัตถุดิบ
export const Report_Stable_Lot = (req, res) => {
  const sql = "SELECT * FROM `staple` ORDER BY id_staple DESC LIMIT 8";
  // "SELECT staple.id_staple,staple.Name_staple ,staple.Name_INCIname,staple.reOrder , lots.cost , lots.amount FROM staple INNER JOIN lots ON staple.id_staple = lots.id_staple WHERE lots.expiration_date = (SELECT MAX(expiration_date) FROM lots WHERE lots.id_staple = staple.id_staple) GROUP BY staple.id_staple";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

//อ่านข้อมูลทั้งหมดของวัตถุดิบใช้ในการเพิ่มวัตถุดิบ
export const Report_Stable_Count = (req, res) => {
  const sql = "SELECT COUNT(id_staple) as id_staple FROM `staple` ";
  // "SELECT staple.id_staple,staple.Name_staple ,staple.Name_INCIname,staple.reOrder , lots.cost , lots.amount FROM staple INNER JOIN lots ON staple.id_staple = lots.id_staple WHERE lots.expiration_date = (SELECT MAX(expiration_date) FROM lots WHERE lots.id_staple = staple.id_staple) GROUP BY staple.id_staple";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

//อ่านข้อมูลทั้งหมดของวัตถุดิบใช้ในการเพิ่มวัตถุดิบ
export const Report_Stable = (req, res) => {
  const sql =
    "SELECT s.id_staple, s.Name_staple ,s.Name_INCIname,s.reOrder, COALESCE(l.cost, 0) AS cost , COALESCE(l.amount_re, 0) AS amount_re FROM staple s LEFT JOIN ( SELECT id_staple, MAX(id_lot) AS latest_lot_id, cost , amount_re FROM lots GROUP BY id_staple ) AS latest_lots ON s.id_staple = latest_lots.id_staple LEFT JOIN lots l ON latest_lots.latest_lot_id = l.id_lot ORDER BY id_staple";
  // "SELECT staple.id_staple,staple.Name_staple ,staple.Name_INCIname,staple.reOrder , lots.cost , lots.amount FROM staple INNER JOIN lots ON staple.id_staple = lots.id_staple WHERE lots.expiration_date = (SELECT MAX(expiration_date) FROM lots WHERE lots.id_staple = staple.id_staple) GROUP BY staple.id_staple";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

// ("SELECT s.id_staple, s.Name_staple ,s.Name_INCIname,s.reOrder, COALESCE(l.cost, 0) AS cost , COALESCE(l.amount_re, 0) AS amount_re FROM staple s LEFT JOIN ( SELECT id_staple, MAX(id_lot) AS latest_lot_id, cost , amount_re FROM lots GROUP BY id_staple ) AS latest_lots ON s.id_staple = latest_lots.id_staple LEFT JOIN lots l ON latest_lots.latest_lot_id = l.id_lot ORDER BY id_staple DESC LIMIT 8");
