import express from "express";
const router = express.Router();
import {
  Report_Stable_Lot,
  Report_Stable_Count,
  Report_Stable,
  countUnit,
  countbuy_staple,
  countstaple,
  countcut_stock,
  countproductorder,
} from "../controller/report.js";

//@End Point อ่านข้อมูล   http://localhost:5500/Report_Stable_Lot
router.get("/Report_Stable_Lot", Report_Stable_Lot);

//@End Point อ่านข้อมูล   http://localhost:5500/Report_Stable
router.get("/Report_Stable", Report_Stable);

//@End Point อ่านข้อมูล   http://localhost:5500/Report_Stable_Count
router.get("/Report_Stable_Count", Report_Stable_Count);

// นับไอดี
//@End Point อ่านข้อมูล   http://localhost:5500/countUnit
router.get("/countUnit", countUnit);

//@End Point อ่านข้อมูล   http://localhost:5500/countbuy_staple
router.get("/countbuy_staple", countbuy_staple);

//@End Point อ่านข้อมูล   http://localhost:5500/countstaple
router.get("/countstaple", countstaple);

//@End Point อ่านข้อมูล   http://localhost:5500/countcut_stock
router.get("/countcut_stock", countcut_stock);

//@End Point อ่านข้อมูล   http://localhost:5500/countproductorder
router.get("/countproductorder", countproductorder);

export default router;
