import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FaBoxes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { BsBoxSeam, BsBoxes } from "react-icons/bs";
import { GiBackwardTime } from "react-icons/gi";
import { PiMoneyLight } from "react-icons/pi";
import "../CSS/Component.css";
import logo from "../Admin/img/logo2.png";
import { RiUserSettingsLine } from "react-icons/ri";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListCheck,
  faClockRotateLeft,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

function Menu() {
  // ตัวใช้สำหรับการลิงค์ข้าม component
  const navigate = useNavigate();

  return (
    <>
      <div className="mainMenu">
        <div className="All-sidebar-item-EM">
          <div className="top-sidebar-EM">
            <img src={logo} alt="" className="img-logo-EM" />
            {/* <h2>Food4Skin</h2> */}
          </div>

          <div className="item-bar-EM">
            <a href="/EM/Unit">
              <div className="side-item-EM">
                <FontAwesomeIcon icon={faListCheck} />

                <span>การผลิต</span>
              </div>
            </a>
            <a href="/EM/StablePage">
              <div className="side-item-EM">
                <BsBoxSeam />
                <span>วัตถุดิบ</span>
              </div>
            </a>
            <a href="/EM/CustomerReadPage">
              <div className="side-item-EM">
                <FontAwesomeIcon icon={faUser} />
                {/* <RiUserSettingsLine /> */}
                <span>พนักงาน</span>
              </div>
            </a>
            <a href="/EM/Report">
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

export default Menu;
