import express from "express";
const router = express.Router();
import { province,districts,subdistricts } from "../controller/location.js";

//@End Point  localhost:5500/api/province
router.get("/province", province);

//@End Point  localhost:5500/api/province/:id/districts
router.get("/province/:id/districts", districts);


//@End Point  localhost:5500/api/districts/:districtId
router.get("/districts/:districtId", subdistricts);




export default router