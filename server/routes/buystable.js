import express from "express";
const router = express.Router();

import {
  buystableNew,
  buystableRead,
  buystableID,
} from "../controller/buystable.js";

//@End Point เพิ่มข้อมูล  localhost:5500/buystableNew
router.post("/buystableNew", buystableNew);

//@End Point อ่านข้อมูลทั้งหมด  localhost:5500/buystableRead
router.get("/buystableRead", buystableRead);

//@End Point อ่านข้อมูลทั้งหมด  localhost:5500/buystableID/:id
router.get("/buystableID/:id", buystableID);

export default router;
