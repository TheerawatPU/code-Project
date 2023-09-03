import React from "react";
import "../CSS/Component.css"

function Topnav() {
  const userLoginData = JSON.parse(sessionStorage.getItem("userlogin"));

  return (
    <div className="topnav-EM">
      <div className="name-logo-EM">Food4Skin Thailand</div>
      <div className="profile-EM">{userLoginData[0].name}</div>
            {/* <div className="profile-EM">{userLoginData[0].name}</div> */}

    </div>
  );
}

export default Topnav;
