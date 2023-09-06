import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TabUnit1 from "./TabUnit1";
import TabUnit2 from "./TabUnit2";
import Topnav from "../../component/Topnav";
import Menu from "../../component/Menu";

function Unit() {
  // สร้าง state เพื่อมาใช้สำหรับกดแท็บ
  const [activeTab, setActiveTab] = useState(1);
  // ฟังก์ชั่น Tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="all-page">
      <header className="header-stable ">
        <Topnav />
      </header>
      <section className="aside-stable ">
        <Menu />
      </section>

      <main className="main-stable ">
        <div className="tabsgrubs">
          <ul>
            <li>
              <button
                onClick={() => handleTabChange(1)}
                className={activeTab === 1 ? "active" : ""}
              >
                สูตรผลิต
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange(2)}
                className={activeTab === 2 ? "active" : ""}
              >
                สั่งผลิต
              </button>
            </li>
          </ul>

          {activeTab === 1 ? <TabUnit1 /> : <TabUnit2 />}
        </div>
      </main>
    </div>
  );
}

export default Unit;
