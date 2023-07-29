import express from "express";
const router = express.Router();
import { stapleRead } from "../controller/stable.js";

//@End Point อ่านข้อมูล  localhost:5500/stable
router.get("/stable", stapleRead);

export default router;
