import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Topnav from "../../../component/Topnav";
import Menu from "../../../component/Menu";
import "../../../CSS/Stable.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ImCancelCircle } from "react-icons/im";

function StableEdit() {
  // ! การนำทางข้าม component และ ดึง ID จาก URL
  const navigate = useNavigate();
  const { id } = useParams();
  // ! ........................

  // ! ดึงข้อมูลมาจาก api ของ iD เพื่อมาแสดงก่อน
  useEffect(() => {
    axios
      //อัพเดตข้อมูล
      .get("http://localhost:5500/stableIdUpdate/" + id)
      .then((res) => {
        console.log(res);
        setValues({
          ...values,
          id_staple: res.data[0].id_staple,
          Name_staple: res.data[0].Name_staple,
          Name_INCIname: res.data[0].Name_INCIname,
          howUsing: res.data[0].howUsing,
          howMixing: res.data[0].howMixing,
          saving: res.data[0].saving,
          melting: res.data[0].melting,
          reOrder: res.data[0].reOrder,
        });
      })
      .catch((err) => console.log(err));
  }, []);
  // ! ........................

  // ! เก็บข้อมูลลง state values เพื่อเตรียมอัพเดตข้อมูลผ่าน api
  const [values, setValues] = useState({
    Name_staple: "",
    Name_INCIname: "",
    howUsing: "",
    howMixing: "",
    saving: "",
    melting: "",
    reOrder: "",
  });
  // ! ........................

  // ! สร้างฟังก์ชั่น อัพเดตข้อมูลโดย ส่งไอดีที่จะอัพเดตจาก id  และข้อมูลที่จะอัพเดตจาก values
  const handleUpdate = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:5500/stableUpdate/" + id, values)
      .then((res) => {
        console.log(res);
        navigate("/EM/StablePage");
      })
      .catch((err) => console.log(err));
  };
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
        <div className="title-Text-stable">
          <div className="top-text-new-EM">
            <div className="text-new-EM-Unit">
              <div
                className="titleText"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(-1)}
              >
                <FaArrowLeftLong />
              </div>
              <div className="titleText">แก้ไขวัตถุดิบ</div>
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
              <div className="btn-save01" onClick={handleUpdate}>
                <FontAwesomeIcon icon={faFloppyDisk} />
                <label style={{ paddingLeft: "5px" }}>บันทึก</label>
              </div>
            </button>
          </div>
        </div>

        <div className="box-big-bg-new">
          <div className="box-BG-area-new">
            <form
              className="form-stable-new"
              onSubmit={handleUpdate}
              style={{ display: "flex", alignItems: "flex-start" }}
            >
              <div className="form-row-new">
                <label className="form-label-new">รหัสวัตถุดิบ :</label>
                <input
                  style={{ background: "#e5e5e5", border: "none" }}
                  type="text"
                  className="form-input-new"
                  name="id_staple"
                  value={values.id_staple}
                  disabled
                  onChange={(e) =>
                    setValues({ ...values, id_staple: e.target.value })
                  }
                />
              </div>

              <div className="row2form">
                <div className="form-row-new">
                  <label className="form-label-new">ชื่อวัตถุดิบ :</label>
                  <input
                    type="text"
                    className="form-input-new"
                    name="Name_staple"
                    value={values.Name_staple}
                    onChange={(e) =>
                      setValues({ ...values, Name_staple: e.target.value })
                    }
                  />
                </div>
                <div className="form-row-new">
                  <label className="form-label-new">INCI Name :</label>
                  <input
                    type="text"
                    className="form-input-new"
                    name="Name_INCIname"
                    value={values.Name_INCIname}
                    onChange={(e) =>
                      setValues({ ...values, Name_INCIname: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-row-new">
                <label className="form-label-new">การใช้ :</label>
                <textarea
                  type="text"
                  className="stable_input2"
                  name="howUsing"
                  value={values.howUsing}
                  onChange={(e) =>
                    setValues({ ...values, howUsing: e.target.value })
                  }
                />
              </div>
              <div className="form-row-new">
                <label className="form-label-new">การผสม :</label>
                <textarea
                  type="text"
                  className="stable_input2"
                  name="howMixing"
                  value={values.howMixing}
                  onChange={(e) =>
                    setValues({ ...values, howMixing: e.target.value })
                  }
                />
              </div>

              <div className="form-row-new">
                <label className="form-label-new">การรักษา :</label>
                <textarea
                  type="text"
                  className="stable_input2"
                  name="saving"
                  value={values.saving}
                  onChange={(e) =>
                    setValues({ ...values, saving: e.target.value })
                  }
                />
              </div>

              <div className="form-row-new">
                <label className="form-label-new">การละลาย :</label>
                <textarea
                  type="text"
                  className="stable_input2"
                  name="melting"
                  value={values.melting}
                  onChange={(e) =>
                    setValues({ ...values, melting: e.target.value })
                  }
                />
              </div>

              <div className="form-row-new">
                <label className="form-label-new">จุดสั่งซื้อ :</label>
                <input
                  type="number"
                  className="form-input-new"
                  name="reOrder"
                  value={values.reOrder}
                  onChange={(e) =>
                    setValues({ ...values, reOrder: e.target.value })
                  }
                />
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default StableEdit;
