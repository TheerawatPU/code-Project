import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    // const validationErrors = Validation(values);
    // setErrors(validationErrors);

    // const noErrors = Object.values(validationErrors).every(
    //   (error) => error === ""
    // );
    console.log(values);

    try {
      const adminResponse = await axios.post(
        "http://localhost:5500/loginadmin",
        values
      );
      // const salesResponse = await axios.post(
      //   "http://localhost:2001/loginsales",
      //   values
      // );

      if (adminResponse.data[0].Success === "เข้าสู่ระบบได้") {
        const userLoginData = sessionStorage.getItem("userlogin");
        const parsedUserLoginData = JSON.parse(userLoginData);

        console.log(parsedUserLoginData);

        const alertSuccess = window.alert("เข้าสู่ระบบสำเร็จ");
        sessionStorage.setItem("userlogin", JSON.stringify(adminResponse.data));
        navigate("/EM/StablePage");
      } else {
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
    //showpass
    // const { name, value } = event.target;

    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value, // Remove square brackets
    }));
  };

  const [submitted, setSubmitted] = useState(false);
  console.log();

  return (
    <form className="form-stable-new" onSubmit={handleSubmit}>
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
    </form>
  );
}

export default Login;
