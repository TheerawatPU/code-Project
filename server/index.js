import express from "express";
import cors from "cors";
import customerRoutes from "./routes/customer.js";
import locationRoutes from "./routes/location.js";
import stableRoutes from "./routes/stable.js";
import lotRoutes from "./routes/lot.js";
import employeeRoutes from "./routes/employee.js";
import unitRoutes from "./routes/unit.js";
import productRoutes from "./routes/product.js";
import reportRoutes from "./routes/report.js";
import cutStableRoutes from "./routes/cutStable.js";
import profileRoutes from "./routes/profile.js";
import buystableRoutes from "./routes/buystable.js";
import reportNewRoutes from "./routes/reportNew.js"

import cookiePerser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", customerRoutes);
app.use("/api", locationRoutes);
app.use("/", stableRoutes);
app.use("/", lotRoutes);
app.use("/", employeeRoutes);
app.use("/", unitRoutes);
app.use("/", productRoutes);
app.use("/", reportRoutes);
app.use("/", cutStableRoutes);
app.use("/", profileRoutes);
app.use("/", buystableRoutes);
app.use("/", reportNewRoutes);

app.listen(5500, () => {
  console.log("connected");
});

// ! อัพโหลดรูป
import db from "./db.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "pubilc/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

app.post("/upload", upload.single("image"), (req, res) => {
  const image = req.file.filename;
  const sql = "UPDATE employees SET image =  ?";
  db.query(sql, [image], (err, result) => {
    if (err) return res.json({ Message: "Error" });
    return res.json({ Status: "Success" });
  });
});
// ! ----------------------------------
// import session  from 'express-session';
import session from "express-session";
import bodyParser from "body-parser";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "xxx",
    resave: false,
    saveUninitialized: true,
  })
);

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM employees WHERE username = ? AND password = ?",
    [username, password],
    (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        const employees = results[0];
        req.session.employees = employees; // เก็บข้อมูลผู้ใช้ในเซสชัน
        res.json({ success: true, department: employees.department });
      } else {
        res.json({ success: false });
      }
    }
  );
});

app.get("/check-login", (req, res) => {
  if (req.session.employees) {
    res.json({
      authenticated: true,
      department: req.session.employees.department,
      username: req.session.employees.username,
    });
  } else {
    res.json({ authenticated: false });
  }
});
