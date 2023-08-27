import React from "react";
import "../CSS/ComponentAD.css";
import { BiUser } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { CiBoxList } from "react-icons/ci";

import logo from "../img/logo2.png";

function MenuAD() {
  return (
    <>
      <div className="mainMenu">
        <div className="All-sidebar-item-AD">
          <div className="top-sidebar-AD">
            <img src={logo} alt="" className="img-logo-AD" />
            {/* <h2>Food4Skin</h2> */}
          </div>

          <div className="item-bar-AD">
            <a href="/AD/StockReadPage">
              <div className="side-item-AD">
                <CiBoxList />
                <span>ปรับสต๊อก</span>
              </div>
            </a>
            <a href="/AD/EmployeeReadPage">
              <div className="side-item-AD">
                <BiUser />
                <span>พนักงาน</span>
              </div>
            </a>
            <a href="/AD/ReportReadPageEM">
              <div className="side-item-AD">
                <RxCountdownTimer />
                <span>รายงาน</span>
              </div>
            </a>
          </div>
        </div>

        <div className="All-sidebar-item-AD2">
          <div className="item-bar-AD">
            <a href="#">
              <div className="side-item-AD">
                <RiLogoutCircleRLine />
                <span>ออกจากระบบ</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuAD;
