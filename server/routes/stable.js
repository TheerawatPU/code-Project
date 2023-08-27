import express from "express";
const router = express.Router();
import {
  stapleRead,
  stabletest,
  buylist,
  stapleRead_lot,
  stapleNew,
  stableID,
  stableIdUpdate,
  stableUpdate,
} from "../controller/stable.js";

//@End Point อ่านข้อมูล  localhost:5500/stable
router.get("/stable", stapleRead);

//@End Point อ่านข้อมูล  localhost:5500/stapleRead_lot
router.get("/stapleRead_lot", stapleRead_lot);

//@End Point อ่านข้อมูล  localhost:5500/stabletest
router.get("/stabletest", stabletest);

//@End Point เพิ่มข้อมูล  localhost:5500/stapleNew
router.post("/stapleNew", stapleNew);

//@End Point อ่านข้อมูลแต่ละไอดี  localhost:5500/stableID/:id
router.get("/stableID/:id", stableID);

//@End Point อ่านข้อมูลแต่ละไอดีที่จะแก้ไข  localhost:5500/stableIdUpdate/:id
router.get("/stableIdUpdate/:id", stableIdUpdate);



//@End Point อัพเดตข้อมูล localhost:5500/stableUpdate/:id
router.put("/stableUpdate/:id", stableUpdate);

export default router;
