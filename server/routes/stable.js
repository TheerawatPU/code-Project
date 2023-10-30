import express from "express";
const router = express.Router();
import {
  stapleRead,
  stabletest,
  buylist,
  stapleRead_lot,
  stapleNew,
  stableID,
  stableIdUpdate,
  stableUpdate,
  LotNew,
  buy_stable_all,
  buy_stable_all2,
  buy_stable_all3,
  producter,
} from "../controller/stable.js";

//@End Point อ่านข้อมูล  http://localhost:5500/stapleRead
router.get("/stapleRead", stapleRead);

//@End Point อ่านข้อมูล   http://localhost:5500/stapleRead_lot
router.get("/stapleRead_lot", stapleRead_lot);

//@End Point อ่านข้อมูล   http://localhost:5500/stabletest
router.get("/stabletest", stabletest);

//@End Point เพิ่มข้อมูล   http://localhost:5500/stapleNew
router.post("/stapleNew", stapleNew);

//@End Point เพิ่มข้อมูลLot   http://localhost:5500/LotNew
router.post("/LotNew", LotNew);

//@End Point อ่านข้อมูลแต่ละไอดี   http://localhost:5500/stableID/:id
router.get("/stableID/:id", stableID);

//@End Point อ่านข้อมูลแต่ละไอดีที่จะแก้ไข   http://localhost:5500/stableIdUpdate/:id
router.get("/stableIdUpdate/:id", stableIdUpdate);

//@End Point อัพเดตข้อมูล  http://localhost:5500/stableUpdate/:id
router.put("/stableUpdate/:id", stableUpdate);

// สั่งซื้อวัตถุดิบ
//@End Point อัพเดตข้อมูล  http://localhost:5500/buy_stable_all
router.get("/buy_stable_all", buy_stable_all);
//@End Point อัพเดตข้อมูล  http://localhost:5500/buy_stable_all2
router.get("/buy_stable_all2", buy_stable_all2);
//@End Point อัพเดตข้อมูล  http://localhost:5500/buy_stable_all3/:view
router.get("/buy_stable_all3/:view", buy_stable_all3);

// producter
//@End Point อัพเดตข้อมูล  http://localhost:5500/producter
router.get("/producter", producter);

export default router;
