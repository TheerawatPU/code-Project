import React, { useEffect, useState } from "react";

import "../../CSS/Report.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FaChartPie, FaChartBar, FaBorderAll } from "react-icons/fa";

import Report1Chart1 from "./Report1Chart1";
import Report1Chart2 from "./Report1Chart2";
import Report1Chart3 from "./Report1Chart3";

import Report2Chart1 from "./Report2Chart1";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faArrowLeft,
  faPrint,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

function TabReport2() {
  const [idStapleCount, setIdStapleCount] = useState(0);

  //   โหลดข้อมูลมาใส่ไว้ใน component นี้
  useEffect(() => {
    // ทำการร้องขอ API เพื่อนับจำนวน id_staple
    axios
      .get("http://localhost:5500/countbuy_staple") // เปลี่ยนเส้นทาง URL ตามที่คุณใช้งาน
      .then((response) => {
        // ดึงข้อมูลจำนวน id_staple จากการร้องขอ API
        const idStapleCountFromAPI = response.data[0].id_buylist; // แนะนำให้ตรวจสอบโครงสร้างข้อมูลของ API

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
      .get("http://localhost:5500/buy_stable_all")
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

  // สร้าง state สำหรับเก็บวันที่เริ่มต้นและสิ้นสุดของช่วงเวลาที่จะค้นหา
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // ฟังก์ชันสำหรับค้นหาข้อมูล
  const searchByDate = () => {
    // ทำการค้นหาข้อมูลจาก API โดยส่งวันที่เริ่มต้นและสิ้นสุดไปด้วย
    axios
      .get(
        `http://localhost:5500/buy_stable_all?start_date=${startDate}&end_date=${endDate}`
      )
      .then((res) => {
        // นำข้อมูลที่ได้มาแสดงในตาราง
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  //! ฟังก์ชั่นเลขหน้าจำนวนแถวในตาราง
  const [filterVal, setFilterVal] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);

  const handleFilter = (e) => {
    if (e.target.value == "") {
      setData(searchApiData);
    } else {
      const filterResult = searchApiData.filter(
        (item) =>
          item.day_buy.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.day_admit_staple
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          item.store.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.note.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.refer_id.toString().includes(e.target.value.toString()) ||
          item.id_buylist.toString().includes(e.target.value)
      );

      if (filterResult.length > 0) {
        setData(filterResult);
      } else {
        setData([
          {
            day_buy: "ไม่มีข้อมูล",
            day_admit_staple: "ไม่มีข้อมูล",
            store: "ไม่มีข้อมูล",
            id_buylist: "ไม่มีข้อมูล",
            note: "ไม่มีข้อมูล",
            refer_id: "ไม่มีข้อมูล",
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
                <button
                  type="submit"
                  className="Report_search_btn"
                  // onClick={searchByDate}
                >
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
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <h2>ถึง</h2>
                  <input
                    type="date"
                    className="input-date-Report"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>

                <div className="Rbox2-2-2-3">
                  <button className="Report_search_btn" onClick={searchByDate}>
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
              <div className="boxR2-1">
                <div className="boxRSM2-1-1">
                  <div className="title-boxRSM">
                    <div className="title-boxRSM1">สั่งซื้อวัตถุดิบ</div>
                    <div className="title-list-boxRSM">
                      <div className="title-boxRSM2">{idStapleCount}</div>
                      {/* {data_Count.map((item2, index) => {
                  <div key={index} className="title-boxRSM2">{item2.id_staple}</div>;
                })} */}
                    </div>
                  </div>
                </div>
                {/* <div className="boxRSM2-1-1">
                <div className="title-boxRSM">
                  <div className="title-boxRSM1">วัตถุดิบใหม่</div>
                  <div className="title-boxRSM2">2</div>
                </div>
              </div> */}
                {/* <div className="boxRSM2-1-1">
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
              </div> */}
              </div>
              <div className="boxR2-2">
                <div className="titleR">
                  <div className="titleR-Table">ตารางสั่งซื้อวัตถุดิบ</div>
                </div>

                <div className="mainR">
                  <table class="styled-table-Unit">
                    <thead>
                      <tr>
                        <th>รหัสการสั่งซื้อ</th>
                        <th>วันที่สั่งซื้อ</th>
                        <th>วันที่รับวัตถุดิบ </th>
                        <th>ร้านค้าที่สั่งซื้อ</th>
                        <th>ราคาต้นทุน (บาท)</th>
                        <th>ยอดรวม (บาท)</th>
                        <th>รหัสอ้างอิง</th>
                        <th>หมายเหตุ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.id_buylist}</td>
                            <td>{item.day_buy}</td>
                            <td>{item.day_admit_staple}</td>
                            <td>{item.store}</td>
                            <td>{item.cost_price}</td>
                            <td>{item.total_cost}</td>
                            <td>{item.refer_id}</td>
                            <td>{item.note}</td>
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

export default TabReport2;
