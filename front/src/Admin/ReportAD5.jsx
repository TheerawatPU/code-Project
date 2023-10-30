import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FaChartPie, FaChartBar, FaBorderAll } from "react-icons/fa";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faArrowLeft,
  faPrint,
  faAnglesLeft,
  faAnglesRight,
  faArrowRightArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

import "../CSS/Report.css";

function ReportAD5() {
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
  useEffect(() => {
    axios
      .get("http://localhost:5500/producter")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

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

  return (
    <>
      <div className="back-0">
        <div className="back01new">
          <div className="R00">
            <input type="text" className="inReport00" placeholder="ค้นหา..." />
          </div>

          <div className="R01">
            <div className="R1">
              <select name="" id="" className="selectReport00">
                <option value="">ชื่อลูกค้า</option>
                <option value="">1</option>
                <option value="">1</option>
              </select>
            </div>

            <div className="R2">
              <button className="B_DMY">สัปดาห์</button>
              <button className="B_DMY">เดือน</button>
              <button className="B_DMY">ปี</button>
            </div>

            <div className="R3">
              <input type="date" name="" id="" className="dateSeach" />
              <label htmlFor="" className="labeldate">
                ถึง
              </label>
              <input type="date" name="" id="" className="dateSeach" />
            </div>

            <div className="R4">
              <button className="B_report00">ค้นหา</button>
              <button className="B_report01">ล้าง</button>
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
                  <table class="styled-table-Unit">
                    <thead>
                      <tr>
                        <th onClick={() => handleSort("id_cutStock")}>
                          รหัสการผลิต
                          <FontAwesomeIcon
                            icon={faArrowRightArrowLeft}
                            rotation={270}
                            style={{ marginLeft: "15px" }}
                          />
                        </th>
                        <th onClick={() => handleSort("id_cutStock")}>
                          ชื่อลูกค้า
                          <FontAwesomeIcon
                            icon={faArrowRightArrowLeft}
                            rotation={270}
                            style={{ marginLeft: "15px" }}
                          />
                        </th>
                        <th onClick={() => handleSort("id_cutStock")}>
                          วันที่ผลิต
                          <FontAwesomeIcon
                            icon={faArrowRightArrowLeft}
                            rotation={270}
                            style={{ marginLeft: "15px" }}
                          />
                        </th>
                        <th onClick={() => handleSort("id_cutStock")}>
                          วันที่ส่งมอบ
                          <FontAwesomeIcon
                            icon={faArrowRightArrowLeft}
                            rotation={270}
                            style={{ marginLeft: "15px" }}
                          />
                        </th>
                        <th onClick={() => handleSort("id_cutStock")}>
                          ยอดรวม
                          <FontAwesomeIcon
                            icon={faArrowRightArrowLeft}
                            rotation={270}
                            style={{ marginLeft: "15px" }}
                          />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {records.map((item, index) => {
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

export default ReportAD5;
