import db from "../db.js";

// โชว์ขข้อมูลพนักงาน
export const employeeRead = (req, res) => {
  const sql =
    "SELECT `id_employee`,`department`,`title`,`name`,`sex`, DATE_FORMAT(`birthday`, '%d/%m/%Y') AS birthday,`card_id`,`phone`,`line_id`,`facebook_id` FROM `employees` ORDER BY `id_employee`DESC";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

// เพิ่มข้อมูลพนักงาน
export const employeeNew = (req, res) => {
  const sql =
    "INSERT INTO employees (`department`,`status`,`title`,`name`,`sex`,`birthday`,`card_id`,`phone`,`line_id`,`facebook_id`,`username`,`password`,`image`) VALUES (?)";
  const vlaues = [
    req.body.department,
    req.body.status,
    req.body.title,
    req.body.name,
    req.body.sex,
    req.body.birthday,
    req.body.card_id,
    req.body.phone,
    req.body.line_id,
    req.body.facebook_id,
    req.body.username,
    req.body.password,
    req.body.image,
  ];

  db.query(sql, [vlaues], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
};

// เข้าสู่ระบบพนักงาน
// export const loginadmin = (req, res) => {
//   const sql =
//     "SELECT * FROM employees WHERE username`=? AND password` =? AND status='กำลังทำงาน'";
//   db.query(sql, [req.body.username, req.body.password], (err, data) => {
//     if (data.length > 0) {
//       const filteredData = data.map((item) => {
//         return {
//           id_employee: item.id_employee,
//           department: item.department,
//           status: item.status,
//           title: item.title,
//           name: item.name,
//           sex: item.sex,
//           birthday: item.birthday,
//           card_id: item.card_id,
//           phone: item.phone,
//           line_id: item.line_id,
//           facebook_id: item.facebook_id,
//           username: item.username,
//           password: item.password,
//           image: item.image,
//           Success: "เข้าสู่ระบบได้",
//         };
//       });

//       return res.json(filteredData);
//     } else {
//       return res.json("No record");
//     }
//   });
// };

export const loginadmin = (req, res) => {
  const sql =
    "SELECT * FROM employees WHERE username = ? AND password = ? AND status = 'กำลังทำงาน'";
  db.query(sql, [req.body.username, req.body.password], (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }

    if (data.length > 0) {
      const filteredData = data.map((item) => {
        return {
          id_employee: item.id_employee,
          department: item.department,
          status: item.status,
          title: item.title,
          name: item.name,
          sex: item.sex,
          birthday: item.birthday, // Fix the variable here
          card_id: item.card_id,
          phone: item.phone,
          line_id: item.line_id,
          facebook_id: item.facebook_id,
          username: item.username,
          password: item.password,
          image: item.image,
          Success: "เข้าสู่ระบบได้",
        };
      });

      return res.json(filteredData);
    } else {
      return res.json([]);
    }
  });
};

//อ่านข้อมูลที่จะแก้ไข
export const employeeUpdateID = (req, res) => {
  const sql = "SELECT * FROM `employees`  WHERE id_employee = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

//อัพเดตข้อมูลวัตถุดิบ
export const employeeUpdate = (req, res) => {
  const id = req.params.id;
  const sql =
    "UPDATE employees SET `department`= ? , `status`= ? , `title` = ? , `name`= ? , `sex`= ? , `birthday`= ? , `phone`= ?, `line_id`= ?, `facebook_id`= ?, `username`= ?, `password`= ?, `image`= ?   WHERE `id_employee`=?";
  db.query(
    sql,
    [
      req.body.department,
      req.body.status,
      req.body.title,
      req.body.name,
      req.body.sex,
      req.body.birthday,
      req.body.phone,
      req.body.line_id,
      req.body.facebook_id,
      req.body.username,
      req.body.password,
      req.body.image,
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
