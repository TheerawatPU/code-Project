import React from "react";
import "../CSS/ComponentAD.css";
import { BsBoxSeam, BsBoxes } from "react-icons/bs";

import { BiUser } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { CiBoxList } from "react-icons/ci";
import { RiUserSettingsLine } from "react-icons/ri";
import { LiaUserCogSolid } from "react-icons/lia";

import logo from "../img/logo2.png";
import profile from "../img/profile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListCheck,
  faClockRotateLeft,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

function MenuAD() {
  return (
    <>
      <div className="mainMenu">
        <div className="All-sidebar-item-EM">
          <div className="top-sidebar-EM">
            <img src={logo} alt="" className="img-logo-EM" />
            {/* <h2>Food4Skin</h2> */}
          </div>

          <div className="item-bar-EM">
            <a href="/AD/StockReadPage">
              <div className="side-item-EM">
                {/* <FontAwesomeIcon icon={faStar} /> */}
                <FontAwesomeIcon icon={faListCheck} />
                {/* <BsBoxes /> */}
                <span>ตัดสต๊อก</span>
              </div>
            </a>
            <a href="/AD/EmployeeReadPage">
              <div className="side-item-EM">
                <RiUserSettingsLine />
                {/* <FontAwesomeIcon icon={faUser} /> */}

                {/* <img src={profile} alt="" className="img-profile-AD" /> */}

                <span>พนักงาน</span>
              </div>
            </a>
            <a href="/AD/ReportReadPageEM">
              <div className="side-item-EM">
                <FontAwesomeIcon icon={faClockRotateLeft} />
                <span>รายงาน</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuAD;
