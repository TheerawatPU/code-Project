import db from "../db.js";
export const employeeRead = (req, res) => {
  const sql = "SELECT * FROM `employees` ";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};
