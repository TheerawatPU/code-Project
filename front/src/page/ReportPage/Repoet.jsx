import React, { useState } from "react";
import "../../CSS/Stable.css";

import TabReport1 from "./TabReport1";
import TabReport2 from "./TabReport2";
import TabReport3 from "./TabReport3";
import TabReport4 from "./TabReport4";
import TabReport5 from "./TabReport5";
import Topnav from "../../component/Topnav";
import Menu from "../../component/Menu";

function Repoet() {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // const navigate = useNavigate();

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
            <TabReport1 />
          ) : activeTab === 2 ? (
            <TabReport2 />
          ) : activeTab === 3 ? (
            <TabReport3 />
          ) : activeTab === 4 ? (
            <TabReport4 />
          ) : (
            <TabReport5 />
          )}
        </div>
      </main>
    </div>
  );
}

export default Repoet;
