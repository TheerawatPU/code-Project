import db from "../db.js";

// อ่านข้อมูลสูตรผลิต
export const unitRead = (req, res) => {
  const sql =
    "SELECT unit.id_unit,unit.unit_name,DATE_FORMAT(unit.day_admit_list, '%d/%m/%Y') AS day_admit_list,unit.notification_num, DATE_FORMAT(unit.date_notification_num, '%d/%m/%Y') AS date_notification_num,customer.name_cus FROM `unit` INNER JOIN customer ON unit.id_customer = customer.id_customer ORDER BY unit.id_unit DESC";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

// //เพิ่มข้อมูลวัตถุดิบ
// export const unitNew = (req, res) => {
//   const sql =
//     "INSERT INTO unit (`unit_name`,`day_admit_list`,`notification_num`,`date_notification_num`,`id_customer`,`id_employee`) VALUES (?)";
//   const vlaues = [
//     req.body.unit_name,
//     req.body.day_admit_list,
//     req.body.notification_num,
//     req.body.date_notification_num,
//     req.body.id_customer,
//     req.body.id_employee,
//   ];

//   db.query(sql, [vlaues], (err, result) => {
//     if (err) return res.json(err);
//     return res.json(result);
//   });
// };

// //เพิ่มข้อมูลวัตถุดิบ
// export const unitNew_detel = (req, res) => {
//   const sql =
//     "INSERT INTO detail_unit (`id_unit`,`id_staple`,`AmountP`) VALUES (?)";
//   const vlaues = [req.body.id_unit, req.body.id_staple, req.body.AmountP];

//   db.query(sql, [vlaues], (err, result) => {
//     if (err) return res.json(err);
//     return res.json(result);
//   });
// };

// export const latest = (req, res) => {
//   const sql = "SELECT id_unit FROM unit ORDER BY id_unit DESC LIMIT 1";
//   db.query(sql, (err, result) => {
//     if (err) {
//       console.error(err);
//       res.status(500).json({ error: "Internal Server Error" });
//       return;
//     }
//     res.status(200).json(result);
//   });
// };

// เพิ่ม API route สำหรับดึง id_unit ล่าสุด
// app.get("/unitNew/latest", (req, res) => {
//   const sql = "SELECT id_unit FROM unitNew ORDER BY id_unit DESC LIMIT 1";
//   db.query(sql, (err, result) => {
//     if (err) {
//       console.error(err);
//       res.status(500).json({ error: "Internal Server Error" });
//       return;
//     }
//     res.status(200).json(result);
//   });
// });

// สร้างครูและนักเรียนพร้อมกัน
export const newAddUnit = (req, res) => {
  // const { teacher, students } = req.body;
  const { unit, detail_unit } = req.body;

  // เพิ่มครูลงในตาราง teachers
  const createTeacherSql =
    "INSERT INTO unit (unit_name,day_admit_list,date_notification_num,notification_num,id_customer,id_employee) VALUES (?,?,?,?,?,?)";
  db.query(
    createTeacherSql,
    [
      unit.unit_name,
      unit.day_admit_list,
      unit.date_notification_num,
      unit.notification_num,
      unit.id_customer,
      unit.id_employee,
    ],
    (err, teacherResult) => {
      if (err) {
        console.error("เกิดข้อผิดพลาดในการเพิ่มวัตถุดิบ: " + err.message);
        res.status(500).json({ error: "เกิดข้อผิดพลาดในการเพิ่มวัตถุดิบ" });
        return;
      }

      const teacherId = teacherResult.insertId;

      // เพิ่มนักเรียนลงในตาราง students
      const studentPromises = detail_unit.map((student) => {
        return new Promise((resolve, reject) => {
          const createStudentSql =
            "INSERT INTO detail_unit (AmountP,id_staple,id_unit) VALUES (?, ?, ?)";
          db.query(
            createStudentSql,
            [student.AmountP, student.id_staple, teacherId],
            (err, studentResult) => {
              if (err) {
                console.error(
                  "เกิดข้อผิดพลาดในการเพิ่มรายละเอียดสูตร: " + err.message
                );
                reject(err);
              } else {
                resolve(studentResult.insertId);
              }
            }
          );
        });
      });

      Promise.all(studentPromises)
        .then((studentIds) => {
          res.status(201).json({
            message: "เพิ่มครูและนักเรียนสำเร็จ",
            teacherId,
            studentIds,
          });
        })
        .catch((err) => {
          console.error(
            "เกิดข้อผิดพลาดในการเพิ่มรายละเอียดสูตร1: " + err.message
          );
          res
            .status(500)
            .json({ error: "เกิดข้อผิดพลาดในการเพิ่มรายละเอียดสูตร2" });
        });
    }
  );
};
