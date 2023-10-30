import React, { useState } from "react";
import "../CSS/ComponentAD.css";
import { AiOutlineCaretDown } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function TopNavAD() {
  const userLoginData = JSON.parse(sessionStorage.getItem("userlogin"));

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    // ทำอย่างไรก็ตามที่คุณต้องการเมื่อคลิกที่เมนู "ออกจากระบบ"
    alert("ออกจากระบบแล้ว");
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="topnav-EM">
      <div className="name-logo-EM">Food4Skin Thailand</div>
      {/* <div className="profile-EM">{userLoginData[0].name}</div> */}
      <div className="navbar-right">
        <div className="dropdown">
          {/* ตัวปุ่มกดของผู้เข้าระบบ */}
          <button className="dropbtn" onClick={toggleMenu}>
            {/* <h4 style={{ paddingRight: "10px" }}>{userLoginData[0].name}</h4> */}
            <h4 style={{ paddingRight: "10px" }}>{userLoginData[0].name}</h4>

            <AiOutlineCaretDown />
          </button>
          {/* ภายในกล่อง เมื่อกดแล้ว */}
          {showMenu && (
            <div className="dropdown-content">
              <a onClick={() => navigate(`/AD/ProfileReadID`)}>โปรไฟล์</a>
              <a href="#" onClick={handleLogout}>
                ออกจากระบบ
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopNavAD;
