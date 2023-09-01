import express from "express";
const router = express.Router();
import { employeeRead } from "../controller/employee.js";

//@End Point อ่านข้อมูล  localhost:5500/employeeRead
router.get("/employeeRead", employeeRead);

export default router;
