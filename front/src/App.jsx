import { useState } from "react";
import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Topnav from "./component/Topnav";

// รีพอร์ต
import Report from "./page/ReportPage/Repoet";

// การผลิต
import Unit from "./page/UnitPage/Unit";
import UnitNew from "./page/UnitPage/UnitNew";
import UnitEdit from "./page/UnitPage/UnitEdit";
import UnitReadID from "./page/UnitPage/UnitReadID";
import Utest from "./page/UnitPage/Utest";

import ProductNew from "./page/UnitPage/ProductNew";
import ProductID from "./page/UnitPage/productID";

// ลูกค้า
import CustomerReadPage from "./page/CustomerPage/CustomerReadPage";
import CustomerReadIDPage from "./page/CustomerPage/CustomerReadIDPage";
import CustomerUpdatePage from "./page/CustomerPage/CustomerUpdatePage";
import CustomerCreatePage from "./page/CustomerPage/CustomerCreatePage";

// วัตถุดิบ
import StablePage from "./page/StablePage/StablePage";
import StableNew from "./page/StablePage/Stable/StableNew.jsx";
import StableEdit from "./page/StablePage/Stable/StableEdit";
import Stabledetel from "./page/StablePage/Stable/Stabledetel";

// ล็อตวัตถุดิบ
import AddLot from "./page/StablePage/BuyStable/AddLot";
import Lot from "./page/StablePage/BuyStable/Lot";
import LotNew from "./page/StablePage/BuyStable/LotNew";
import TableLot from "./page/StablePage/Stable/TableLot";
// สั่งซื้อวัตถุดิบ
import BuyStableNew from "./page/StablePage/BuyStable/BuyStableNew";
import BuyStableRead from "./page/StablePage/BuyStable/BuyStableRead";

// แอดมินเพิ่มพนักงาน
import EmployeeReadPage from "./Admin/EmployeeReadPage";
import EmployeeAddPage from "./Admin/EmployeeAddPage";
import EmployeeUpdatePage from "./Admin/EmployeeUpdatePage";
import EmployeeReadIDPage from "./Admin/EmployeeReadIDPage";

import StockReadPage from "./Admin/StockReadPage";
import ReportReadPageEM from "./Admin/ReportReadPageEM";

// เข้าสู่ระบบ
import Login from "./Admin/Login";
import LoginForm from "./Admin/LoginForm";

// การปรับสต๊อก
import CutStable from "./page/StablePage/CutStable/CutStable";
import CusStableNew from "./page/StablePage/CutStable/CusStableNew";
import CusStableReadID from "./page/StablePage/CutStable/CusStableReadID";

// โปรไฟล์
import ProfileRead from "./page/Profile/ProfileRead";
// import ProductNew from "./page/UnitPage/ProductNew";
import ProfileEdit from "./page/Profile/ProfileEdit";

// โปรไฟล์แอดมิน
import ProfileAdminRead from "./Admin/ProfileAdminRead";
import ProfileADmin from "./Admin/ProfileADmin";
import ProfileReadID from "./Admin/ProfileReadID";
import ProfileAdminEdit from "./Admin/ProfileAdminEdit";

import customerPDF from "./page/CustomerPage/customerPDF";

import EMnew from "./Admin/EMnew";
import EMUP from "./Admin/EMUP";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/customerPDF" element={<customerPDF />} />

        <Route path="/AD/EmployeeReadPage" element={<EmployeeReadPage />} />

        <Route
          path="/AD/EmployeeReadPage/EmployeeAddPage"
          element={<EmployeeAddPage />}
        />
        <Route path="/AD/EmployeeReadPage/EMnew" element={<EMnew />} />

        <Route
          path="/AD/EmployeeReadPage/EmployeeUpdatePage/:id"
          element={<EmployeeUpdatePage />}
        />
        <Route path="/AD/EmployeeReadPage/EMUP/:id" element={<EMUP />} />

        <Route
          path="/AD/EmployeeReadPage/EmployeeReadIDPage/:id"
          element={<EmployeeReadIDPage />}
        />
        <Route path="/AD/StockReadPage" element={<StockReadPage />} />
        <Route path="/AD/ReportReadPageEM" element={<ReportReadPageEM />} />

        <Route path="/" element={<Login />} />
        <Route path="/LoginForm" element={<LoginForm />} />

        <Route path="/EM/CustomerReadPage" element={<CustomerReadPage />} />
        <Route
          path="/EM/CustomerReadPage/CustomerCreatePage"
          element={<CustomerCreatePage />}
        />
        <Route
          path="/EM/CustomerReadPage/CustomerReadIDPage/:id"
          element={<CustomerReadIDPage />}
        />
        <Route
          path="/EM/CustomerReadPage/CustomerUpdatePage/:id"
          element={<CustomerUpdatePage />}
        />

        <Route path="/EM/StablePage" element={<StablePage />} />

        <Route path="/EM/StablePage/TableLot/:id" element={<TableLot />} />

        <Route path="/EM/StablePage/TableLot/:id/AddLot" element={<AddLot />} />

        <Route
          path="/EM/StablePage/TableLot/:id/CusStableNew/:id"
          element={<CusStableNew />}
        />
        {/* สั่งซื้อ */}
        <Route path="/EM/StablePage/BuyStableNew" element={<BuyStableNew />} />
        <Route
          path="/EM/StablePage/BuyStableRead/:id"
          element={<BuyStableRead />}
        />

        <Route path="/EM/StablePage/StableNew" element={<StableNew />} />

        <Route
          path="/EM/StablePage/CusStableReadID/:id"
          element={<CusStableReadID />}
        />

        <Route path="/EM/CutStable" element={<CutStable />} />

        <Route path="/EM/StablePage/CusStableNew" element={<CusStableNew />} />

        {/* <Route path="/EM/StablePage/AddLot" element={<AddLot />} /> */}

        <Route path="/EM/StablePage/StableEdit/:id" element={<StableEdit />} />

        <Route
          path="/EM/StablePage/Stabledetel/:id"
          element={<Stabledetel />}
        />

        <Route path="/EM/StablePage/Stabledetel/Lot" element={<Lot />} />
        <Route path="/EM/StablePage/LotNew" element={<LotNew />} />

        <Route path="/EM/Report" element={<Report />} />

        <Route path="/EM/Unit" element={<Unit />} />
        <Route path="/EM/Unit/UnitNew" element={<UnitNew />} />
        <Route path="/EM/Unit/UnitReadID/:id" element={<UnitReadID />} />
        <Route path="/EM/Unit/Utest/:id" element={<Utest />} />
        <Route path="/EM/Unit/UnitEdit/:id" element={<UnitEdit />} />

        <Route path="/EM/Unit/ProductNew" element={<ProductNew />} />
        <Route path="/EM/Unit/ProductID/:id" element={<ProductID />} />

        {/* โปรไฟล์ EM */}
        <Route path="/EM/ProfileRead" element={<ProfileRead />} />
        <Route
          path="/EM/ProfileRead/ProfileEdit/:id"
          element={<ProfileEdit />}
        />

        {/* โปรไฟล์ AD */}
        <Route path="/AD/ProfileAdminRead" element={<ProfileAdminRead />} />
        <Route
          path="/AD/ProfileAdminRead/ProfileADmin/:id"
          element={<ProfileADmin />}
        />

        {/* profile new */}
        <Route
          path="/AD/ProfileReadID/ProfileAdminEdit/:id"
          element={<ProfileAdminEdit />}
        />
        <Route path="/AD/ProfileReadID" element={<ProfileReadID />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
