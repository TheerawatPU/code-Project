import express from "express";
const router = express.Router();
import {
  unitRead,
  newAddUnit,
  UreadID,
} from "../controller/unit.js";

//@End Point อ่านข้อมูล  http://localhost:5500/unitRead
router.get("/unitRead", unitRead);

//@End Point เพิ่ม API route สำหรับดึง id_unit ล่าสุด  http://localhost:5500/newAddUnit
router.post("/newAddUnit", newAddUnit);


//@End Point เพิ่ม API route สำหรับดึง id_unit ล่าสุด  http://localhost:5500/UreadID/:id
router.get("/UreadID/:id", UreadID);

export default router;
