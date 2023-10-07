import express from "express";
const router = express.Router();
import {
  Report_Stable_Lot,
  Report_Stable_Count,
  Report_Stable,
} from "../controller/report.js";

//@End Point อ่านข้อมูล   http://localhost:5500/Report_Stable_Lot
router.get("/Report_Stable_Lot", Report_Stable_Lot);

//@End Point อ่านข้อมูล   http://localhost:5500/Report_Stable
router.get("/Report_Stable", Report_Stable);

//@End Point อ่านข้อมูล   http://localhost:5500/Report_Stable_Count
router.get("/Report_Stable_Count", Report_Stable_Count);

export default router;
