import express from "express";
const router = express.Router();
import {lotReadSelect,lotTable,lotReadSelectID} from "../controller/lot.js";

//@End Point อ่านข้อมูล  localhost:5500/lotReadSelect
router.get("/lotReadSelect", lotReadSelect);

//@End Point อ่านข้อมูล  localhost:5500/lotTable/:id
router.get("/lotTable/:id", lotTable);

//@End Point อ่านข้อมูล  http://localhost:5500/lotReadSelectID/:id
router.get("/lotReadSelectID/:id", lotReadSelectID);


export default router;