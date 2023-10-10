import React, { useEffect, useState } from "react";

import "../../CSS/Report.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FaChartPie, FaChartBar, FaBorderAll } from "react-icons/fa";

import Report1Chart1 from "./Report1Chart1";
import Report1Chart2 from "./Report1Chart2";
import Report1Chart3 from "./Report1Chart3";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faArrowLeft,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";

function TabReport1() {
  const [idStapleCount, setIdStapleCount] = useState(0);

  //   โหลดข้อมูลมาใส่ไว้ใน component นี้
  useEffect(() => {
    // ทำการร้องขอ API เพื่อนับจำนวน id_staple
    axios
      .get("http://localhost:5500/Report_Stable_Count") // เปลี่ยนเส้นทาง URL ตามที่คุณใช้งาน
      .then((response) => {
        // ดึงข้อมูลจำนวน id_staple จากการร้องขอ API
        const idStapleCountFromAPI = response.data[0].id_staple; // แนะนำให้ตรวจสอบโครงสร้างข้อมูลของ API

        // ตั้งค่าค่าจำนวน id_staple ใน state
        setIdStapleCount(idStapleCountFromAPI);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการร้องขอ API:", error);
      });
  }, []);

  // ปุ่มกดเปลี่ยนกราฟ

  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="back-0">
        <div className="back01">
          <div className="back1">
            <div className="Rbox1">
              <div className="Report_search">
                <input
                  type="text"
                  className="Report_search_input"
                  placeholder="ค้นหา..."
                />
                <button type="submit" className="Report_search_btn">
                  ค้นหา
                </button>
              </div>

              <div className="report-print">
                <button
                  className="Report_search_btn"
                  type="submit"
                  style={{
                    background: "#000",
                    color: "white",
                    width: "auto",
                    height: "auto",
                    marginLeft: "50px",
                  }}
                >
                  <div className="btn-save01">
                    <FontAwesomeIcon icon={faPrint} />

                    <label style={{ paddingLeft: "5px" }}>พิมพ์</label>
                  </div>
                </button>
              </div>
            </div>

            <div className="Rbox2">
              <div className="Rbox2-2">
                <div className="Rbox2-2-2-1">
                  <select name="" id="" className="input-select-Report">
                    <option value="">วัตถุดิบทั้งหมด</option>
                    <option value="">2</option>
                    <option value="">3</option>
                  </select>
                </div>

                <div className="Rbox2-2-2-2">
                  <input type="date" className="input-date-Report" />
                  <h2>ถึง</h2>
                  <input type="date" className="input-date-Report" />
                </div>

                <div className="Rbox2-2-2-3">
                  <button className="Report_search_btn">ค้นหา</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="back02">
          <div className="back2">
            <div className="back2-2">
              <div className="boxR2-1">
                <div className="boxRSM2-1-1">
                  <div className="title-boxRSM">
                    <div className="title-boxRSM1">วัตถุดิบทั้งหมด</div>
                    <div className="title-list-boxRSM">
                      <div className="title-boxRSM2">{idStapleCount}</div>
                      {/* {data_Count.map((item2, index) => {
                        <div key={index} className="title-boxRSM2">{item2.id_staple}</div>;
                      })} */}
                    </div>
                  </div>
                </div>
                <div className="boxRSM2-1-1">
                  <div className="title-boxRSM">
                    <div className="title-boxRSM1">วัตถุดิบใหม่</div>
                    <div className="title-boxRSM2">2</div>
                  </div>
                </div>
                <div className="boxRSM2-1-1">
                  <div className="title-boxRSM">
                    <div className="title-boxRSM1">
                      วัตถุดิบต่ำกว่าจุดสั่งซื้อ
                    </div>
                    <div className="title-boxRSM2">10</div>
                  </div>
                </div>
                <div className="boxRSM2-1-1">
                  <div className="title-boxRSM">
                    <div className="title-boxRSM1">วัตถุดิบหมดอายุ</div>
                    <div className="title-boxRSM2">10</div>
                  </div>
                </div>
              </div>
              <div className="boxR2-2">
                <div className="titleR">
                  <div className="titleR-Table">ตารางวัตถุดิบ</div>
                  <div className="btn-R-chart">
                    <button
                      className="btn-R-0"
                      onClick={() => handleTabChange(1)}
                    >
                      <h4>
                        <FaBorderAll />
                      </h4>
                    </button>
                    <button
                      className="btn-R-0"
                      onClick={() => handleTabChange(2)}
                    >
                      <h4>
                        <FaChartBar />
                      </h4>
                    </button>
                    <button
                      className="btn-R-0"
                      onClick={() => handleTabChange(3)}
                    >
                      <h4>
                        <FaChartPie />
                      </h4>
                    </button>
                  </div>
                </div>

                <div className="mainR">
                  {activeTab === 1 ? (
                    <Report1Chart1 />
                  ) : activeTab === 2 ? (
                    <Report1Chart2 />
                  ) : (
                    <Report1Chart3 />
                  )}

                  {/* <nav>
                    <ul
                      className="pagination-stable"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        background: "#f5f5f5",
                      }}
                    >
                      <li className="page-item-stable">
                        <a href="#" className="page-link" onClick={prePage}>
                          ก่อน
                        </a>
                      </li>
                      {number.map((n, i) => (
                        <li
                          className={`page-item-stable ${
                            currentPage === n ? "active" : ""
                          }`}
                          key={i}
                        >
                          <a
                            href="#"
                            className="page-link"
                            onClick={() => changeCPage(n)}
                          >
                            {n}
                          </a>
                        </li>
                      ))}
                      <li className="page-item-stable">
                        <a href="#" className="page-link" onClick={nextPage}>
                          ต่อไป
                        </a>
                      </li>
                    </ul>
                  </nav> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TabReport1;
