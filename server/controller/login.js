import db from "../db.js";


// อ่านข้อมูลวัตถุดิบในselect
export const login = (req, res) => {
    const sql = "SELECT DISTINCT(Name_staple), id_staple FROM staple";
    db.query(sql, (err, result) => {
      if (err) return res.json({ Message: "Error inside server" });
      return res.json(result);
    });
  };