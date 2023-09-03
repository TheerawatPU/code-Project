import express from "express";
const router = express.Router();
import {
  employeeRead,
  employeeNew,
  loginadmin,
  employeeUpdateID,
  employeeUpdate,
} from "../controller/employee.js";

//@End Point อ่านข้อมูลพนักงาน  localhost:5500/employeeRead
router.get("/employeeRead", employeeRead);

//@End Point เพิ่มข้อมูลพนักงาน  localhost:5500/employeeNew
router.post("/employeeNew", employeeNew);

//@End Point เข้าสู่ระบบพนักงาน  localhost:5500/loginadmin
router.post("/loginadmin", loginadmin);

//@End Point อ่านข้อมูลแต่ละไอดี   http://localhost:5500/employeeUpdateID/:id
router.get("/employeeUpdateID/:id", employeeUpdateID);

//@End Point อ่านข้อมูลแต่ละไอดีที่จะแก้ไข   http://localhost:5500/employeeUpdate/:id
router.put("/employeeUpdate/:id", employeeUpdate);


export default router;
