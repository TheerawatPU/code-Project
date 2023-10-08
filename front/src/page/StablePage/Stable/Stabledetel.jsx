import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import Topnav from "../../../component/Topnav";
import Menu from "../../../component/Menu";
import "../../../CSS/Stable.css";

import { FaArrowLeftLong } from "react-icons/fa6";

function Stabledetel() {
  // ! การนำทางข้าม component และ ดึง ID จาก URL
  const navigate = useNavigate();
  const { id } = useParams();
  // ! ........................

  // ! นำข้อมูลใน api มาแสดง
  const [Data, setdata] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5500/stableID/" + id)
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err));
  }, []);
  // ! ........................

  return (
    <div className="all-page-new">
      <header className="header-new">
        <Topnav />
      </header>
      <section className="aside-new">
        <Menu />
      </section>
      <main className="main-new">
        <div className="title-Text">
          <div className="top-text-stable">
            <div className="text-new-EM-Unit">
              <div
                className="titleText"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(-1)}
              >
                <FaArrowLeftLong />
              </div>
              <div className="titleText">รายละเอีดยวัตถุดิบ</div>
            </div>
          </div>
        </div>

        {Data.map((d, index) => (
          <div className="box-big-bg-new" key={index}>
            <div className="box-BG-area-new">
              <form className="form-stable-new">
                <div className="form-row-new">
                  <label className="form-label-new">รหัสวัตถุดิบ :</label>
                  <input
                    type="text"
                    className="stable_input1-read"
                    name="id_staple"
                    value={d.id_staple}
                    disabled
                  />
                </div>
                <div className="form-row-new">
                  <label className="form-label-new">ชื่อวัตถุดิบ :</label>
                  <input
                    type="text"
                    className="form-input-new-read"
                    name="Name_staple"
                    value={d.Name_staple}
                    disabled
                  />
                </div>
                <div className="form-row-new">
                  <label className="form-label-new">INCI Name :</label>
                  <input
                    type="text"
                    className="form-input-new-read"
                    name="Name_INCIname"
                    value={d.Name_INCIname}
                    disabled
                  />
                </div>
                <div className="form-row-new">
                  <label className="form-label-new">การใช้ :</label>
                  <input
                    type="text"
                    className="stable_input2-read"
                    name="howUsing"
                    value={d.howUsing}
                    disabled
                  />
                </div>
                <div className="form-row-new">
                  <label className="form-label-new">การผสม :</label>
                  <input
                    type="text"
                    className="stable_input2-read"
                    name="howMixing"
                    value={d.howMixing}
                    disabled
                  />
                </div>

                <div className="form-row-new">
                  <label className="form-label-new">การรักษา :</label>
                  <input
                    type="text"
                    className="stable_input2-read"
                    name="saving"
                    value={d.saving}
                    disabled
                  />
                </div>

                <div className="form-row-new">
                  <label className="form-label-new">การละลาย :</label>
                  <input
                    type="text"
                    className="stable_input2-read"
                    name="melting"
                    value={d.melting}
                    disabled
                  />
                </div>

                <div className="form-row-new" style={{ marginBottom: "20px" }}>
                  <label className="form-label-new">จุดสั่งซื้อ :</label>
                  <input
                    type="text"
                    className="stable_input1-read"
                    name="reOrder"
                    value={d.reOrder}
                    disabled
                  />
                </div>
              </form>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default Stabledetel;
