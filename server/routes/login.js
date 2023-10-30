import express from "express";
const router = express.Router();


import { login } from "../controller/login.js";

//@End Point อ่านข้อมูล  localhost:5500/login
router.post("/login", login);

export default router;
