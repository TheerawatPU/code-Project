import db from "../db.js";
import multer from "multer";
import path from "path";

// อ่านข้อมูลสูตรผลิต
export const employeeReadALL = (req, res) => {
  const sql = "SELECT * FROM `employees` ";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    db(null, "public/images");
  },
  filename: (req, file, cb) => {
    db(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

export const uploadImage2 = (req, res) => {
  const imageUrl = req.file.path; // File path after upload
  const sql = "INSERT INTO images (url) VALUES (?)";

  db.query(sql, [imageUrl], (err, result) => {
    if (err) {
      console.error("Error uploading image to database:", err);
      return res.status(500).send("Error uploading image.");
    }

    res.status(200).json({ message: "Image uploaded successfully" });
  });
};

// อ่านแต่ละไอดี
// อ่านข้อมูลสูตรผลิต
export const employeeReadID = (req, res) => {
  const sql = "SELECT * FROM `employees` WHERE `id_employee` = ? ";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
};
