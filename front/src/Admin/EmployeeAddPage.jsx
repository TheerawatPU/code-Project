import React, { useEffect, useState } from "react";
import axios from "axios";
import TopNavAD from "./ComponentAD/TopNavAD";
import MenuAD from "./ComponentAD/MenuAD";
import "./CSS/Employee.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import profileBG from "./img/profileBG.png";
import logo from "./img/logo2.png";

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

  const handleInput = (event) => {
    const { name, value } = event.target;

    setValues((prev) => ({ ...prev, [name]: value }));
  };
  // จัดการเกี่ยวกับรูปภาพ
  const [image, setImages] = useState([]);
  const [imageURls, setImageURls] = useState([]);

  useEffect(() => {
    if (image.length < 1) return;
    const newImageUrls = [];
    image.forEach((images) => newImageUrls.push(URL.createObjectURL(images)));
    setImageURls(newImageUrls);
  }, [image]);

  function onImageChange(e) {
    setImages([...e.target.files]);
  }

  console.log(values);
  console.log(image);

  return (
    <div className="all-page">
      <header className="header">
        <TopNavAD />
      </header>
      <section className="aside">
        <MenuAD />
      </section>
      <main className="main">
        <div className="top-text-new-EM">
          <div className="text-new-EM">เพิ่มข้อมูลพนักงาน</div>
        </div>

        <div className="text-new-lg">
          กรุณากรอกข้อมูลให้ครบทุกช่อง ถ้าไม่มีให้ใส่เครื่องหมาย - ไว้
        </div>

        <div className="box-big-bg-new-EM">
          {/* //!ฟอร์มที่1 รูป */}
          <div className="box-BG-area-new-EM">
            <form className="form-EM-new" onSubmit={handleSubmit}>
              <div className="form-row-img-AD">
                {/* <img src={profileBG} alt="" className="img-AD" /> */}
                {imageURls.map((imageSrc, index) => (
                  <img key={index} src="{imageSrc}" />
                ))}
              </div>
              <div className="form-row-new">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={onImageChange}
                />
              </div>
            </form>
          </div>
          {/* //!ฟอร์มที่2 ข้อมูลส่วนตัว */}
          <div className="box-BG-area-new-EM">
            <form className="form-EM-new" onSubmit={handleSubmit}>
              {/* เลือกตำแหน่ง และสถานะ */}
              <h2 style={{ marginBottom: "20px" }}>ข้อมูลส่วนตัว</h2>
              <div className="form-row-new-select-EM">
                <div className="select-row-C">
                  <label className="form-label-new-EM">
                    <p>*</p>ตำแหน่ง :
                  </label>
                  <select
                    className="form-input-select-EM"
                    name="department"
                    value={values.department}
                    onChange={handleInput}
                  >
                    <option>เลือกตำแหน่ง</option>
                    <option value="พนักงานฝ่ายขาย">พนักงานฝ่ายขาย</option>
                    <option value="พนักงานฝ่ายผลิต">พนักงานฝ่ายผลิต</option>
                    <option value="ผู้ดูแลระบบ">ผู้ดูแลระบบ</option>
                  </select>
                </div>

                <div className="select-row-C">
                  <label className="form-label-new-EM">
                    <p>*</p>สถานะการทำงาน :
                  </label>
                  <select
                    className="form-input-select-EM"
                    name="status"
                    value={values.status}
                    onChange={handleInput}
                  >
                    <option>เลือกสถานะการทำงาน</option>
                    <option value="กำลังทำงาน">กำลังทำงาน</option>
                    <option value="พ้นสภาพการทำงาน">พ้นสภาพการทำงาน</option>
                  </select>
                </div>
              </div>

              {/*คำนำหน้า ชื่อ-นามสกุล */}
              <div className="form-row-new-select-EM">
                <div className="select-row-C">
                  <label className="form-label-new-EM">
                    <p>*</p>คำนำหน้า :
                  </label>
                  <select
                    className="form-input-select-title-EM"
                    name="title"
                    value={values.title}
                    onChange={handleInput}
                  >
                    <option>เลือกคำนำหน้า</option>
                    <option value="นาย">นาย</option>
                    <option value="นาง">นาง</option>
                    <option value="นางสาว">นางสาว</option>
                  </select>
                </div>

                <div className="select-row-C">
                  <label className="form-label-new-EM">
                    <p>*</p>ชื่อ-นามสกุล :
                  </label>
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
                    <label className="form-label-new-EM">
                      <p>*</p>เพศ :
                    </label>
                    <div className="radio-EM">
                      <input
                        name="sex"
                        value="ชาย"
                        type="radio"
                        className="form-input-new-title-Radio-EM"
                        onChange={handleInput}
                      />
                      <span>ชาย</span>
                      <input
                        name="sex"
                        value="หญิง"
                        type="radio"
                        className="form-input-new-title-Radio-EM"
                        onChange={handleInput}
                      />
                      <span>หญิง</span>
                    </div>
                  </div>
                </div>

                <div className="select-row-C">
                  <label className="form-label-new-EM">
                    <p>*</p>วันเดือนปีเกิด :
                  </label>
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
                  <label className="form-label-new-EM">
                    <p>*</p>เบอร์โทรศัพท์ :
                  </label>
                  <input
                    name="phone"
                    type="text"
                    className="form-input-new-3-EM"
                    onChange={handleInput}
                  />
                </div>
                <div className="select-row-C">
                  <label className="form-label-new-EM">
                    <p>*</p>ไอดีไลน์ :
                  </label>
                  <input
                    name="line_id"
                    type="text"
                    className="form-input-new-3-EM"
                    onChange={handleInput}
                  />
                </div>
                <div className="select-row-C">
                  <label className="form-label-new-EM">
                    <p>*</p>เฟสบุ๊ค :
                  </label>
                  <input
                    name="facebook_id"
                    type="text"
                    className="form-input-new-3-EM"
                    onChange={handleInput}
                  />
                </div>
              </div>

              <div className="form-row-new">
                <label className="form-label-new">
                  <p>*</p>รหัสบัตรประชาชน :
                </label>
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
            <form className="form-EM-new" onSubmit={handleSubmit}>
              <h2 style={{ marginBottom: "20px" }}>บัญชีผู้ใช้</h2>
              <div className="form-row-new">
                <label className="form-label-new">
                  <p>*</p>อีเมล :
                </label>
                <input
                  name="username"
                  type="text"
                  className="form-input-new-EM"
                  onChange={handleInput}
                />
              </div>
              <div className="form-row-new">
                <label className="form-label-new">
                  <p>*</p>รหัสผ่าน :
                </label>
                <input
                  name="password"
                  type="text"
                  className="form-input-new-EM"
                  onChange={handleInput}
                />
              </div>
              <div className="form-row-new">
                <label className="form-label-new">
                  <p>*</p>ยืนยันรหัสผ่าน :
                </label>
                <input type="text" className="form-input-new-EM" />
              </div>
            </form>
          </div>
          {/* //!ปุ่ม */}
          <div className="btn-submit-new">
            <div className="btn-area-new">
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
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                <FontAwesomeIcon icon={faFloppyDisk} />
                <span>บันทึก</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EmployeeAddPage;
