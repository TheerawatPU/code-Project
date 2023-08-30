import express from "express";
const router = express.Router();
import {lotReadSelect,lotTable} from "../controller/lot.js";

//@End Point อ่านข้อมูล  localhost:5500/lotReadSelect
router.get("/lotReadSelect", lotReadSelect);

//@End Point อ่านข้อมูล  localhost:5500/lotTable/:id
router.get("/lotTable/:id", lotTable);


export default router;