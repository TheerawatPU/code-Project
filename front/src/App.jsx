import { useState } from "react";
import React from "react";
// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./component/Menu";
import StablePage from "./page/StablePage/StablePage";
import Report from "./page/ReportPage/Repoet";
import Unit from "./page/UnitPage/Unit";
import Topnav from "./component/Topnav";


import CustomerReadPage from "./page/CustomerPage/CustomerReadPage";
import CustomerReadIDPage from "./page/CustomerPage/CustomerReadIDPage";
import CustomerUpdatePage from "./page/CustomerPage/CustomerUpdatePage";
import CustomerCreatePage from "./page/CustomerPage/CustomerCreatePage";

function App() {
  return (
    <BrowserRouter>
      <Menu>
        <Topnav />

        <Routes>
          {/* <Route path="/" element={<Menu />} /> */}
          <Route path="/CustomerReadPage" element={<CustomerReadPage />} />
          <Route path="CustomerReadPage/CustomerCreatePage" element={<CustomerCreatePage />} />
          <Route path="CustomerReadPage/CustomerReadIDPage/:id" element={<CustomerReadIDPage />} />
          <Route path="CustomerReadPage/CustomerUpdatePage/:id" element={<CustomerUpdatePage />} />


          <Route path="/StablePage" element={<StablePage />} />
          <Route path="/Report" element={<Report />} />
          <Route path="/Unit" element={<Unit />} />
          
        </Routes>
        
      </Menu>
    </BrowserRouter>
  );
}

export default App;
