import { useState } from "react";
import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Report from "./page/ReportPage/Repoet";
import Unit from "./page/UnitPage/Unit";
import Topnav from "./component/Topnav";

import CustomerReadPage from "./page/CustomerPage/CustomerReadPage";
import CustomerReadIDPage from "./page/CustomerPage/CustomerReadIDPage";
import CustomerUpdatePage from "./page/CustomerPage/CustomerUpdatePage";
import CustomerCreatePage from "./page/CustomerPage/CustomerCreatePage";

import StablePage from "./page/StablePage/StablePage";
import StableReadIDPage from "./page/StablePage/Stable/StableReadIDPage";
import StableCreatePage from "./page/StablePage/Stable/StableCreatePage";
import StableAddNewPage from "./page/StablePage/Stable/StableAddNewPage";
import StableNew from "./page/StablePage/Stable/StableNew.jsx";
import StableEdit from "./page/StablePage/Stable/StableEdit";
import Stabledetel from "./page/StablePage/Stable/Stabledetel";
import Lot from "./page/StablePage/Stable/Lot";
import LotNew from "./page/StablePage/Stable/LotNew";

import EmployeeReadPage from "./Admin/EmployeeReadPage";
import StockReadPage from "./Admin/StockReadPage";
import ReportReadPageEM from "./Admin/ReportReadPageEM";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/AD/EmployeeReadPage" element={<EmployeeReadPage />} />
        <Route path="/AD/StockReadPage" element={<StockReadPage />} />
        <Route path="/AD/ReportReadPageEM" element={<ReportReadPageEM />} />
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
        <Route
          path="/EM/StablePage/StableReadIDPage/:id"
          element={<StableReadIDPage />}
        />
        <Route
          path="/EM/StablePage/StableCreatePage"
          element={<StableCreatePage />}
        />
        <Route
          path="/EM/StablePage/StableAddNewPage"
          element={<StableAddNewPage />}
        />
        <Route path="/EM/StablePage/StableNew" element={<StableNew />} />
        <Route path="/EM/StablePage/StableEdit/:id" element={<StableEdit />} />
        <Route
          path="/EM/StablePage/Stabledetel/:id"
          element={<Stabledetel />}
        />
        <Route path="/EM/StablePage/Stabledetel/Lot" element={<Lot />} />
        <Route path="/EM/StablePage/LotNew" element={<LotNew />} />

        <Route path="/EM/Report" element={<Report />} />
        <Route path="/EM/Unit" element={<Unit />} />
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
    //       <Route path="StablePage/StableCreatePage" element={<StableCreatePage />} />

    //       <Route path="/Report" element={<Report />} />
    //       <Route path="/Unit" element={<Unit />} />

    //     </Routes>

    //   </Menu>
    // </BrowserRouter>
  );
}

export default App;
