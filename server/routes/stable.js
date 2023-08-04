import express from "express";
const router = express.Router();
import { stapleRead, stabletest,buylist } from "../controller/stable.js";

//@End Point อ่านข้อมูล  localhost:5500/stable
router.get("/stable", stapleRead);


//@End Point อ่านข้อมูล  localhost:5500/stabletest
router.get("/stabletest", stabletest);




export default router;
