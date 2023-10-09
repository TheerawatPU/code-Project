import express from "express";
const router = express.Router();
import {
  Lot_Stable1,
  table_cutStock,
  cutStock_New,
  cutStock_Up,
  cutStock_ID,
  cutStock_ID_read,
} from "../controller/cutStable.js";

//@End Point อ่านข้อมูล  http://localhost:5500/Lot_Stable1/:id
router.get("/Lot_Stable1/:id", Lot_Stable1);

//@End Point อ่านข้อมูล  http://localhost:5500/table_cutStock
router.get("/table_cutStock", table_cutStock);

//@End Point เพิ่มข้อมูล  http://localhost:5500/cutStock_New
router.post("/cutStock_New", cutStock_New);

//@End Point อัพเดตข้อมูล  http://localhost:5500/cutStock_Up/:id
router.put("/cutStock_Up/:id", cutStock_Up);

//@End Point อ่านข้อมูล  http://localhost:5500/cutStock_ID/:id
router.get("/cutStock_ID/:id", cutStock_ID);

//@End Point อ่านข้อมูล  http://localhost:5500/cutStock_ID_read/:id
router.get("/cutStock_ID_read/:id", cutStock_ID_read);

export default router;
