import express from "express";
const router = express.Router();
import {
  Report_Stable_all,
  Report_Stable_date,
  Report_buy_stable_all,
  Report_buy_stable_date,
  Report_Stable_button_sort,
  Report_buy_stable_button_date,
  Report_buy_stable_button_sort,
  Report_buy_stable_select_Store,
  Report_buy_stable_select_StoreData,
  Report_cutStock_all,
  Report_cutStock_date,
  Report_cutStock_date_button_date,
  Report_cutStock_date_button_sort,
  Report_unit_all,
  Report_unit_date,
  Report_unit_button_date,
  Report_unit_button_sort,
  Report_unit_select_customer,
  Report_unit_select_customerData,
  Report_product_all,
  Report_product_date,
  Report_product_button_date,
  Report_product_button_sort,
  Report_product_select_customer,
  Report_product_select_customerData,
} from "../controller/reportNew.js";

// ! วัตถุุดิบ
//@End Point อ่านข้อมูลทั้งหมดสั่งซื้อ   http://localhost:5500/Report_Stable_all
router.get("/Report_Stable_all", Report_Stable_all);

//@End Point อ่านข้อมูลปรับสต๊อกตามวันที่   http://localhost:5500/Report_Stable_date/:view
router.get("/Report_Stable_date/:view", Report_Stable_date);

//@End Point อ่านข้อมูลปรับสต๊อกตามวันที่   http://localhost:5500/Report_Stable_button_sort/:column/:order
router.get(
  "/Report_Stable_button_sort/:column/:order",
  Report_Stable_button_sort
);

// ! สั่งซื้อวัตถุดิบ
//@End Point อ่านข้อมูลทั้งหมดสั่งซื้อ   http://localhost:5500/Report_buy_stable_all
router.get("/Report_buy_stable_all", Report_buy_stable_all);

//@End Point อ่านข้อมูลตามช่วงวันที่   http://localhost:5500/Report_buy_stable_date
router.get("/Report_buy_stable_date", Report_buy_stable_date);

//@End Point อ่านข้อมูลตาม option ที่เลือก   http://localhost:5500/Report_buy_stable_button_date/:view
router.get(
  "/Report_buy_stable_button_date/:view",
  Report_buy_stable_button_date
);

//@End Point อ่านข้อมูลปรับสต๊อกตามวันที่   http://localhost:5500/Report_buy_stable_button_sort/:column/:order
router.get(
  "/Report_buy_stable_button_sort/:column/:order",
  Report_buy_stable_button_sort
);

//@End Point อ่านข้อมูลปรับสต๊อกตามวันที่   http://localhost:5500/Report_buy_stable_select_Store
router.get("/Report_buy_stable_select_Store", Report_buy_stable_select_Store);

//@End Point อ่านข้อมูลปรับสต๊อกตามวันที่   http://localhost:5500/Report_buy_stable_select_StoreData/:teacherName
router.get(
  "/Report_buy_stable_select_StoreData/:teacherName",
  Report_buy_stable_select_StoreData
);

// ! ปรับสต๊อกวัตถุดิบ
//@End Point อ่านข้อมูลปรับสต๊อกทั้งหมด   http://localhost:5500/Report_cutStock_all
router.get("/Report_cutStock_all", Report_cutStock_all);

//@End Point อ่านข้อมูลปรับสต๊อกตามวันที่   http://localhost:5500/Report_cutStock_date
router.get("/Report_cutStock_date", Report_cutStock_date);

//@End Point อ่านข้อมูลปรับสต๊อกตามวันที่   http://localhost:5500/Report_cutStock_date_button_date/:view
router.get(
  "/Report_cutStock_date_button_date/:view",
  Report_cutStock_date_button_date
);

//@End Point อ่านข้อมูลปรับสต๊อกตามวันที่   http://localhost:5500/Report_cutStock_date_button_sort/:column/:order
router.get(
  "/Report_cutStock_date_button_sort/:column/:order",
  Report_cutStock_date_button_sort
);

// ! สูตรผลิต
//@End Point อ่านข้อมูลปรับสต๊อกทั้งหมด   http://localhost:5500/Report_unit_all
router.get("/Report_unit_all", Report_unit_all);

//@End Point อ่านข้อมูลตามช่วงวันที่   http://localhost:5500/Report_unit_date
router.get("/Report_unit_date", Report_unit_date);

//@End Point อ่านข้อมูลตาม option ที่เลือก   http://localhost:5500/Report_unit_button_date/:view
router.get("/Report_unit_button_date/:view", Report_unit_button_date);

//@End Point อ่านข้อมูลปรับสต๊อกตามวันที่   http://localhost:5500/Report_unit_button_sort/:column/:order
router.get("/Report_unit_button_sort/:column/:order", Report_unit_button_sort);

//@End Point อ่านข้อมูลปรับสต๊อกตามวันที่   http://localhost:5500/Report_unit_select_customer
router.get("/Report_unit_select_customer", Report_unit_select_customer);

//@End Point อ่านข้อมูลปรับสต๊อกตามวันที่   http://localhost:5500/Report_unit_select_customerData/:teacherName
router.get(
  "/Report_unit_select_customerData/:teacherName",
  Report_unit_select_customerData
);

// ! สั่งผลิต
//@End Point อ่านข้อมูลปรับสต๊อกทั้งหมด   http://localhost:5500/Report_unit_all
router.get("/Report_product_all", Report_product_all);

//@End Point อ่านข้อมูลตามช่วงวันที่   http://localhost:5500/Report_product_date
router.get("/Report_product_date", Report_product_date);

//@End Point อ่านข้อมูลตาม option ที่เลือก   http://localhost:5500/Report_product_button_date/:view
router.get("/Report_product_button_date/:view", Report_product_button_date);

//@End Point อ่านข้อมูลปรับสต๊อกตามวันที่   http://localhost:5500/Report_product_button_sort/:column/:order
router.get(
  "/Report_product_button_sort/:column/:order",
  Report_product_button_sort
);

//@End Point อ่านข้อมูลปรับสต๊อกตามวันที่   http://localhost:5500/Report_product_select_customer
router.get("/Report_product_select_customer", Report_product_select_customer);

//@End Point อ่านข้อมูลปรับสต๊อกตามวันที่   http://localhost:5500/Report_product_select_customerData/:teacherName
router.get(
  "/Report_product_select_customerData/:teacherName",
  Report_product_select_customerData
);

export default router;
