import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Menu from "../../component/Menu";
import Topnav from "../../component/Topnav";

import { faPenToSquare, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { ImCancelCircle } from "react-icons/im";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaArrowLeftLong } from "react-icons/fa6";

import "../../CSS/Profile.css";

function ProfileEdit() {
  // ไอดีจาก URL
  const { id } = useParams();
  // นำทางข้าม component
  const navigate = useNavigate();
  // state เก็บ ข้อมูลจาก api
  const [data, setData] = useState([]);
  // โหลดข้อมูล จาก api
  useEffect(() => {
    axios
      .get(`http://localhost:5500/employeeReadID/${id}`)
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
      .put("http://localhost:5500/employeeUpdate/" + id, values)
      .then((res) => {
        console.log(res);
        navigate("/EM/ProfileRead");
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
    <>
      <div className="all-page">
        <header className="header">
          <Topnav />
        </header>
        <section className="aside">
          <Menu />
        </section>
        <main className="main">
          <div className="title-Text">
            <div className="top-text-new-EM">
              <div className="text-new-EM-Unit">
                <div
                  className="titleText"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(-1)}
                >
                  <FaArrowLeftLong />
                </div>
                <div className="titleText">แก้ไขโปรไฟล์</div>
              </div>
            </div>
            <div className="all-btn-0">
              <button
                className="btn01"
                type="submit"
                style={{
                  background: "rgb(221 62 62)",
                  color: "white",
                  width: "auto",
                  height: "auto",
                  marginRight: "20px",
                  marginBottom: "10px",
                }}
                onClick={() => navigate(-1)}
              >
                <div className="btn-save01">
                  <ImCancelCircle />
                  <label style={{ paddingLeft: "5px" }}>ยกเลิก</label>
                </div>
              </button>
              <button
                onClick={handleUpdate}
                className="btn01"
                type="submit"
                style={{
                  background: "#22a699",
                  color: "white",
                  width: "auto",
                  height: "auto",
                  marginRight: "50px",
                  marginBottom: "10px",
                }}
              >
                <div className="btn-save01">
                  <FontAwesomeIcon icon={faFloppyDisk} />
                  {/* <FontAwesomeIcon icon={faPenToSquare} /> */}
                  <label style={{ paddingLeft: "5px" }}>บันทึก</label>
                </div>
              </button>
            </div>
          </div>

          <div className="Ubox0">
            <div className="Profile1">
              <img
                src={values.image}
                alt=""
                className="profile-img"
                name="image"
              />
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleInput}
              />
            </div>

            <div className="Profile2">
              {/* รหัส-ตำแหน่ง */}
              <div className="profile2plye" style={{ marginTop: "10px" }}>
                <div className="profile2-1">
                  <label className="label-profile">รหัสพนักงาน:</label>
                  <input
                    type="text"
                    className="input-profile"
                    disabled
                    name="id_employee"
                    value={values.id_employee}
                  />
                </div>
                <div className="profile2-1">
                  <label className="label-profile">ตำแหน่ง:</label>
                  {/* <select name="" id="" className="input-profile">
                    <option value="">1</option>
                  </select> */}
                  <input
                    type="text"
                    className="input-profile"
                    disabled
                    value={values.department}
                  />
                </div>
              </div>

              {/* คำนำหน้า-ชื่อ */}
              <div className="profile2plye">
                <div className="profile2-1">
                  <label className="label-profile">คำนำหน้า:</label>
                  <select
                    name="title"
                    id=""
                    className="input-profile"
                    onChange={(e) =>
                      setValues({ ...values, title: e.target.value })
                    }
                  >
                    <option value="">{values.title}</option>
                    <option value="">นาย</option>
                    <option value="">นาง</option>
                    <option value="">นางสาว</option>
                  </select>
                </div>
                <div className="profile2-1">
                  <label className="label-profile">ชื่อ-นามสกุล:</label>
                  <input
                    type="text"
                    className="input-profile"
                    name="name"
                    value={values.name}
                    onChange={(e) =>
                      setValues({ ...values, name: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* เพศ-วันเกิด */}
              <div className="profile2plye">
                <div className="profile2-1">
                  <label className="label-profile">เพศ:</label>
                  <select
                    name="sex"
                    id=""
                    className="input-profile"
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
                <div className="profile2-1">
                  <label className="label-profile">วันเกิด:</label>
                  <input
                    type="date"
                    className="input-profile"
                    name="birthday"
                    value={values.birthday}
                    onChange={(e) =>
                      setValues({ ...values, birthday: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* เลขบัตร */}
              <div className="profile2-1-long">
                <label className="label-profile">เลขบัตรประชาชน:</label>
                <input
                  type="text"
                  className="input-profile-long"
                  name="card_id"
                  value={values.card_id}
                  onChange={(e) =>
                    setValues({ ...values, card_id: e.target.value })
                  }
                />
              </div>

              {/* เบอร์โทร - ไลน์ - เฟส */}
              <div className="profile2plye">
                {/*  เบอร์โทรศัพท์ */}
                <div className="profile2-1">
                  <label className="label-profile">เบอร์โทรศัพท์:</label>
                  <input
                    type="text"
                    className="input-profile"
                    name="phone"
                    value={values.phone}
                    onChange={(e) =>
                      setValues({ ...values, phone: e.target.value })
                    }
                  />
                </div>
                {/*  ไอดีไลน์ */}
                <div className="profile2-1">
                  <label className="label-profile">ไอดีไลน์:</label>
                  <input
                    type="text"
                    className="input-profile"
                    name="line_id"
                    value={values.line_id}
                    onChange={(e) =>
                      setValues({ ...values, line_id: e.target.value })
                    }
                  />
                </div>
                {/*  ชื่อเฟส */}
                <div className="profile2-1">
                  <label className="label-profile">ชื่อเฟส:</label>
                  <input
                    type="text"
                    className="input-profile"
                    name="facebook_id"
                    value={values.facebook_id}
                    onChange={(e) =>
                      setValues({ ...values, facebook_id: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* บัญชีผู้ใช้ */}
              <div className="profile2-1-long">
                <label className="label-profile">บัญชีผู้ใช้:</label>
                <input
                  type="text"
                  className="input-profile-long"
                  name="username"
                  value={values.username}
                  onChange={(e) =>
                    setValues({ ...values, username: e.target.value })
                  }
                />
              </div>

              {/* รหัสผ่าน */}
              <div className="profile2-1-long">
                <label className="label-profile">รหัสผ่าน:</label>
                <input
                  type="password"
                  className="input-profile-long"
                  name="password"
                  value={values.password}
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default ProfileEdit;
