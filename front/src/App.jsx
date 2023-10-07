import { useState } from "react";
import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Topnav from "./component/Topnav";

import Report from "./page/ReportPage/Repoet";

import Unit from "./page/UnitPage/Unit";
import UnitNew from "./page/UnitPage/UnitNew";
import UnitEdit from "./page/UnitPage/UnitEdit";
import UnitReadID from "./page/UnitPage/UnitReadID";
import Utest from "./page/UnitPage/Utest";

import ProductNew from "./page/UnitPage/ProductNew";
import ProductID from "./page/UnitPage/productID";

import CustomerReadPage from "./page/CustomerPage/CustomerReadPage";
import CustomerReadIDPage from "./page/CustomerPage/CustomerReadIDPage";
import CustomerUpdatePage from "./page/CustomerPage/CustomerUpdatePage";
import CustomerCreatePage from "./page/CustomerPage/CustomerCreatePage";

import StablePage from "./page/StablePage/StablePage";
import StableNew from "./page/StablePage/Stable/StableNew.jsx";
import StableEdit from "./page/StablePage/Stable/StableEdit";
import Stabledetel from "./page/StablePage/Stable/Stabledetel";

import AddLot from "./page/StablePage/BuyStable/AddLot";
import Lot from "./page/StablePage/BuyStable/Lot";
import LotNew from "./page/StablePage/BuyStable/LotNew";
import TableLot from "./page/StablePage/Stable/TableLot";
import BuyStableNew from "./page/StablePage/BuyStable/BuyStableNew";

import EmployeeReadPage from "./Admin/EmployeeReadPage";
import EmployeeAddPage from "./Admin/EmployeeAddPage";
import EmployeeUpdatePage from "./Admin/EmployeeUpdatePage";

import StockReadPage from "./Admin/StockReadPage";
import ReportReadPageEM from "./Admin/ReportReadPageEM";
import Login from "./Admin/Login";
import LoginForm from "./Admin/LoginForm";

import CutStable from "./page/StablePage/CutStable/CutStable";
import CusStableNew from "./page/StablePage/CutStable/CusStableNew";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/AD/EmployeeReadPage" element={<EmployeeReadPage />} />

        <Route
          path="/AD/EmployeeReadPage/EmployeeAddPage"
          element={<EmployeeAddPage />}
        />
        <Route
          path="/AD/EmployeeReadPage/EmployeeUpdatePage/:id"
          element={<EmployeeUpdatePage />}
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

        <Route path="/EM/StablePage/TableLot/:id/CusStableNew/:id" element={<CusStableNew />} />

        <Route path="/EM/StablePage/BuyStableNew" element={<BuyStableNew />} />

        <Route path="/EM/StablePage/StableNew" element={<StableNew />} />

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
      </Routes>
      {/* <AddEM/> */}
    </BrowserRouter>
    // <BrowserRouter>
    //   <Menu>
    //     <Topnav />

    //     <Routes>
    //       {/* <Route path="/" element={<Menu />} /> */}
    //       <Route path="/CustomerReadPage" element={<CustomerReadPage />} />
    //       <Route path="CustomerReadPage/CustomerCreatePage" element={<CustomerCreatePage />} />
    //       <Route path="CustomerReadPage/CustomerReadIDPage/:id" element={<CustomerReadIDPage />} />
    //       <Route path="CustomerReadPage/CustomerUpdatePage/:id" element={<CustomerUpdatePage />} />

    //       <Route path="/StablePage" element={<StablePage />} />
    //       <Route path="StablePage/StableReadIDPage/:id" element={<StableReadIDPage />} />

    //       <Route path="/Report" element={<Report />} />
    //       <Route path="/Unit" element={<Unit />} />

    //     </Routes>

    //   </Menu>
    // </BrowserRouter>
  );
}

export default App;
