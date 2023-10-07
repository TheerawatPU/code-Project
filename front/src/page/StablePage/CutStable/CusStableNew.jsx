import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ImCancelCircle } from "react-icons/im";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import Menu from "../../../component/Menu";
import Topnav from "../../../component/Topnav";
import "../../../CSS/CutStable.css";

function CusStableNew() {
  // ! เรียกใช้ navigate และ userLoginData เพื่อเก็บผู้ใช้งานที่เข้าระบบตอนนั้น
  const navigate = useNavigate();
  const userLoginData = JSON.parse(sessionStorage.getItem("userlogin"));
  // ! -----------------------------------

  // ! ฟังก์ชั่นการแสดงไอดี
  // ไอดีการเพิ่มสต๊อก
  const [oldestIdUnit, setOldestIdUnit] = useState(null);
  // ใน useEffect ที่ดึงข้อมูล unitRead
  useEffect(() => {
    // ใช้ Axios ในการทำ HTTP GET request เพื่อดึงข้อมูลจาก API
    axios
      .get("http://localhost:5500/table_cutStock")
      .then((response) => {
        // อ่าน id_cutStock ตัวเก่าสุด
        const oldestIdUnit =
          response.data.length > 0 ? response.data[0].id_cutStock : null;
        // ตั้งค่า state สำหรับ id_cutStock ตัวเก่าสุด
        setOldestIdUnit(oldestIdUnit);
        // แสดงผลในคอนโซล
        // console.log("id_cutStock ตัวเก่าสุด:", oldestIdUnit);
      })
      .catch((error) => {
        // แสดงข้อผิดพลาดในการดึงข้อมูล
        console.error("เกิดข้อผิดพลาดในการไอดี id_cutStock :", error);
      });
  }, []); // useEffect นี้จะทำงานเมื่อคอมโพเนนต์ถูกโหลดครั้งแรกเท่านั้น
  // ! -----------------------------------

  // ! ฟังก์ชั่นการแสดงวัตถุดิบ
  const [DataStable, setDataStable] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5500/stapleRead`)
      .then((res) => setDataStable(res.data))
      .catch((err) => console.log(err));
  }, []);
  // ! -----------------------------------

  // ! ฟังก์ชั่นการแสดงล็อตของวัตถุดิบที่เลือก และ ฟังก์ชั่นที่ไอดีวัตถุดิบ และ ล็อตวัตถุดิบของวัตถุดิบที่เลือก เก็บไว้ใน values
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [dataLot, setDataLot] = useState([]);
  useEffect(() => {
    // ดึงวัตถุดิบของสูตรที่เลือก
    if (selectedRecipe) {
      axios
        .get(`http://localhost:5500/Lot_Stable1/${selectedRecipe}`)
        .then((res) => {
          // เพิ่มการกำหนดค่า amount_re ของล็อตที่เลือกไว้
          setDataLot(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      console.log("ไม่มีวัตถุดิบ");
    }
  }, [selectedRecipe]);

  const save_in_values = (e) => {
    const filterDistrict = dataLot.filter((item) => {
      return e.target.value == item.id_lot;
    });
    console.log("ปริมาณ", filterDistrict[0].amount_re);

    // เก็บ ไอดีวัตถุดิบ และ ปริมาณคงเหลือ ไว้ใน values
    setValues({
      ...values,
      [e.target.name]: filterDistrict[0].id_staple,
      amount_old: filterDistrict[0].amount_re,
      id_lot: filterDistrict[0].id_lot,
      id_staple: filterDistrict[0].id_staple,
    });
    // console.log("ไอดีล็อต", e.target.value);
  };
  // ! -----------------------------------

  // ! state สำหรับเก็บข้อมูลที่ป้อนเตรียมบันทึกลงฐานข้อมูล
  const [values, setValues] = useState({
    amount_old: "",
    id_staple: "",
    id_lot: "",
    date_cutStock: new Date().toLocaleDateString(),
    amount_total: "",
    details_cutStock: "",
    cause: "",
    id_employee: `${userLoginData[0].id_employee}`,
  });

  console.log("values", values);

  console.log("ค่าที่ลบ", values.amount_old - values.amount_total);

  // ! -----------------------------------

  // ! ฟังก์ชั่นบันทึกข้อมูล
  const handleSubmit = (event) => {
    event.preventDefault();
    // ส่งคำขอ POST เพื่อเพิ่มข้อมูล
    axios
      .post("http://localhost:5500/cutStock_New", {
        ...values,
      })
      .then((res) => {
        console.log("ข้อมูลถูกเพิ่มสำเร็จ");
        console.log(res);
        // navigate("/EM/StablePage");
      })
      .catch((err) => {
        console.error("เกิดข้อผิดพลาดในการเพิ่มข้อมูล:", err);
      });

    // ส่งคำขอ PUT เพื่ออัปเดตข้อมูล
    axios
      .put(`http://localhost:5500/cutStock_Up/${values.id_lot}`, {
        amount_re: values.amount_old - values.amount_total,
      })
      .then((res) => {
        console.log("ข้อมูลถูกอัปเดตสำเร็จ");
        console.log(res);
        navigate("/EM/StablePage");
      })
      .catch((err) => {
        console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล:", err);
      });
  };
  // ! -----------------------------------

  // ! ฟังก์ชั่นเพื่อนำข้อมูลที่ป้อนมาเก็บไว้ใน values
  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  // ! -----------------------------------

  return (
    <div>
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
                <div className="titleText">เพิ่มการปรับสต๊อก</div>
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
                  marginLeft: "20px",
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
                className="btn01"
                type="submit"
                style={{
                  background: "#22a699",
                  color: "white",
                  width: "auto",
                  height: "auto",
                  marginLeft: "20px",
                  marginBottom: "10px",
                }}
              >
                <div
                  className="btn-save01"
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                >
                  <FontAwesomeIcon icon={faFloppyDisk} />
                  <label style={{ paddingLeft: "5px" }}>บันทึก</label>
                </div>
              </button>
            </div>
          </div>

          <div className="box-big-bg-new">
            <div className="box-BG-area-new">
              <form className="form-stable-new">
                <div className="row2-new">
                  <div className="form-row-new">
                    <label className="form-label-new">รหัสการปรับ :</label>
                    <input
                      style={{ background: "#B4B4B3", color: "black" }}
                      type="text"
                      className="form-input-new"
                      value={oldestIdUnit + 1}
                      disabled
                    />
                  </div>
                  <div className="form-row-new">
                    <label className="form-label-new">วันที่ทำรายการ :</label>
                    <input
                      style={{ background: "#B4B4B3", color: "black" }}
                      name="date_cutStock"
                      type="text"
                      className="form-input-new"
                      value={values.date_cutStock}
                    />
                  </div>
                </div>
                <div className="row2-new">
                  <div className="form-row-new">
                    <label className="form-label-new">
                      <p>*</p>วัตถุดิบ :
                    </label>
                    <select
                      name="id_staple"
                      id="id_staple"
                      className="form-input-new"
                      style={{ width: "450px" }}
                      onChange={(e) => setSelectedRecipe(e.target.value)}
                    >
                      <option value="">เลือกวัตถุดิบ</option>
                      {DataStable.map((detail, index) => (
                        <option key={index} value={detail.id_staple}>
                          {detail.Name_staple}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-row-new">
                    <label className="form-label-new">
                      <p>*</p>ล็อตวัตถุดิบ :
                    </label>
                    <select
                      id="id_lot"
                      className="form-input-new"
                      style={{ width: "450px" }}
                      onChange={(e) => save_in_values(e)}
                      name="id_lot"
                    >
                      <option value="">เลือกล็อตวัตถุดิบ</option>
                      {dataLot.map((item, index) => (
                        <option key={index} value={item.id_lot}>
                          {item.id_lot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row2-new">
                  <div className="form-row-new">
                    <label className="form-label-new">ปริมาณคงเหลือ :</label>
                    <input
                      name="amount_old"
                      type="text"
                      className="form-input-new"
                      style={{ background: "#B4B4B3", color: "black" }}
                      value={values.amount_old}
                    />
                  </div>
                  <div className="form-row-new">
                    <label className="form-label-new">ปริมาณที่ปรับ :</label>
                    <input
                      name="amount_total"
                      type="text"
                      className="form-input-new"
                      onChange={handleInput}
                    />
                  </div>
                </div>

                <div className="form-row-new">
                  <label className="form-label-new">
                    <p>*</p>สาเหตุการปรับ :
                  </label>
                  <select
                    name="cause"
                    onChange={handleInput}
                    className="form-input-new"
                    style={{ width: "1025px" }}
                  >
                    <option value="">เลือกสาเหตุการปรับ</option>
                    <option value="วัตถุดิบสูญหาย">วัตถุดิบสูญหาย</option>
                    <option value="วัตถุดิบคลาดเคลื่อน">
                      วัตถุดิบคลาดเคลื่อน
                    </option>
                    <option value="วัตถุดิบเสื่อมสภาพ">
                      ล็อตวัตถุดิบเสื่อมสภาพ
                    </option>
                    <option value="ทดสอบสูตร">ทดสอบสูตร</option>
                    <option value="อื่นๆ">อื่นๆ</option>
                  </select>
                </div>
                <div className="form-row-new">
                  <label className="form-label-new">
                    รายละเอียดเพิ่มเติม :
                  </label>
                  <textarea
                    name="details_cutStock"
                    onChange={handleInput}
                    type="text"
                    className="form-input-new2"
                  />
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CusStableNew;
