import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Admin/CSS/login2.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

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
    <body>
      <div class="wave-container">
        <div class="wave"></div>
      </div>

      <div class="login-container">
        <h1>login</h1>
        <form action="">
          <input type="text" placeholder="Username" required />
          <input type="text" placeholder="Username" required />
          <button>login</button>
        </form>
      </div>
    </body>
  );
}

export default Login;
