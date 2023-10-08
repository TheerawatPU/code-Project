import React, { useState } from "react";
import axios from "axios";
import Topnav from "../../../component/Topnav";
import Menu from "../../../component/Menu";
import "../../../CSS/Stable.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ImCancelCircle } from "react-icons/im";

function StableNew() {
  //! ดึงข้อมูลผู้เข้าระบบ และนำทางข้าม component
  const userLoginData = JSON.parse(sessionStorage.getItem("userlogin"));
  const navigate = useNavigate();
  //! .....................................

  //! นำข้อมูลจาก input เพื่อเตรียมบันทึกลงฐานข้อมูล
  const [values, setValues] = useState({
    Name_staple: "",
    Name_INCIname: "",
    howUsing: "",
    howMixing: "",
    saving: "",
    melting: "",
    reOrder: "",
    id_employee: `${userLoginData[0].id_employee}`,
  });
  //! .....................................

  //! รับข้อมูลจาก input ส่งไป values
  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };
  //! .....................................

  //! ฟังก์ชั่นนำข้อมูลใน values ส่งไปบันทึกผ่าน api
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5500/stapleNew", {
        ...values,
      })
      .then((res) => {
        console.log(res);
        navigate("/EM/StablePage");
      })
      .catch((err) => console.log(err));
  };
  //! .....................................

  return (
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
              <div className="titleText">เพิ่มวัตถุดิบ</div>
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
            <form className="form-stable-new" onSubmit={handleSubmit}>
              
              <div className="row2form">
                <div className="form-row-new">
                  <label className="form-label-new">
                    <p>*</p>ชื่อวัตถุดิบ :
                  </label>
                  <input
                    name="Name_staple"
                    type="text"
                    className="form-input-new"
                    onChange={handleInput}
                  />
                </div>
                <div className="form-row-new">
                  <label className="form-label-new">
                    <p>*</p>INCI Name :
                  </label>
                  <input
                    name="Name_INCIname"
                    type="text"
                    className="form-input-new"
                    onChange={handleInput}
                  />
                </div>
              </div>

              <div className="form-row-new">
                <label className="form-label-new">
                  <p>*</p>การใช้ :
                </label>
                <textarea
                  name="howUsing"
                  type="text"
                  className="stable_input2"
                  onChange={handleInput}
                />
              </div>
              <div className="form-row-new">
                <label className="form-label-new">
                  <p>*</p>การผสม :
                </label>
                <textarea
                  name="howMixing"
                  type="text"
                  className="stable_input2"
                  onChange={handleInput}
                />
              </div>

              <div className="form-row-new">
                <label className="form-label-new">
                  <p>*</p>การรักษา :
                </label>
                <textarea
                  name="saving"
                  type="text"
                  className="stable_input2"
                  onChange={handleInput}
                />
              </div>

              <div className="form-row-new">
                <label className="form-label-new">
                  <p>*</p>การละลาย :
                </label>
                <textarea
                  name="melting"
                  type="text"
                  className="stable_input2"
                  onChange={handleInput}
                />
              </div>

              <div className="form-row-new">
                <label className="form-label-new">
                  <p>*</p>จุดสั่งซื้อ :
                </label>
                <input
                  name="reOrder"
                  type="text"
                  className="stable_input1"
                  onChange={handleInput}
                />
              </div>
            </form>
          </div>

          {/* <div className="btn-submit-new">
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
          </div> */}
        </div>
      </main>
    </div>
  );
}

export default StableNew;
