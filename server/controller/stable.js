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
