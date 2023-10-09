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

function UnitEdit() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [unit, setUnit] = useState({});
  const [detail_unit, setDetail_unit] = useState([]);

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
                <div className="titleText">แก้ไขข้อมูลสูตร</div>
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
                    className="Uinput1"
                    name="unit_id"
                    disabled
                    style={{ background: "#e5e5e5", border: "none" }}
                  />
                </div>

                <div className="Ubox1-1-1">
                  <label className="form-label1-1">ชื่อสูตร :</label>
                  <input type="text" className="Uinput1" name="unit_name" />
                </div>

                <div className="Ubox1-1-1D">
                  <div className="doubleU">
                    <label className="form-label1-1">วันที่รับรายการ :</label>
                    <input
                      className="form-date"
                      type="date"
                      name="day_admit_list"
                    />
                  </div>
                  <div className="doubleU">
                    <label className="form-label1-1">
                      วันที่เลขจดแจ้งสิ้นสุด :
                    </label>
                    <input
                      className="form-date"
                      type="date"
                      name="date_notification_num"
                    />
                  </div>
                </div>

                <div className="Ubox1-1-1">
                  <label className="form-label1-1">เลขที่จดแจ้ง :</label>
                  <input
                    type="text"
                    className="Uinput1"
                    name="notification_num"
                  />
                </div>

                <div className="Ubox1-1-1">
                  <label className="form-label1-1">ลูกค้า :</label>
                  <select className="Uinput1s" name="id_customer">
                    <option value="">เลือกชื่อลูกค้า</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="Ubox2">
              <div className="Ubox2-1">
                <h2 style={{ marginBottom: "25px" }}>ตารางวัตถุดิบ</h2>

                <div className="Ubox2-1-1">
                  <div className="UboxS-1">
                    <label className="form-label1-1">วัตถุดิบ :</label>
                    <select className="Uinput1s" name="id_staple">
                      <option value="">เลือกวัตถุดิบ</option>
                    </select>
                  </div>

                  <div className="UboxS-2">
                    <div className="UboxS-2-1">
                      <label className="form-label1-1">ปริมาณสาร :</label>
                      <input type="number" className="Uinput1" name="AmountP" />
                    </div>

                    <div className="UboxS-2-1">
                      <button
                        type="submit"
                        style={{ background: "blue", color: "white" }}
                      >
                        <h3>
                          <BiPlus />
                        </h3>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="Ubox2-1-2">
                  <div className="UboxS-3">
                    <div className="UboxS-2-1s">
                      <label className="form-label1-1">รวมปริมาณสาร :</label>
                      <input className="Uinput1ss" disabled />
                      <label>%</label>
                    </div>
                  </div>

                  <div className="UboxS-4">
                    <div className="UboxS-2-1s">
                      <label className="form-label1-1">ปริมาณคงเหลือ :</label>
                      <input className="Uinput1ss" disabled />
                      <label>%</label>
                    </div>
                  </div>
                </div>

                <div className="Ubox2-1-1">
                  <div class="table-body-Unit">
                    <table class="styled-table-Unit">
                      <thead>
                        <tr>
                          <th>รหัส</th>
                          <th>ชื่อวัตถุดิบ</th>
                          <th>รวมปริมาณสาร %</th>

                          <th
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              marginTop: "10px",
                            }}
                          >
                            แก้ไข
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>2</td>
                          <td>3</td>
                          <td className="TDStable">
                            <button className="dalete-Unit">
                              <h3>
                                <AiFillDelete />
                              </h3>
                            </button>
                          </td>
                        </tr>
                      </tbody>
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

export default UnitEdit;
