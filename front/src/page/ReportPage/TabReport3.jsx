import React, { useEffect, useState } from "react";

import "../../CSS/Report.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FaChartPie, FaChartBar, FaBorderAll } from "react-icons/fa";

import Report3Chart1 from "./Report3Chart1";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faArrowLeft,
  faPrint,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

function TabReport3() {
  const [idStapleCount, setIdStapleCount] = useState(0);

  //   โหลดข้อมูลมาใส่ไว้ใน component นี้
  useEffect(() => {
    // ทำการร้องขอ API เพื่อนับจำนวน id_staple
    axios
      .get("http://localhost:5500/countcut_stock") // เปลี่ยนเส้นทาง URL ตามที่คุณใช้งาน
      .then((response) => {
        // ดึงข้อมูลจำนวน id_staple จากการร้องขอ API
        const idStapleCountFromAPI = response.data[0].id_cutStock; // แนะนำให้ตรวจสอบโครงสร้างข้อมูลของ API

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
      .get("http://localhost:5500/table_cutStock")
      .then((res) => {
        setData(res.data);
        setSearchApiData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //next page555555
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 9;
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
  //! ฟังก์ชั่นเลขหน้าจำนวนแถวในตาราง
  const [filterVal, setFilterVal] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);

  const handleFilter = (e) => {
    if (e.target.value == "") {
      setData(searchApiData);
    } else {
      const filterResult = searchApiData.filter(
        (item) =>
          item.date_cutStock
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          item.Name_staple.toLowerCase().includes(
            e.target.value.toLowerCase()
          ) ||
          item.cause.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.details_cutStock
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.id_lot.toString().includes(e.target.value.toString()) ||
          item.amount_old.toString().includes(e.target.value.toString()) ||
          item.amount_total.toString().includes(e.target.value.toString()) ||
          item.id_cutStock.toString().includes(e.target.value)
      );

      if (filterResult.length > 0) {
        setData(filterResult);
      } else {
        setData([
          {
            date_cutStock: "ไม่มีข้อมูล",
            Name_staple: "ไม่มีข้อมูล",
            cause: "ไม่มีข้อมูล",
            details_cutStock: "ไม่มีข้อมูล",
            name: "ไม่มีข้อมูล",
            id_lot: "ไม่มีข้อมูล",
            amount_old: "ไม่มีข้อมูล",
            id_cutStock: "ไม่มีข้อมูล",
          },
        ]);
      }
    }
    setFilterVal(e.target.value);
  };
  //! ..........................................

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
                  value={filterVal}
                  onInput={(e) => handleFilter(e)}
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
                    <div className="title-boxRSM1">จำนวนรายการทั้งหมด</div>
                    <div className="title-list-boxRSM">
                      <div className="title-boxRSM2">{idStapleCount}</div>
                      {/* <div className="title-boxRSM2">{idStapleCount}</div> */}
                      {/* {data_Count.map((item2, index) => {
                  <div key={index} className="title-boxRSM2">{item2.id_staple}</div>;
                })} */}
                    </div>
                  </div>
                </div>
                {/* <div className="boxRSM2-1-1">
                <div className="title-boxRSM">
                  <div className="title-boxRSM1">จำนวนวัตถุดิบที่ปรับ</div>
                  <div className="title-boxRSM2">2</div>
                </div>
              </div> */}
                {/* <div className="boxRSM2-1-1">
                <div className="title-boxRSM">
                  <div className="title-boxRSM1">จำนวนที่ทำรายการวันนี้</div>
                  <div className="title-boxRSM2">10</div>
                </div>
              </div> */}
                {/* <div className="boxRSM2-1-1">
                <div className="title-boxRSM">
                  <div className="title-boxRSM1">ปริมาณที่ปรับทั้งหมด</div>
                  <div className="title-boxRSM2">10</div>
                </div>
              </div> */}
              </div>
              <div className="boxR2-2">
                <div className="titleR">
                  <div className="titleR-Table">ตารางปรับสต๊อก</div>
                </div>

                <div className="mainR">
                  {/* {activeTab === 1 ? (
              <Report3Chart1 />
            ) : activeTab === 2 ? (
              <Report3Chart1 />
            ) : (
              <Report3Chart1 />
            )} */}

                  <table class="styled-table-Unit">
                    <thead>
                      <tr>
                        <th>รหัสการปรับ</th>
                        <th>วันที่ทำการ</th>
                        <th>ชื่อวัตถุดิบ </th>
                        <th>รหัสล็อต</th>
                        <th>ปริมาณก่อนปรับ (กรัม)</th>
                        <th>ปริมาณที่ปรับ (กรัม)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.id_cutStock}</td>
                            <td>{item.date_cutStock}</td>
                            <td>{item.Name_staple}</td>
                            <td>{item.id_lot}</td>
                            <td>{item.amount_old}</td>
                            <td>{item.amount_total}</td>
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

export default TabReport3;
