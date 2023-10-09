import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ImCancelCircle } from "react-icons/im";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import Menu from "../../../component/Menu";
import Topnav from "../../../component/Topnav";
import "../../../CSS/CutStable.css";

function CusStableReadID() {
  const navigate = useNavigate();
  const { id } = useParams();

  // ! ฟังก์ชั่นการแสดงวัตถุดิบ
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5500/cutStock_ID_read/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
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
          <div className="title-Text-cutstable">
            <div className="top-text-cutstable">
              <div className="text-new-EM-Unit">
                <div
                  className="titleText"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(-1)}
                >
                  <FaArrowLeftLong />
                </div>
                <div className="titleText">รายละเอียดการปรับสต๊อก</div>
              </div>
            </div>

            {/* <div className="all-btn-0">
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
                <div className="btn-save01">
                  <FontAwesomeIcon icon={faFloppyDisk} />
                  <label style={{ paddingLeft: "5px" }}>บันทึก</label>
                </div>
              </button>
            </div> */}
          </div>
          {data.map((d, index) => (
            <div className="box-big-bg-new">
              <div className="box-BG-area-new">
                <form className="form-stable-new" key={index}>
                  <div className="row2-new">
                    <div className="form-row-new">
                      <label className="form-label-new">รหัสการปรับ :</label>
                      <input
                        type="text"
                        className="input-read_cut"
                        value={d.id_cutStock}
                        disabled
                      />
                    </div>
                    <div className="form-row-new">
                      <label className="form-label-new">วันที่ทำรายการ :</label>
                      <input
                        name="date_cutStock"
                        type="text"
                        className="input-read_cut"
                        value={d.date_cutStock}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="row2-new">
                    <div className="form-row-new">
                      <label className="form-label-new">วัตถุดิบ :</label>
                      <input
                        name="id_staple"
                        type="text"
                        className="input-read_cut"
                        value={d.Name_staple}
                        disabled
                      />
                    </div>
                    <div className="form-row-new">
                      <label className="form-label-new">ล็อตวัตถุดิบ :</label>
                      <input
                        name="id_lot"
                        type="text"
                        className="input-read_cut"
                        value={d.id_lot}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="row2-new">
                    <div className="form-row-new">
                      <label className="form-label-new">ปริมาณคงเหลือ :</label>
                      <input
                        name="amount_old"
                        type="text"
                        className="input-read_cut"
                        value={d.amount_old}
                        disabled
                      />
                    </div>
                    <div className="form-row-new">
                      <label className="form-label-new">ปริมาณที่ปรับ :</label>
                      <input
                        name="amount_total"
                        type="text"
                        className="input-read_cut"
                        value={d.amount_total}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="form-row-new">
                    <label className="form-label-new">สาเหตุการปรับ :</label>

                    <input
                      name="cause"
                      className="input-read_cut"
                      style={{ width: "1010px" }}
                      value={d.cause}
                      disabled
                    />
                  </div>
                  <div className="form-row-new">
                    <label className="form-label-new">
                      รายละเอียดเพิ่มเติม :
                    </label>
                    <textarea
                      name="details_cutStock"
                      type="text"
                      className="form-input-new2"
                      value={d.details_cutStock}
                      disabled
                    />
                  </div>
                </form>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}

export default CusStableReadID;
