import React, { useState } from "react";
import "../../CSS/Stable.css";
import TabContent1 from "./TabStable/TabContent1";
import TabContent2 from "./TabStable/TabContent2";

function StablePage() {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
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
        </ul>

        {activeTab === 1 ? <TabContent1 /> : <TabContent2 />}
      </div>
    </>
  );
}

export default StablePage;
