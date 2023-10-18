import React, { useEffect, useState } from "react";

import "../../CSS/Report.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FaChartPie, FaChartBar, FaBorderAll } from "react-icons/fa";

import Report5Chart1 from "./Report5Chart1";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faArrowLeft,
  faPrint,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

function TabReport5() {
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

  const [data, setData] = useState([]);
  //   โหลดข้อมูลมาใส่ไว้ใน component นี้
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5500/producter")
  //     .then((res) => setData(res.data))
  //     .catch((err) => console.log(err));
  // }, []);

  //next page555555
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 11;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const number = [...Array(npage + 1).keys()].slice(1);

  function prePage() {
    if (currentPage < firstIndex) {
      setCurrentPage(currentPage - 1);
    } else if (currentPage === firstIndex) {
      setCurrentPage(changeCPage + 0);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  //
  const [startDate, setStartDate] = useState(""); // เก็บวันเริ่มต้น
  const [endDate, setEndDate] = useState(""); // เก็บวันสิ้นสุด

  useEffect(() => {
    let apiUrl = "http://localhost:5500/producter";

    if (startDate && endDate) {
      apiUrl += `?startDate=${startDate}&endDate=${endDate}`;
    }

    axios
      .get(apiUrl)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [startDate, endDate]);

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

              {/* <div className="report-print">
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
              </div> */}
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
                  <input
                    type="date"
                    className="input-date-Report"
                    onChange={(e) => setStartDate(e.target.value)}
                    value={startDate}
                  />
                  <h2>ถึง</h2>
                  <input
                    className="input-date-Report"
                    type="date"
                    onChange={(e) => setEndDate(e.target.value)}
                    value={endDate}
                  />
                </div>

                <div className="Rbox2-2-2-3">
                  <button
                    className="Report_search_btn"
                    onClick={() => {
                      setStartDate();
                      setEndDate();
                    }}
                  >
                    ค้นหา
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="back02">
          <div className="back2">
            <div className="back2-2">
              <div className="boxR2-2">
                <div className="titleR">
                  <div className="titleR-Table">ตารางสั่งผลิต</div>
                </div>

                <div className="mainR">
                  {/* {activeTab === 1 ? (
                    <Report5Chart1 />
                  ) : activeTab === 2 ? (
                    <Report5Chart1 />
                  ) : (
                    <Report5Chart1 />
                  )} */}

                  <table class="styled-table-Unit">
                    <thead>
                      <tr>
                        <th>รหัสการผลิต</th>
                        <th>ชื่อลูกค้า</th>
                        <th>วันที่ผลิต </th>
                        <th>วันที่ส่งมอบ</th>
                        <th>ยอดรวม</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records
                        .filter((data) => {
                          const expDate = new Date(data.day_move);
                          return (
                            (!startDate || expDate >= new Date(startDate)) &&
                            (!endDate || expDate <= new Date(endDate))
                          );
                        })
                        .map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{item.id_productorder}</td>
                              <td>{item.name_cus}</td>
                              <td>{item.day_productorder}</td>
                              <td>{item.day_move}</td>
                              <td>{item.total_cost}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>

                  <nav>
                    <ul
                      className="pagination-stable"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        background: "none",
                      }}
                    >
                      <li className="page-item-stable">
                        <a href="#" className="page-link" onClick={prePage}>
                          <FontAwesomeIcon icon={faAnglesLeft} />
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
                          <FontAwesomeIcon icon={faAnglesRight} />
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TabReport5;
