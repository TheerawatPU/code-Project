import { useState } from "react";
import React from "react";
// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./component/Menu";
import Customer from "./page/CustomerPage/Customer";
import StablePage from "./page/StablePage/StablePage";
import Report from "./page/ReportPage/Repoet";
import Unit from "./page/UnitPage/Unit";
import Topnav from "./component/Topnav";
import CreateCus from "./page/CustomerPage/CreateCus";
import CreateRead from "./page/CustomerPage/CreateRead";
import CusUpdate from "./page/CustomerPage/CusUpdate";

function App() {
  return (
    <BrowserRouter>
      <Menu>
        <Topnav />

        <Routes>
          {/* <Route path="/" element={<Menu />} /> */}
          <Route path="/Customer" element={<Customer />} />
          <Route path="Customer/CreateCus" element={<CreateCus />} />
          <Route path="Customer/CreateRead/:id" element={<CreateRead />} />
          <Route path="Customer/CusUpdate/:id" element={<CusUpdate />} />
          <Route path="/StablePage" element={<StablePage />} />
          <Route path="/Report" element={<Report />} />
          <Route path="/Unit" element={<Unit />} />
          
        </Routes>
        
      </Menu>
    </BrowserRouter>
  );
}

export default App;
