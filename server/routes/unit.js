import express from "express";
const router = express.Router();
import { unitRead } from "../controller/unit.js";

//@End Point อ่านข้อมูล  http://localhost:5500/unitRead
router.get("/unitRead", unitRead);

export default router;
