import db from "../db.js";

// อ่านข้อมูลสูตรผลิต
export const unitRead = (req, res) => {
  const sql =
    "SELECT unit.id_unit,unit.unit_name,unit.day_admit_list,unit.notification_num,unit.date_notification_num,customer.name_cus FROM `unit` INNER JOIN customer ON unit.id_customer = customer.id_customer";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};
