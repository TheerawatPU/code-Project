import React, { useState } from "react";

import MenuAD from "./ComponentAD/MenuAD";
import TopNavAD from "./ComponentAD/TopNavAD";
import "./CSS/ComponentAD.css";

import ReportAD1 from "./ReportAD1";
import ReportAD2 from "./ReportAD2";
import ReportAD3 from "./ReportAD3";
import ReportAD4 from "./ReportAD4";
import ReportAD5 from "./ReportAD5";

function ReportReadPageEM() {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="all-page">
      <header className="header">
        <TopNavAD />
      </header>
      <section className="aside">
        <MenuAD />
      </section>

      <main className="main">
        <div className="tabsgrubs">
          <ul>
            <li>
              <button
                onClick={() => handleTabChange(1)}
                className={activeTab === 1 ? "active" : ""}
              >
                วัตถุดิบ
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange(2)}
                className={activeTab === 2 ? "active" : ""}
              >
                สั่งซื้อวัตถุดิบ
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange(3)}
                className={activeTab === 3 ? "active" : ""}
              >
                ปรับสต๊อก
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange(4)}
                className={activeTab === 4 ? "active" : ""}
              >
                สูตรผลิต
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange(5)}
                className={activeTab === 5 ? "active" : ""}
              >
                สั่งผลิต
              </button>
            </li>
          </ul>

          {activeTab === 1 ? (
            <ReportAD1 />
          ) : activeTab === 2 ? (
            <ReportAD2 />
          ) : activeTab === 3 ? (
            <ReportAD3 />
          ) : activeTab === 4 ? (
            <ReportAD4 />
          ) : (
            <ReportAD5 />
          )}
        </div>
      </main>
    </div>
  );
}

export default ReportReadPageEM;
