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

function ProfileAdminEdit() {
  const navigate = useNavigate();
  const userLoginData = JSON.parse(sessionStorage.getItem("userlogin"));

  // โหลดข้อมูล จาก api
  useEffect(() => {
    axios
      .get(
        `http://localhost:5500/employeeReadID/${userLoginData[0].id_employee}`
      )
      .then((res) => {
        console.log(res);
        setValues({
          ...values,
          id_employee: res.data[0].id_employee,
          department: res.data[0].department,
          status: res.data[0].status,
          title: res.data[0].title,
          name: res.data[0].name,
          sex: res.data[0].sex,
          birthday: res.data[0].birthday,
          phone: res.data[0].phone,
          line_id: res.data[0].line_id,
          facebook_id: res.data[0].facebook_id,
          username: res.data[0].username,
          password: res.data[0].password,
          image: res.data[0].image,
          card_id: res.data[0].card_id,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  // state เก็บข้อมูลเพื่อเตรียมบันทึกลงฐานข้อมูล
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
  console.log("values", values);

  // ฟังก์ชั่นเตรียมอัพเดต
  const handleUpdate = (event) => {
    event.preventDefault();
    axios
      .put(
        "http://localhost:5500/employeeUpdate/" + userLoginData[0].id_employee,
        values
      )
      .then((res) => {
        console.log(res);

        // หลังจากที่อัพเดตข้อมูลสำเร็จ คุณสามารถอัพเดตข้อมูลใน sessionStorage ด้วยคำสั่งนี้
        userLoginData[0] = { ...userLoginData[0], ...values };
        sessionStorage.setItem("userlogin", JSON.stringify(userLoginData));

        navigate("/AD/ProfileReadID");
      })
      .catch((err) => console.log(err));
  };
  // state เก็บรูปภาพ
  const [selectedImage, setSelectedImage] = useState(null);

  // เก็บข้อมูลจาก input ส่งไป Values รวมถึงเช็ครูปภาพด้วย
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
                แก้ไขโปรไฟล์
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
                <button className="submit" onClick={handleUpdate} type="submit">
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
                />
              </div>
            </div>
            <div className="embox22">
              <div className="embox22_1">
                <div className="textem1">
                  <h3>รหัสพนักงาน:</h3>
                  <input
                    type="text"
                    className="inputtext1"
                    disabled
                    value={userLoginData[0].id_employee}
                  />
                </div>

                <div className="textem1">
                  <h3>ตำแหน่ง:</h3>
                  <select
                    className="inputtext1_3"
                    name="department"
                    onChange={(e) =>
                      setValues({ ...values, department: e.target.value })
                    }
                    value={values.department}
                    disabled
                  >
                    <option value="">เลือกตำแหน่ง</option>
                    <option value="ผู้บริหาร">ผู้บริหาร</option>
                    <option value="พนักงานฝ่ายผลิต">พนักงานฝ่ายผลิต</option>
                  </select>
                </div>

                <div className="textem1">
                  <h3>สถานะการทำงาน:</h3>
                  <select
                    className="inputtext1_3"
                    name="status"
                    onChange={(e) =>
                      setValues({ ...values, status: e.target.value })
                    }
                    value={values.status}
                    disabled
                  >
                    <option value="">เลือกสถานะการทำงาน</option>
                    <option value="กำลังทำงาน">กำลังทำงาน</option>
                    <option value="พ้นสภาพการทำงาน">พ้นสภาพการทำงาน</option>
                  </select>
                </div>
              </div>

              <div className="embox22_1">
                <div className="textem1">
                  <h3>คำนำหน้า:</h3>
                  <select
                    name="title"
                    className="inputtext1_3"
                    onChange={(e) =>
                      setValues({ ...values, title: e.target.value })
                    }
                    value={values.title}
                  >
                    <option value="">เลือกคำนำหน้า</option>
                    <option value="นาย">นาย</option>
                    <option value="นาง">นาง</option>
                    <option value="นางสาว">นางสาว</option>
                  </select>
                </div>
                <div className="textem1">
                  <h3>ชื่อ-นามสกุล:</h3>
                  <input
                    type="text"
                    className="inputtext1"
                    name="name"
                    value={values.name}
                    onChange={(e) =>
                      setValues({ ...values, name: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="embox22_1">
                <div className="textem1">
                  <h3>เพศ:</h3>
                  <select
                    name="sex"
                    className="inputtext1_3"
                    value={values.sex}
                    onChange={(e) =>
                      setValues({ ...values, sex: e.target.value })
                    }
                  >
                    <option value="">เลือกเพศ</option>
                    <option value="ชาย">ชาย</option>
                    <option value="หญิง">หญิง</option>
                  </select>
                </div>
                <div className="textem1">
                  <h3>วันเกิด:</h3>
                  <input
                    type="date"
                    className="inputtext1"
                    name="birthday"
                    value={values.birthday}
                    onChange={(e) =>
                      setValues({ ...values, birthday: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="embox22_1">
                <div className="textem1">
                  <h3>เลขบัตรประชาชน:</h3>
                  <input
                    type="number"
                    className="inputtext1_2"
                    name="card_id"
                    maxLength={13}
                    required
                    value={values.card_id}
                    onChange={(e) =>
                      setValues({ ...values, card_id: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="embox22_1-2">
                <div className="textem1">
                  <h3>เบอร์โทรศัพท์:</h3>
                  <input
                    type="text"
                    className="inputtext1"
                    name="phone"
                    maxLength={12}
                    required
                    value={values.phone}
                    onChange={(e) =>
                      setValues({ ...values, phone: e.target.value })
                    }
                  />
                </div>
                <div className="textem1">
                  <h3>ไอดีไลน์:</h3>
                  <input
                    type="text"
                    className="inputtext1"
                    name="line_id"
                    value={values.line_id}
                    onChange={(e) =>
                      setValues({ ...values, line_id: e.target.value })
                    }
                  />
                </div>
                <div className="textem1">
                  <h3>ชื่อเฟสบุ๊ค:</h3>
                  <input
                    type="text"
                    className="inputtext1"
                    name="facebook_id"
                    value={values.facebook_id}
                    onChange={(e) =>
                      setValues({ ...values, facebook_id: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="embox22_1">
                <div className="textem1">
                  <h3>บัญชีผู้ใช้:</h3>
                  <input
                    type="text"
                    className="inputtext1_2"
                    name="username"
                    value={values.username}
                    onChange={(e) =>
                      setValues({ ...values, username: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="embox22_1">
                <div className="textem1">
                  <h3>รหัสผ่าน:</h3>
                  <input
                    type="password"
                    className="inputtext1_2"
                    name="password"
                    value={values.password}
                    onChange={(e) =>
                      setValues({ ...values, password: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfileAdminEdit;
