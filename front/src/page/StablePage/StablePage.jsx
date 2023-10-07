import React, { useState } from "react";
import "../../CSS/Stable.css";
import TabContent1 from "./Stable/TabContent1";
import TabContent2 from "./BuyStable/TabContent2";
import Topnav from "../../component/Topnav";
import Menu from "../../component/Menu";
import CutStable from "./CutStable/CutStable";

function StablePage() {
  const [activeTab, setActiveTab] = useState(1);

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
          </ul>

          {/* {activeTab === 1 ? <TabContent1 /> : <TabContent2 />} */}

          {activeTab === 1 ? (
            <TabContent1 />
          ) : activeTab === 2 ? (
            <TabContent2 />
          ) : (
            <CutStable />
          )}
        </div>
      </main>
    </div>
  );
}

export default StablePage;
