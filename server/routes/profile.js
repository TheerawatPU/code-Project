import express from "express";
const router = express.Router();

import { uploadImage2, employeeReadID } from "../controller/profile.js";

//@End Point อ่านข้อมูล  localhost:5500/uploadImage2
router.get("/uploadImage2", uploadImage2);

//@End Point อ่านข้อมูลID localhost:5500/employeeReadID/:id
router.get("/employeeReadID/:id", employeeReadID);

export default router;
