import React, { useState, useEffect } from "react";
import axios from "axios";

function customerPDF() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    // ดึงข้อมูลผู้เข้าสู่ระบบจาก API
    axios
      .get("http://localhost:5500/check-login")
      .then((response) => {
        if (response.data.authenticated) {
          // อัปเดตสถานะด้วยชื่อผู้เข้าสู่ระบบ
          setUsername(response.data.userData.username);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>ชื่อผู้เข้าสู่ระบบ {username}</h1>
    </div>
  );
}

export default customerPDF;
