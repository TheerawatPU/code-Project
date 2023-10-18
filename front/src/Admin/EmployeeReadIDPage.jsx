import React, { useEffect, useState } from "react";
import MenuAD from "./ComponentAD/MenuAD";
import TopNavAD from "./ComponentAD/TopNavAD";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaPen, FaEye } from "react-icons/fa";

// font
import FontTH from "../PDF/THSarabun.ttf";
import FontTHBold from "../PDF/THSarabun Bold.ttf";

// PDF
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Font,
  Image,
} from "@react-pdf/renderer";

// PDF
import logo from "../PDF/logo.jpg";

// PDF
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";

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

  // สไตล์ใน PDF
  const styles = StyleSheet.create({
    page: {
      fontFamily: "FontTH",
      padding: 10,
    },
    section: {
      margin: 15,
      padding: 10,
      flexGrow: 1,
      fontFamily: "FontTH",
      fontSize: 15,
      // border: 1,
    },
    section5: {
      marginTop: 15,
      paddingTop: 10,
      flexGrow: 1,
      fontFamily: "FontTH",
      fontSize: 15,
      // border: 1,
    },

    texts: {
      fontSize: 18,
      fontFamily: "FontTHBold",
    },
    title: {
      marginTop: 0,
      fontSize: 25,
      fontFamily: "FontTHBold",
      textAlign: "center",
    },
    body: {
      flexDirection: "row",
      fontFamily: "FontTH",
      paddingLeft: 15,
      marginLeft: 10,
      // border: 1,
      fontSize: 15,
    },
    body3: {
      fontFamily: "FontTH",
      margin: 15,
      padding: 10,
      fontSize: 15,
      // border: 1,
    },
    tableHeader: {
      textAlign: "center",
      backgroundColor: "#22a699",
      fontFamily: "FontTHBold",
      color: "#ffffff",
      paddingTop: 3,
      paddingBottom: 3,
    },
    tableHeader2: {
      paddingTop: 3,
      paddingBottom: 3,
      paddingLeft: 10,
    },
    body2: {
      textAlign: "right",
    },
    imgLogo: {
      width: 100,
      height: 100,
    },
    Textpad: {
      paddingBottom: 10,
    },
  });

  // นำฟ้อนมาใช้ PDF
  Font.register({ family: "FontTH", src: FontTH });
  Font.register({ family: "FontTHBold", src: FontTHBold });

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
            แก้ไขข้อมูลพนักงาน
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
                {/* <input
                  type="file"
                  name="image"
                  id="image"
                  
                /> */}
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
                  {/* <select className="form-input-select-EM" name="department">
                    <option>{values.department}</option>
                  </select> */}
                  <input
                    type="text"
                    className="form-input-select-EM"
                    name="department"
                    value={values.department}
                    disabled
                  />
                </div>

                <div className="select-row-C">
                  <label className="form-label-new-EM">สถานะการทำงาน :</label>
                  <input
                    type="text"
                    className="form-input-select-EM"
                    name="status"
                    value={values.status}
                    disabled
                  />
                  {/* <select className="form-input-select-EM" name="status">
                    <option>{values.status}</option>
                  </select> */}
                </div>
              </div>

              {/*คำนำหน้า ชื่อ-นามสกุล */}
              <div className="form-row-new-select-EM">
                <div className="select-row-C">
                  <label className="form-label-new-EM">คำนำหน้า :</label>
                  {/* <select
                    className="form-input-select-title-EM"
                    name="title"

                    // value={values.title}
                  >
                    <option>{values.title}</option>
                  </select> */}
                  <input
                    type="text"
                    className="form-input-select-title-EM"
                    name="title"
                    value={values.title}
                    disabled
                  />
                </div>

                <div className="select-row-C">
                  <label className="form-label-new-EM">ชื่อ-นามสกุล :</label>
                  <input
                    name="name"
                    type="text"
                    className="form-input-new-title-EM"
                    value={values.name}
                    disabled
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
                        disabled
                        name="sex"
                        // value="ชาย"
                        value={values.sex}
                        type="radio"
                        className="form-input-new-title-Radio-EM"
                      />
                      <span>ชาย</span>
                      <input
                        disabled
                        value={values.sex}
                        name="sex"
                        // value="หญิง"
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
                    type="text"
                    className="form-input-new-title-EM"
                    disabled
                    value={values.birthday}
                  />
                </div>
              </div>

              {/* เบอร์โทร IDLine Facebook */}

              <div className="form-row-new-select-EM">
                <div className="select-row-C">
                  <label className="form-label-new-EM">เบอร์โทรศัพท์ :</label>
                  <input
                    disabled
                    name="phone"
                    type="text"
                    className="form-input-new-3-EM"
                    value={values.phone}
                  />
                </div>
                <div className="select-row-C">
                  <label className="form-label-new-EM">ไอดีไลน์ :</label>
                  <input
                    disabled
                    name="line_id"
                    type="text"
                    className="form-input-new-3-EM"
                    value={values.line_id}
                  />
                </div>
                <div className="select-row-C">
                  <label className="form-label-new-EM">เฟสบุ๊ค :</label>
                  <input
                    disabled
                    name="facebook_id"
                    type="text"
                    className="form-input-new-3-EM"
                    value={values.facebook_id}
                  />
                </div>
              </div>

              <div className="form-row-new">
                <label className="form-label-new">รหัสบัตรประชาชน :</label>
                <input
                  disabled
                  name="card_id"
                  type="text"
                  className="form-input-new-EM"
                  value={values.card_id}
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
                  disabled
                  name="username"
                  type="text"
                  className="form-input-new-EM"
                  value={values.username}
                />
              </div>
              <div className="form-row-new">
                <label className="form-label-new">รหัสผ่าน :</label>
                <input
                  disabled
                  name="password"
                  type="password"
                  className="form-input-new-EM"
                  value={values.password}
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
              <button type="submit" className="submit-new">
                <FaPen />

                <span>แก้ไข</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EmployeeReadIDPage;
