import React, { useEffect, useState } from "react";
import axios from "axios";
import TopNavAD from "./ComponentAD/TopNavAD";
import MenuAD from "./ComponentAD/MenuAD";
import { useNavigate, useParams } from "react-router-dom";
import {
  faFloppyDisk,
  faXmark,
  faPenToSquare,
  faBan,
  faArrowLeft,
  faCircleArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import profileBG from "./img/profileBG.png";
import logo from "./img/logo2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { FaArrowLeftLong } from "react-icons/fa6";
import { ImCancelCircle } from "react-icons/im";
import { FaPen, FaEye } from "react-icons/fa";

import { format } from "date-fns";

import Validation from "../function/EmployeeValidate";

function EMUP() {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      //อัพเดตข้อมูล
      .get("http://localhost:5500/employeeUpdateID/" + id)
      .then((res) => {
        console.log(res);
        const receivedBirthdate = new Date(res.data[0].birthday);
        setValues({
          ...values,
          id_employee: res.data[0].id_employee,
          department: res.data[0].department,
          status: res.data[0].status,
          title: res.data[0].title,
          name: res.data[0].name,
          sex: res.data[0].sex,
          birthday: receivedBirthdate,
          phone: res.data[0].phone,
          line_id: res.data[0].line_id,
          facebook_id: res.data[0].facebook_id,
          username: res.data[0].username,
          password: res.data[0].password,
          image: res.data[0].image,
          card_id: res.data[0].card_id,
        });

        // Format and set the date string for display
        setBirthdateString(format(receivedBirthdate, "yyyy-MM-dd"));
      })
      .catch((err) => console.log(err));
  }, []);

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
    birthdate: new Date(), // Initialize with a default date
  });

  const [birthdateString, setBirthdateString] = useState(""); // State for formatted date

  const handleUpdate = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:5500/employeeUpdate/" + id, values)
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
    } else if (name === "card_id") {
      if (value.length <= 13) {
        setValues({ ...values, card_id: value });
      } else {
        // แจ้งเตือนถ้าความยาวเกิน 13 ตัว
        alert("กรุณากรอกเลขบัตรประชาชนไม่เกิน 13 ตัว");
      }
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
          <form onSubmit={handleUpdate} className="embox0">
            <div className="emtitle">
              <div className="title1">
                <div className="text_title1">
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    style={{ marginRight: "10px", cursor: "pointer" }}
                    onClick={() => navigate(-1)}
                  />
                  แก้ไขข้อมูลพนักงาน
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
                  <button
                    className="submit"
                    onSubmit={handleUpdate}
                    type="submit"
                  >
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
                  <img
                    src={values.image}
                    alt=""
                    className="pic1"
                    name="image"
                  />
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
                    <label className="text_input0">ตำแหน่ง</label>
                    {/* <h3>ตำแหน่ง:</h3> */}
                    <select
                      className="inputtext1_3"
                      name="department"
                      onChange={(e) =>
                        setValues({ ...values, department: e.target.value })
                      }
                    >
                      <option>{values.department}</option>
                      <option value="ผู้บริหาร">ผู้บริหาร</option>
                      <option value="พนักงานฝ่ายผลิต">พนักงานฝ่ายผลิต</option>
                    </select>
                  </div>
                  <div className="textem1">
                    <label className="text_input0">สถานะการทำงาน</label>
                    {/* <h3>สถานะการทำงาน:</h3> */}
                    <select
                      className="inputtext1_3"
                      name="status"
                      onChange={(e) =>
                        setValues({ ...values, status: e.target.value })
                      }
                    >
                      <option>{values.status}</option>
                      <option value="กำลังทำงาน">กำลังทำงาน</option>
                      <option value="พ้นสภาพการทำงาน">พ้นสภาพการทำงาน</option>
                    </select>
                  </div>
                </div>

                <div className="embox22_1">
                  <div className="textem1">
                    <label className="text_input0">คำนำหน้า:</label>

                    {/* <h3>คำนำหน้า:</h3> */}
                    <select
                      name="title"
                      onChange={(e) =>
                        setValues({ ...values, title: e.target.value })
                      }
                      className="inputtext1_3"
                    >
                      <option>{values.title}</option>
                      <option value="นาย">นาย</option>
                      <option value="นาง">นาง</option>
                      <option value="นางสาว">นางสาว</option>
                    </select>
                  </div>
                  <div className="textem1">
                    <label className="text_input0">ชื่อ-นามสกุล:</label>

                    {/* <h3>ชื่อ-นามสกุล:</h3> */}
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
                    <label className="text_input0">เพศ</label>

                    {/* <h3>เพศ:</h3> */}
                    <select
                      name="sex"
                      className="inputtext1_3"
                      onChange={(e) =>
                        setValues({ ...values, sex: e.target.value })
                      }
                    >
                      <option value="">{values.sex}</option>
                      <option value="ชาย">ชาย</option>
                      <option value="หญิง">หญิง</option>
                    </select>
                  </div>
                  <div className="textem1">
                    <label className="text_input0">วันเกิด</label>

                    {/* <h3>วันเกิด:</h3> */}
                    <input
                      type="date"
                      className="inputtext1"
                      name="birthday"
                      value={birthdateString}
                      onChange={(e) => {
                        const selectedDate = new Date(e.target.value);
                        setValues({
                          ...values,
                          birthday: selectedDate,
                        });
                        setBirthdateString(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="embox22_1">
                  <div className="textem1">
                    <label className="text_input0">เลขบัตรประชาชน</label>

                    {/* <h3>เลขบัตรประชาชน:</h3> */}
                    <input
                      type="number"
                      className="inputtext1_2"
                      name="card_id"
                      value={values.card_id}
                      maxLength={13}
                      required
                      onChange={(e) =>
                        setValues({ ...values, card_id: e.target.value })
                      }
                      // onChange={(e) => {
                      //   // ตรวจสอบความยาวของข้อมูลที่กรอก
                      //   if (e.target.value.length <= 13) {
                      //     setValues({ ...values, card_id: e.target.value });
                      //   }
                      // }}
                    />
                  </div>
                </div>

                <div className="embox22_1-2">
                  <div className="textem1">
                    <label className="text_input0">เบอร์โทรศัพท์</label>

                    {/* <h3>เบอร์โทรศัพท์:</h3> */}
                    <input
                      type="number"
                      className="inputtext1"
                      name="phone"
                      value={values.phone}
                      onChange={(e) =>
                        setValues({ ...values, phone: e.target.value })
                      }
                    />
                  </div>
                  <div className="textem1">
                    <label className="text_input0">ไอดีไลน์</label>

                    {/* <h3>ไอดีไลน์:</h3> */}
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
                    <label className="text_input0">ชื่อเฟสบุ๊ค</label>

                    {/* <h3>ชื่อเฟสบุ๊ค:</h3> */}
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
                    <label className="text_input0">บัญชีผู้ใช้</label>

                    {/* <h3>บัญชีผู้ใช้:</h3> */}
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
                    <label className="text_input0">รหัสผ่าน</label>

                    {/* <h3>รหัสผ่าน:</h3> */}
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
          </form>
        </div>
      </main>
    </div>
  );
}

export default EMUP;
