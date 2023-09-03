import React from "react";
import "../CSS/ComponentAD.css";

function TopNavAD() {
  const userLoginData = JSON.parse(sessionStorage.getItem("userlogin"));

  return (
    <div className="topnav-EM">
      <div className="name-logo-EM">Food4Skin Thailand</div>
      {/* <div className="profile-EM">{userLoginData[0].name}</div> */}
    </div>
  );
}

export default TopNavAD;
