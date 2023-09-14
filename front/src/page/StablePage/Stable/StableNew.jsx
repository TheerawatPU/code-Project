import React, { useEffect, useState } from "react";
import axios from "axios";
import Topnav from "../../../component/Topnav";
import Menu from "../../../component/Menu";
import "../../../CSS/Stable.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";

function StableNew() {
  const userLoginData = JSON.parse(sessionStorage.getItem("userlogin"));

  const navigate = useNavigate();
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

  const handleInput = (event) => {
    const { name, value } = event.target;

    setValues((prev) => ({ ...prev, [name]: value }));
  };

  console.log(values);

  return (
    <div className="all-page">
      <header className="header">
        <Topnav />
      </header>
      <section className="aside">
        <Menu />
      </section>
      <main className="main">
        <div className="top-text-new">
          <div className="text-new">เพิ่มข้อมูลวัตถุดิบ</div>
        </div>

        <div className="text-new-lg">
          กรุณากรอกข้อมูลให้ครบทุกช่อง ถ้าไม่มีให้ใส่เครื่องหมาย - ไว้
        </div>

        <div className="box-big-bg-new">
          <div className="box-BG-area-new">
            <form className="form-stable-new" onSubmit={handleSubmit}>
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
              <div className="form-row-new">
                <label className="form-label-new">
                  <p>*</p>การใช้ :
                </label>
                <textarea
                  name="howUsing"
                  type="text"
                  className="form-input-new2"
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
                  className="form-input-new2"
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
                  className="form-input-new2"
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
                  className="form-input-new2"
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
                  className="form-input-new"
                  onChange={handleInput}
                />
              </div>
            </form>
          </div>

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

export default StableNew;
