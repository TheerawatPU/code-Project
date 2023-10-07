import express from "express";
const router = express.Router();
import { productRead, Unit_staple,Product_detail } from "../controller/product.js";

//@End Point อ่านข้อมูล  http://localhost:5500/productRead
router.get("/productRead", productRead);

//@End Point อ่านข้อมูล  http://localhost:5500/Unit_staple/:id
router.get("/Unit_staple/:id", Unit_staple);

//@End Point อ่านข้อมูล  http://localhost:5500/Product_detail/:id
router.get("/Product_detail/:id", Product_detail);

export default router;
