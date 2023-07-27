import express from "express";
const router = express.Router();
import {
  cuscreate,
  customer,
  customerID,
  customerUp,
  customerUpdate,
  customerDelete,
 
} from "../controller/customer.js";

//@End Point เพิ่มข้อมูล  localhost:5500/cuscreate
router.post("/cuscreate", cuscreate);

//@End Point อ่านข้อมูล  localhost:5500/customer
router.get("/customer", customer);

//@End Point อ่านข้อมูลแต่ละไอดี  localhost:5500/customerID/:id
router.get("/customerID/:id", customerID);

//@End Point อ่านข้อมูลแต่ละไอดีที่จะแก้ไข  localhost:5500/customerUpdate/:id
router.get("/customerUpdate/:id", customerUpdate);

//@End Point อัพเดตข้อมูล localhost:5500/customerUp/:id
router.put("/customerUp/:id", customerUp);

//@End Point ลบข้อมูล localhost:5500/customerDelete/:id
router.delete("/customerDelete/:id", customerDelete);

export default router;
