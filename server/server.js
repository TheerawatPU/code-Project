// import express from "express";
// import mysql from "mysql";
// import cors from "cors";

// const app = express();
// app.use(cors());
// app.use(express.json());

// //ดาต้าเบส
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "pro",
// });

// //! customer //
// //อ่านข้อมูลทั้งหมด
// app.get("/", (req, res) => {
//   const sql = "SELECT * FROM customer ORDER BY `id_customer`DESC";
//   db.query(sql, (err, result) => {
//     if (err) return res.json({ Message: "Error inside server" });
//     return res.json(result);
//   });
// });

// //เพิ่มข้อมูล
// app.post("/customer", (req, res) => {
//   const sql =
//     "INSERT INTO customer (`name_company`,`name_cus`,`card_ID`,`email_cus`,`phone_cus`,`address_cus`,`provinces`,`districts`,`subdistricts`) VALUES (?)";
//   const vlaues = [
//     req.body.name_company,
//     req.body.name_cus,
//     req.body.card_ID,
//     req.body.email_cus,
//     req.body.phone_cus,
//     req.body.address_cus,
//     req.body.provinces,
//     req.body.districts,
//     req.body.subdistricts,

//   ];

//   db.query(sql, [vlaues], (err, result) => {
//     if (err) return res.json(err);
//     return res.json(result);
//   });
// });

// //อ่านขอ้มูลแต่ละ id
// app.get("/CreateRead/:id", (req, res) => {
//   const sql = "SELECT * FROM `customer`  WHERE id_customer = ?";
//   const id = req.params.id;

//   db.query(sql, [id], (err, result) => {
//     if (err) return res.json({ Message: "Error inside server" });
//     return res.json(result);
//   });
// });

// app.put("/CusUpdate/:id", (req, res) => {
//   const sql =
//     "UPDATE customer SET `name_company` = ? , `name_cus` = ? ,`card_ID` = ? ,`email_cus` = ? ,`phone_cus` = ? ,`address_cus` = ?  WHERE id_customer=?";

//   const id = req.params.id;

//   db.query(
//     sql,
//     [
//       req.body.name_company,
//       req.body.name_cus,
//       req.body.card_ID,
//       req.body.email_cus,
//       req.body.phone_cus,
//       req.body.address_cus,
//       id_customer,
//     ],
//     (err, result) => {
//       if (err) return res.json({ Message: "Error inside server" });
//       return res.json(result);
//     }
//   );
// });


// //! สิ้นสุด customer//

// app.listen(2000, () => {
//   console.log("กำลังเชื่อมต่อ");
// });
