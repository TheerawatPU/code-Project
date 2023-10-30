import React, { useEffect, useState } from "react";
import MenuAD from "./ComponentAD/MenuAD";
import TopNavAD from "./ComponentAD/TopNavAD";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFloppyDisk,
  faXmark,
  faBan,
  faArrowLeft,
  faCircleArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaPen, FaEye } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";

// font
import FontTH from "../PDF/THSarabun.ttf";
import FontTHBold from "../PDF/THSarabun Bold.ttf";

function EmployeeReadIDPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [Data, setdata] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5500/customerID/" + id)
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err));
  }, []);

  // -------------------------

  useEffect(() => {
    axios
      //อัพเดตข้อมูล
      .get("http://localhost:5500/employeeUpdateID/" + id)
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

  function formatDateOfBirth(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", options);
  } // แปลงวันเกิดเป็น "วัน/เดือน/ปี"

  const formattedDateOfBirth = formatDateOfBirth(values.birthday);

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
                ดูรายละเอียดพนักงาน
              </div>
            </div>
            {/* <div className="title2">
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
                <button className="submit" type="submit">
                  <FontAwesomeIcon icon={faFloppyDisk} />
                  <label htmlFor="" className="text_cencle">
                    บันทึก
                  </label>
                </button>
              </div>
            </div> */}
          </div>
          <div className="embox1">
            <div className="embox21">
              <div className="pic0">
                <img src={values.image} alt="" className="pic1" name="image" />
              </div>
            </div>
            <div className="embox22">
              <div className="embox22_1">
                <div className="textem1">
                  <h3>ตำแหน่ง:</h3>
                  <input
                    type="text"
                    className="inputtext1_read"
                    disabled
                    value={values.department}
                  />
                </div>
                <div className="textem1">
                  <h3>สถานะการทำงาน:</h3>
                  <input
                    type="text"
                    className="inputtext1_read"
                    disabled
                    value={values.status}
                  />
                </div>
                {/* <div className="textem1">
                  <h3>ตำแหน่ง:</h3>
                  <select className="inputtext1_3" name="department">
                    <option value="">เลือกตำแหน่ง</option>
                    <option value="ผู้บริหาร">ผู้บริหาร</option>
                    <option value="พนักงานฝ่ายผลิต">พนักงานฝ่ายผลิต</option>
                  </select>
                </div>
                <div className="textem1">
                  <h3>สถานะการทำงาน:</h3>
                  <select className="inputtext1_3" name="status">
                    <option value="">เลือกตำแหน่ง</option>
                    <option value="กำลังทำงาน">กำลังทำงาน</option>
                    <option value="พ้นสภาพการทำงาน">พ้นสภาพการทำงาน</option>
                  </select>
                </div> */}
              </div>

              <div className="embox22_1">
                {/* <div className="textem1">
                  <h3>คำนำหน้า:</h3>
                  <select name="title" className="inputtext1_3">
                    <option value="">เลือกคำนำหน้า</option>
                    <option value="นาย">นาย</option>
                    <option value="นาง">นาง</option>
                    <option value="นางสาว">นางสาว</option>
                  </select>
                </div> */}
                <div className="textem1">
                  <h3>คำนำหน้า:</h3>
                  <input
                    type="text"
                    className="inputtext1_read"
                    name="title"
                    value={values.title}
                    disabled
                  />
                </div>
                <div className="textem1">
                  <h3>ชื่อ-นามสกุล:</h3>
                  <input
                    type="text"
                    className="inputtext1_read"
                    name="name"
                    value={values.name}
                    disabled
                  />
                </div>
              </div>

              <div className="embox22_1">
                {/* <div className="textem1">
                  <h3>เพศ:</h3>
                  <select name="sex" className="inputtext1_3">
                    <option value="">เลือกเพศ</option>
                    <option value="ชาย">ชาย</option>
                    <option value="หญิง">หญิง</option>
                  </select>
                </div> */}
                <div className="textem1">
                  <h3>เพศ:</h3>
                  <input
                    type="text"
                    className="inputtext1_read"
                    name="sex"
                    value={values.sex}
                    disabled
                  />
                </div>
                <div className="textem1">
                  <h3>วันเกิด:</h3>
                  <input
                    type="text"
                    className="inputtext1_read"
                    name="birthday"
                    // value={values.birthday}
                    value={formattedDateOfBirth}
                    disabled
                  />
                </div>
              </div>

              <div className="embox22_1">
                <div className="textem1">
                  <h3>เลขบัตรประชาชน:</h3>
                  <input
                    type="number"
                    className="inputtext1_2_read"
                    name="card_id"
                    value={values.card_id}
                    disabled
                  />
                </div>
              </div>

              <div className="embox22_1-2">
                <div className="textem1">
                  <h3>เบอร์โทรศัพท์:</h3>
                  <input
                    type="number"
                    className="inputtext1_read"
                    name="phone"
                    value={values.phone}
                    disabled
                  />
                </div>
                <div className="textem1">
                  <h3>ไอดีไลน์:</h3>
                  <input
                    type="text"
                    className="inputtext1_read"
                    name="line_id"
                    value={values.line_id}
                    disabled
                  />
                </div>
                <div className="textem1">
                  <h3>ชื่อเฟสบุ๊ค:</h3>
                  <input
                    type="text"
                    className="inputtext1_read"
                    name="facebook_id"
                    value={values.facebook_id}
                    disabled
                  />
                </div>
              </div>

              <div className="embox22_1">
                <div className="textem1">
                  <h3>บัญชีผู้ใช้:</h3>
                  <input
                    type="text"
                    className="inputtext1_2_read"
                    name="username"
                    value={values.username}
                    disabled
                  />
                </div>
              </div>

              <div className="embox22_1">
                <div className="textem1">
                  <h3>รหัสผ่าน:</h3>
                  <input
                    type="password"
                    className="inputtext1_2_read"
                    name="password"
                    value={values.password}
                    disabled
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

export default EmployeeReadIDPage;
