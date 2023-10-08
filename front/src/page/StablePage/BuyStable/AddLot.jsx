import React, { useState, useEffect } from "react";
import axios from "axios";
import Topnav from "../../../component/Topnav";
import Menu from "../../../component/Menu";
import TabContent2 from "./TabContent2";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ImCancelCircle } from "react-icons/im";

import "../../../CSS/lot.css";

function AddLot() {
  const userLoginData = JSON.parse(sessionStorage.getItem("userlogin"));
  const navigate = useNavigate();
  const { id } = useParams();

  // ! ฟังก์ชั่นการแสดงไอดี
  const [id_lot, setId_lot] = useState(null);
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`http://localhost:5500/lot_ID/${id}`)
        .then((res) => {
          const id_lot = res.data.length > 0 ? res.data[0].id_lot : null;
          setId_lot(id_lot);

          // ดึงชื่อวัตถุดิบจากข้อมูลและเก็บไว้ใน state
          const data = res.data.length > 0 ? res.data[0].Name_staple : "";
          setData(data);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);
  // ! -----------------------------------

  // ! state สำหรับเก็บข้อมูลที่ป้อนเตรียมบันทึกลงฐานข้อมูล
  const [values, setValues] = useState({
    expiration_date: "",
    cost: "",
    amount: "",
    amount_re: "",
    COA_name: "",
    MSDS_name: "",
    id_staple: id,
    id_employee: `${userLoginData[0].id_employee}`,
  });
  // ! -----------------------------------

  // ! ฟังก์ชั่นบันทึกข้อมูล
  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:5500/LotNew", {
        ...values,
      })
      .then((res) => {
        console.log(res);
        navigate("/EM/StablePage");
      })
      .catch((err) => console.log(err));
  };
  // ! -----------------------------------

  // ! ฟังก์ชั่นเพื่อนำข้อมูลที่ป้อนมาเก็บไว้ใน values
  const handleInput = (event) => {
    const { name, value } = event.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
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
                <div className="titleText">เพิ่มล็อต {data}</div>
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

          {/* <h2>ไอดีของวัตถุดิบ: {selectedCategory.id_staple}</h2> */}
          {/* <h2>ชื่อของวัตถุดิบ: {selectedCategory.Name_staple}</h2> */}

          <div className="box-big-bg-new">
            <div className="box-BG-area-new">
              <form className="form-stable-new" onSubmit={handleSubmit}>
                <div className="row2-new">
                  <div className="form-row-new">
                    <label className="form-label-new">รหัสล็อต :</label>
                    <input
                      style={{ background: "#B4B4B3", color: "black" }}
                      type="text"
                      className="form-input-new"
                      value={id_lot + 1}
                      disabled
                    />
                  </div>
                </div>

                <div className="row2-new">
                  <div className="form-row-new">
                    <label className="form-label-new">วันที่หมดอายุ :</label>
                    <input
                      type="date"
                      className="form-input-new"
                      name="expiration_date"
                      onChange={handleInput}
                    />
                  </div>
                  <div className="form-row-new">
                    <label className="form-label-new">ราคา :</label>
                    <input
                      type="number"
                      className="form-input-new"
                      name="cost"
                      onChange={handleInput}
                    />
                  </div>
                </div>

                <div className="row2-new">
                  <div className="form-row-new">
                    <label className="form-label-new">ปริมาณ :</label>
                    <input
                      type="number"
                      className="form-input-new"
                      name="amount"
                      onChange={handleInput}
                    />
                  </div>
                  <div className="form-row-new">
                    <label className="form-label-new">ปริมาณคงเหลือ :</label>
                    <input
                      type="number"
                      className="form-input-new"
                      name="amount_re"
                      onChange={handleInput}
                    />
                  </div>
                </div>

                <div className="form-row-new">
                  <label className="form-label-new">
                    <p>*</p>COA :
                  </label>
                  <input
                    type="file"
                    className="form-input-new"
                    style={{
                      width: "1025px",
                      paddingTop: "10px",
                      height: "30px",
                    }}
                    name="COA_name"
                    onChange={handleInput}
                  />
                </div>

                <div className="form-row-new">
                  <label className="form-label-new">
                    <p>*</p>MSDS :
                  </label>
                  <input
                    type="file"
                    className="form-input-new"
                    style={{
                      width: "1025px",
                      paddingTop: "10px",
                      height: "30px",
                    }}
                    name="MSDS_name"
                    onChange={handleInput}
                  />
                </div>

                <div className="form-row-new">
                  <label className="form-label-new">ผู้บันทึก :</label>
                  <input
                    type="text"
                    className="form-input-new"
                    style={{
                      width: "1025px",
                      // paddingTop: "10px",
                      height: "40px",
                      background: "#B4B4B3",
                      color: "black",
                    }}
                    name="MSDS_name"
                    value={userLoginData[0].name}
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

export default AddLot;
