import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/login.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const navigate = useNavigate();

  // เก็บusername and password
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  //ฟังก์ชั่นการเข้าสู่ระบบ
  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(values);

    try {
      const adminResponse = await axios.post(
        "http://localhost:5500/loginadmin",
        values
      );

      if (adminResponse.data[0].department === "พนักงานฝ่ายผลิต") {
        const userLoginData = sessionStorage.getItem("userlogin");

        const parsedUserLoginData = JSON.parse(userLoginData);

        console.log(parsedUserLoginData);

        window.alert("เข้าสู่ระบบสำเร็จ");

        sessionStorage.setItem("userlogin", JSON.stringify(adminResponse.data));

        navigate("/EM/StablePage");
      } else if (adminResponse.data[0].department === "ผู้บริหาร") {
        const userLoginData = sessionStorage.getItem("userlogin");
        const parsedUserLoginData = JSON.parse(userLoginData);

        console.log(parsedUserLoginData);

        window.alert("เข้าสู่ระบบสำเร็จ");

        sessionStorage.setItem("userlogin", JSON.stringify(adminResponse.data));

        navigate("/AD/EmployeeReadPage");
      } else {
        window.alert("เข้าสู่ระบบสำเร็จไม่สำเร็จ");
        // window.alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
        // alert("เข้าสู่ระบบไม่สำเร็จ");
      }
      setSubmitted(true);
    } catch (error) {
      window.alert("ข้อมูลผู้เข้าสู่ระบบไม่ถูกต้อง หรือพ้นสภาพการทำงานแล้ว ");
      console.error(error);
    }
  };

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const [submitted, setSubmitted] = useState(false);
  console.log();

  return (
    <>
      <div className="login-container">
        <div className="glass-panel">
          <div className="piclog01">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
              alt=""
              className="piclog02"
            />
          </div>
          <h1 className="title-login">Food4skin Thailand</h1>
          <h2>เข้าสู่ระบบ</h2>

          <form onSubmit={handleSubmit} className="login0">
            <div className="rowI">
              <input
                name="username"
                type="text"
                placeholder="บัญชีผู้ใช้"
                className="form-input-login"
                onChange={handleInput}
              />
              <div className="icons">
                <FontAwesomeIcon icon={faUser} />
              </div>
            </div>

            <div className="rowI">
              {" "}
              <input
                type="password"
                placeholder="รหัสผ่าน"
                name="password"
                className="form-input-login"
                onChange={handleInput}
              />
              <div className="icons">
                <FontAwesomeIcon icon={faKey} />
              </div>
            </div>

            <button className="login-btn" type="submit">
              ตกลง
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
