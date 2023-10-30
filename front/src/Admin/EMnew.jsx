import React, { useEffect, useState } from "react";
import axios from "axios";
import TopNavAD from "./ComponentAD/TopNavAD";
import MenuAD from "./ComponentAD/MenuAD";
import { useNavigate } from "react-router-dom";
import {
  faFloppyDisk,
  faBan,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./CSS/EM.css";

import Validation from "../function/EmployeeValidate";

function EMnew() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    department: "",
    status: "",
    title: "",
    name: "",
    sex: "",
    birthday: "",
    phone: "",
    line_id: "",
    facebook_id: "",
    username: "",
    password: "",
    image: "",
    card_id: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  // เช็ค Error พร้อม บันทึก
  const [errors, setErrors] = useState({});
  const handleSubmit = (event) => {
    event.preventDefault();
    // ตรวจสอบและลบขีดคั่นออกจากเบอร์โทรศัพท์
    const formattedPhone = values.phone.replace(/-/g, "");

    const err = Validation({ ...values, phone: formattedPhone });
    setErrors(err);

    if (
      err.department === "" &&
      err.status === "" &&
      err.title === "" &&
      err.name === "" &&
      err.sex === "" &&
      err.birthday === "" &&
      err.phone === "" &&
      err.line_id === "" &&
      err.facebook_id === "" &&
      err.card_id === "" &&
      err.username === "" &&
      err.password === "" &&
      err.image === ""
    ) {
      axios
        .post("http://localhost:5500/employeeNew", {
          ...values,
          phone: formattedPhone,
        })
        .then((res) => {
          console.log(res);
          navigate("/AD/EmployeeReadPage");
        })
        .catch((err) => console.log(err));
    }
  };

  const [phoneNumber, setPhoneNumber] = useState("");
  const [cradID, setCradID] = useState("");

  const handleInput = (event) => {
    const { name, value } = event.target;

    if (name === "image") {
      const selectedFile = event.target.files[0]; // Get the selected image file
      if (selectedFile) {
        setSelectedImage(selectedFile); // Set the selected image to the state

        const reader = new FileReader();
        reader.onload = (event) => {
          const base64Image = event.target.result;

          // นำรูปภาพมาเพิ่มใน values
          setValues({
            ...values,
            image: base64Image,
          });

          // นำ base64 ของรูปภาพไปเก็บลงในโฟลเดอร์ (ถ้าต้องการ)
          // saveBase64ImageToFile(base64Image);
        };

        reader.readAsDataURL(selectedFile);
      }
    }

    if (name === "card_id") {
      const formattedCardID = value.replace(/-/g, "");
      const formattedText1 = formattedCardID
        .replace(/\D/g, "")
        .slice(0, 13)
        .replace(/(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})/, "$1-$2-$3-$4-$5");

      setCradID(formattedText1);
      setValues((prev) => ({ ...prev, [name]: formattedText1 }));
    }

    if (name === "phone") {
      const formattedPhoneNumber = value.replace(/-/g, "");
      const formattedText = formattedPhoneNumber.replace(/\D/g, "");

      // ตรวจสอบเงื่อนไขเพื่อให้ตัวเลขในเบอร์โทรศัพท์เป็นเฉพาะตัวเลขและตัดจำนวนให้เหลือเพียง 10 หรือ 9 ตัว
      let formattedPhoneNumberFinal;
      if (formattedText.length === 9) {
        formattedPhoneNumberFinal = formattedText.replace(
          /(\d{2})(\d{3})(\d{4})/,
          "$1-$2-$3"
        );
      } else {
        formattedPhoneNumberFinal = formattedText
          .slice(0, 10)
          .replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
      }

      setPhoneNumber(formattedPhoneNumberFinal);
      setValues((prev) => ({ ...prev, [name]: formattedPhoneNumberFinal }));
    } else {
      setValues((prev) => ({ ...prev, [name]: value }));
    }

    // setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="all-page-new">
      <header className="header-new">
        <TopNavAD />
      </header>
      <section className="aside-new">
        <MenuAD />
      </section>

      <main className="main-new">
        <div className="embox0">
          <div className="emtitle">
            <div className="title1">
              <div className="text_title1">
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  style={{ marginRight: "10px", cursor: "pointer" }}
                  onClick={() => navigate(-1)}
                />
                เพิ่มข้อมูลพนักงาน
              </div>
            </div>
            <div className="title2">
              <div className="btn_can">
                <button
                  className="cencle"
                  onClick={() => navigate(-1)}
                  type="cancle"
                >
                  <FontAwesomeIcon icon={faBan} />
                  <label htmlFor="" className="text_cencle">
                    ยกเลิก
                  </label>
                </button>
              </div>

              <div className="btn_can">
                <button className="submit" onClick={handleSubmit} type="submit">
                  <FontAwesomeIcon icon={faFloppyDisk} />
                  <label htmlFor="" className="text_cencle">
                    บันทึก
                  </label>
                </button>
              </div>
            </div>
          </div>
          <div className="embox1">
            <div className="embox21">
              <div className="pic0">
                <img src={values.image} alt="" className="pic1" name="image" />
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleInput}
                  src={values.image}
                />
                {errors.image && <p>{errors.image}</p>}
              </div>
            </div>
            <div className="embox22">
              <div className="embox22_1">
                {/* <div className="textem1">
                  <h3>รหัสพนักงาน:</h3>
                  <input
                    type="text"
                    className="inputtext1"
                    disabled
                    value={""}
                  />
                </div> */}
                <div className="textem1">
                  <h3>ตำแหน่ง:</h3>
                  <select
                    className="inputtext1_3"
                    name="department"
                    onChange={handleInput}
                  >
                    <option value="">เลือกตำแหน่ง</option>
                    <option value="ผู้บริหาร">ผู้บริหาร</option>
                    <option value="พนักงานฝ่ายผลิต">พนักงานฝ่ายผลิต</option>
                  </select>
                  {errors.department && <p>{errors.department}</p>}
                </div>
                <div className="textem1">
                  <h3>สถานะการทำงาน:</h3>
                  <select
                    className="inputtext1_3"
                    name="status"
                    onChange={handleInput}
                  >
                    <option value="">เลือกตำแหน่ง</option>
                    <option value="กำลังทำงาน">กำลังทำงาน</option>
                    <option value="พ้นสภาพการทำงาน">พ้นสภาพการทำงาน</option>
                  </select>
                  {errors.status && <p>{errors.status}</p>}
                </div>
              </div>

              <div className="embox22_1">
                <div className="textem1">
                  <h3>คำนำหน้า:</h3>
                  <select
                    name="title"
                    onChange={handleInput}
                    className="inputtext1_3"
                  >
                    <option value="">เลือกคำนำหน้า</option>
                    <option value="นาย">นาย</option>
                    <option value="นาง">นาง</option>
                    <option value="นางสาว">นางสาว</option>
                  </select>
                  {errors.title && <p>{errors.title}</p>}
                </div>
                <div className="textem1">
                  <h3>ชื่อ-นามสกุล:</h3>
                  <input
                    type="text"
                    className="inputtext1"
                    name="name"
                    onChange={handleInput}
                  />
                  {errors.name && <p>{errors.name}</p>}
                </div>
              </div>

              <div className="embox22_1">
                <div className="textem1">
                  <h3>เพศ:</h3>
                  <select
                    name="sex"
                    className="inputtext1_3"
                    onChange={handleInput}
                  >
                    <option value="">เลือกเพศ</option>
                    <option value="ชาย">ชาย</option>
                    <option value="หญิง">หญิง</option>
                  </select>
                  {errors.sex && <p>{errors.sex}</p>}
                </div>
                <div className="textem1">
                  <h3>วันเกิด:</h3>
                  <input
                    type="date"
                    className="inputtext1"
                    name="birthday"
                    onChange={handleInput}
                  />
                  {errors.birthday && <p>{errors.birthday}</p>}
                </div>
              </div>

              <div className="embox22_1">
                <div className="textem1">
                  <h3>เลขบัตรประชาชน:</h3>
                  <input
                    type="text"
                    className="inputtext1_2"
                    name="card_id"
                    onChange={handleInput}
                    value={cradID}
                    maxLength={17}
                    required
                  />
                  {errors.card_id && <p>{errors.card_id}</p>}
                </div>
              </div>

              <div className="embox22_1-2">
                <div className="textem1">
                  <h3>เบอร์โทรศัพท์:</h3>
                  <input
                    type="text"
                    className="inputtext1"
                    name="phone"
                    onChange={handleInput}
                    value={phoneNumber}
                    maxLength={12}
                    required
                  />
                  {errors.phone && <p>{errors.phone}</p>}
                </div>
                <div className="textem1">
                  <h3>ไอดีไลน์:</h3>
                  <input
                    type="text"
                    className="inputtext1"
                    name="line_id"
                    onChange={handleInput}
                  />
                  {errors.line_id && <p>{errors.line_id}</p>}
                </div>
                <div className="textem1">
                  <h3>ชื่อเฟสบุ๊ค:</h3>
                  <input
                    type="text"
                    className="inputtext1"
                    name="facebook_id"
                    onChange={handleInput}
                  />
                  {errors.facebook_id && <p>{errors.facebook_id}</p>}
                </div>
              </div>

              <div className="embox22_1">
                <div className="textem1">
                  <h3>บัญชีผู้ใช้:</h3>
                  <input
                    type="text"
                    className="inputtext1_2"
                    name="username"
                    onChange={handleInput}
                  />
                  {errors.username && <p>{errors.username}</p>}
                </div>
              </div>

              <div className="embox22_1">
                <div className="textem1">
                  <h3>รหัสผ่าน:</h3>
                  <input
                    type="password"
                    className="inputtext1_2"
                    name="password"
                    onChange={handleInput}
                  />
                  {errors.password && <p>{errors.password}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EMnew;
