import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import "../CSS/login.css";

function LoginForm() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    axios
      .post("http://localhost:5500/login", { username, password })
      .then((response) => {
        if (response.data.success) {
          if (response.data.department === "พนักงานฝ่ายผลิต") {
            window.alert("เข้าสู่ระบบสำเร็จ1");
          } else if (response.data.department === "ผู้บริหาร") {
            window.alert("เข้าสู่ระบบสำเร็จ1");
          }
        } else {
          // window.alert("เข้าสู่ระบบสำเร็จไม่สำเร็จ");
          setMessage("บัญชีผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="login-container">
        <h1 className="title-login">Food4skin Thailand</h1>
        <div className="glass-panel">
          <h2>เข้าสู่ระบบ</h2>
          {/* สร้างฟอร์มเข้าสู่ระบบ */}
          <div className="login0">
            <input
              name="username"
              type="text"
              placeholder="บัญชีผู้ใช้"
              className="form-input-login"
              onChange={(e) => setUsername(e.target.value)}
              // onChange={handleInput}
            />
            <input
              type="password"
              placeholder="รหัสผ่าน"
              name="password"
              className="form-input-login"
              onChange={(e) => setPassword(e.target.value)}
              // onChange={handleInput}
            />
            <button className="login-btn" type="submit" onClick={handleLogin}>
              ตกลง
            </button>
            <p>{message}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
