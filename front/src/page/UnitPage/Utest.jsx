import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import Menu from "../../component/Menu";
import Topnav from "../../component/Topnav";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ImCancelCircle } from "react-icons/im";
import { BiPlus } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

import "../../CSS/Unit.css";

function Utest() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [unit, setUnit] = useState({});

  const [detail_unit, setDetail_unit] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5500/UreadID/${id}`)
      .then((response) => {
        setUnit(response.data.unitResults);
        setDetail_unit(response.data.detail_unit);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Calculate the sum of the "รวมปริมาณสาร %" (Total Percentage) column
  const totalPercentage = detail_unit.reduce((sum, detail) => {
    return sum + parseFloat(detail.AmountP);
  }, 0);

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
                <div className="titleText">รายละเอียดสูตร</div>
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
                  <label style={{ paddingLeft: "5px" }}>บันทึก</label>
                </div>
              </button>
            </div>

            {/* <div className="text-new-lg-Unit">
            กรุณากรอกข้อมูลใน * ให้ครบทุกช่อง ถ้าไม่มีให้ใส่เครื่องหมาย - ไว้
          </div> */}
          </div>

          <div className="Ubox0">
            <div className="Ubox1">
              <div className="Ubox1-1">
                <h2 style={{ marginBottom: "25px" }}>ข้อมูลการผลิต</h2>

                <div className="Ubox1-1-1">
                  <label className="form-label1-1">รหัสสูตร :</label>
                  <input
                    type="text"
                    className="Uinput1Read"
                    name="unit_id"
                    value={id}
                    disabled
                  />
                </div>

                <div className="Ubox1-1-1">
                  <label className="form-label1-1">ชื่อสูตร :</label>
                  <input
                    type="text"
                    className="Uinput1Read"
                    name="unit_name"
                    value={unit.unit_name}
                    disabled
                  />
                </div>

                <div className="Ubox1-1-1D">
                  <div className="doubleU">
                    <label className="form-label1-1">วันที่รับรายการ :</label>
                    <input
                      className="form-dateRead"
                      type="text"
                      name="day_admit_list"
                      value={unit.day_admit_list}
                      disabled
                    />
                  </div>
                  <div className="doubleU">
                    <label className="form-label1-1">
                      วันที่เลขจดแจ้งสิ้นสุด :
                    </label>
                    <input
                      className="form-dateRead"
                      name="date_notification_num"
                      type="text"
                      value={unit.date_notification_num}
                      disabled
                    />
                  </div>
                </div>

                <div className="Ubox1-1-1">
                  <label className="form-label1-1">เลขที่จดแจ้ง :</label>
                  <input
                    type="text"
                    className="Uinput1Read"
                    name="notification_num"
                    value={unit.notification_num}
                    disabled
                  />
                </div>

                <div className="Ubox1-1-1">
                  <label className="form-label1-1">ลูกค้า :</label>
                  <input
                    type="text"
                    className="Uinput1Read"
                    name="notification_num"
                    value={unit.name_cus}
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="Ubox2">
              <div className="Ubox2-1">
                <h2 style={{ marginBottom: "25px" }}>ตารางวัตถุดิบ</h2>

                <div className="Ubox2-1-1">
                  <div class="table-body-Unit">
                    <table class="styled-table-Unit">
                      <thead>
                        <tr>
                          <th>รหัส</th>
                          <th>ชื่อวัตถุดิบ</th>
                          <th>INCIname</th>
                          <th>รวมปริมาณสาร {totalPercentage} %</th>
                        </tr>
                      </thead>
                      {detail_unit.map((detail, index) => (
                        <tbody key={index}>
                          <tr>
                            <td>{index + 1}</td>
                            <td>{detail.Name_staple}</td>
                            <td>{detail.Name_INCIname}</td>
                            <td>{detail.AmountP}</td>
                          </tr>
                        </tbody>
                      ))}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Utest;
