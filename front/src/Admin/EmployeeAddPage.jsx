import React, { useEffect, useState } from "react";
import axios from "axios";
import TopNavAD from "./ComponentAD/TopNavAD";
import MenuAD from "./ComponentAD/MenuAD";
import "./CSS/Employee.css";
import { useNavigate } from "react-router-dom";
import {
  faFloppyDisk,
  faXmark,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import profileBG from "./img/profileBG.png";
import logo from "./img/logo2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { FaArrowLeftLong } from "react-icons/fa6";
import { ImCancelCircle } from "react-icons/im";
import { FaPen, FaEye } from "react-icons/fa";

import pat from "./img/pat.png";

function EmployeeAddPage() {
  
  const userLoginData = JSON.parse(sessionStorage.getItem("userlogin"));

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
  });
  console.log(values);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:5500/employeeNew", {
        ...values,
      })
      .then((res) => {
        console.log(res);
        navigate("/AD/EmployeeReadPage");
      })
      .catch((err) => console.log(err));
  };

  const [selectedImage, setSelectedImage] = useState(null);

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

    setValues((prev) => ({ ...prev, [name]: value }));
  };
  // จัดการเกี่ยวกับรูปภาพ

  return (
    <div className="all-page-new">
      <header className="header-new">
        <TopNavAD />
      </header>
      <section className="aside-new">
        <MenuAD />
      </section>
      <main className="main-new">
        <div className="top-text-new">
          <div className="text-new" style={{ marginLeft: "80px" }}>
            เพิ่มข้อมูลพนักงาน
          </div>
        </div>

        <div className="text-new-lg" style={{ marginLeft: "80px" }}>
          กรุณากรอกข้อมูลให้ครบทุกช่อง ถ้าไม่มีให้ใส่เครื่องหมาย - ไว้
        </div>

        <div className="box-big-bg-new-EM">
          {/* //!ฟอร์มที่1 รูป */}
          <div className="box-BG-area-new-EM">
            <form className="form-EM-new">
              <div className="form-row-img-AD">
                <img src={values.image} alt="" className="img-AD" />
              </div>
              <div className="form-row-new">
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleInput}
                />
              </div>
            </form>
          </div>
          {/* //!ฟอร์มที่2 ข้อมูลส่วนตัว */}
          <div className="box-BG-area-new-EM">
            <form className="form-EM-new">
              {/* เลือกตำแหน่ง และสถานะ */}
              <h2 style={{ marginBottom: "20px" }}>ข้อมูลส่วนตัว</h2>
              <div className="form-row-new-select-EM">
                <div className="select-row-C">
                  <label className="form-label-new-EM">ตำแหน่ง :</label>
                  <select
                    className="form-input-select-EM"
                    name="department"
                    onChange={handleInput}
                  >
                    <option>เลือกตำแหน่ง</option>
                    <option>ผู้บริหาร</option>
                    <option>พนักงานฝ่ายผลิต</option>
                  </select>
                  {/* <input
                    type="text"
                    className="form-input-select-EM"
                    name="department"
                    onChange={handleInput}
                  /> */}
                </div>

                <div className="select-row-C">
                  <label className="form-label-new-EM">สถานะการทำงาน :</label>
                  {/* <input
                    type="text"
                    className="form-input-select-EM"
                    name="status"
                    onChange={handleInput}
                  /> */}
                  <select
                    className="form-input-select-EM"
                    name="status"
                    onChange={handleInput}
                  >
                    <option>เลือกสถานะการทำงาน</option>
                    <option>กำลังทำงาน</option>
                    <option>พ้นสภาพการทำงาน</option>
                  </select>
                </div>
              </div>

              {/*คำนำหน้า ชื่อ-นามสกุล */}
              <div className="form-row-new-select-EM">
                <div className="select-row-C">
                  <label className="form-label-new-EM">คำนำหน้า :</label>
                  <select
                    className="form-input-select-title-EM"
                    name="title"
                    onChange={handleInput}

                    // value={values.title}
                  >
                    <option>เลือกคำนำหน้า</option>
                    <option>นาย</option>
                    <option>นาง</option>
                    <option>นางสาว</option>
                  </select>
                  {/* <input
                    type="text"
                    className="form-input-select-title-EM"
                    name="title"
                    onChange={handleInput}
                  /> */}
                </div>

                <div className="select-row-C">
                  <label className="form-label-new-EM">ชื่อ-นามสกุล :</label>
                  <input
                    name="name"
                    type="text"
                    className="form-input-new-title-EM"
                    onChange={handleInput}
                  />
                </div>
              </div>

              {/* เพศ วันเกิด */}
              <div className="form-row-new-select-EM-Radio">
                <div className="select-row-Radio">
                  <div className="btn-Radio">
                    <label className="form-label-new-EM">เพศ :</label>
                    <div className="radio-EM">
                      <input
                        name="sex"
                        value="ชาย"
                        onChange={handleInput}
                        type="radio"
                        className="form-input-new-title-Radio-EM"
                      />
                      <span>ชาย</span>
                      <input
                        onChange={handleInput}
                        name="sex"
                        value="หญิง"
                        type="radio"
                        className="form-input-new-title-Radio-EM"
                      />
                      <span>หญิง</span>
                    </div>
                  </div>
                </div>

                <div className="select-row-C">
                  <label className="form-label-new-EM">วันเดือนปีเกิด :</label>
                  <input
                    name="birthday"
                    type="date"
                    className="form-input-new-title-EM"
                    onChange={handleInput}
                  />
                </div>
              </div>

              {/* เบอร์โทร IDLine Facebook */}

              <div className="form-row-new-select-EM">
                <div className="select-row-C">
                  <label className="form-label-new-EM">เบอร์โทรศัพท์ :</label>
                  <input
                    name="phone"
                    type="text"
                    className="form-input-new-3-EM"
                    onChange={handleInput}
                  />
                </div>
                <div className="select-row-C">
                  <label className="form-label-new-EM">ไอดีไลน์ :</label>
                  <input
                    name="line_id"
                    type="text"
                    className="form-input-new-3-EM"
                    onChange={handleInput}
                  />
                </div>
                <div className="select-row-C">
                  <label className="form-label-new-EM">เฟสบุ๊ค :</label>
                  <input
                    name="facebook_id"
                    type="text"
                    className="form-input-new-3-EM"
                    onChange={handleInput}
                  />
                </div>
              </div>

              <div className="form-row-new">
                <label className="form-label-new">รหัสบัตรประชาชน :</label>
                <input
                  name="card_id"
                  type="text"
                  className="form-input-new-EM"
                  onChange={handleInput}
                />
              </div>
            </form>
          </div>
          {/* //!ฟอร์มที่3 บัญชีผู้ใช้ */}
          <div className="box-BG-area-new-EM">
            <form className="form-EM-new">
              <h2 style={{ marginBottom: "20px" }}>บัญชีผู้ใช้</h2>
              <div className="form-row-new">
                <label className="form-label-new">อีเมล :</label>
                <input
                  name="username"
                  type="text"
                  className="form-input-new-EM"
                  onChange={handleInput}
                />
              </div>
              <div className="form-row-new">
                <label className="form-label-new">รหัสผ่าน :</label>
                <input
                  name="password"
                  type="password"
                  className="form-input-new-EM"
                  onChange={handleInput}
                />
              </div>
            </form>
          </div>
          {/* //!ปุ่ม */}
          <div className="btn-submit-new">
            <div className="btn-area-new" style={{ width: "60%" }}>
              <button
                type="cancle"
                className="cancle-new"
                onClick={() => navigate(-1)}
              >
                <FontAwesomeIcon icon={faXmark} />
                <span>ยกเลิก</span>
              </button>
              <button
                type="submit"
                className="submit-new"
                onClick={handleSubmit}
              >
                <FaPen />
                {/* <FontAwesomeIcon icon={faFloppyDisk} /> */}
                <span>แก้ไข</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EmployeeAddPage;
