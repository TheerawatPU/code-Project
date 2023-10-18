import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/login.css";

function Login() {
  const navigate = useNavigate();

  // เก็บusername and password
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  // error
  const [errors, setErrors] = useState({
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
      {/* <form className="login0" onSubmit={handleSubmit}>
        <div className="login1">
          <div className="login1-1">
            <div className="onlogin">
              <div className="form-row-new">
                <label className="form-label-new">
                  <p>*</p>username :
                </label>
                <input
                  name="username"
                  type="text"
                  className="form-input-new"
                  onChange={handleInput}
                />
              </div>
              <div className="form-row-new">
                <label className="form-label-new">
                  <p>*</p>password :
                </label>
                <input
                  name="password"
                  type="text"
                  className="form-input-new"
                  onChange={handleInput}
                />
              </div>
              <button type="submit">เข้าสู่ระบบ</button>
            </div>
          </div>
        </div>
      </form> */}

      <div className="login-container">
        <h1 className="title-login">Food4skin Thailand</h1>
        <div className="glass-panel">
          <h2>เข้าสู่ระบบ</h2>
          {/* สร้างฟอร์มเข้าสู่ระบบ */}
          <form onSubmit={handleSubmit} className="login0">
            <input
              name="username"
              type="text"
              placeholder="บัญชีผู้ใช้"
              className="form-input-login"
              onChange={handleInput}
            />
            <input
              type="password"
              placeholder="รหัสผ่าน"
              name="password"
              className="form-input-login"
              onChange={handleInput}
            />
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
