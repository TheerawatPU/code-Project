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
} from "@fortawesome/free-solid-svg-icons";

import "../CSS/Report.css";

function ReportAD1() {
  const [idStapleCount, setIdStapleCount] = useState(0);

  //   โหลดข้อมูลมาใส่ไว้ใน component นี้
  useEffect(() => {
    // ทำการร้องขอ API เพื่อนับจำนวน id_staple
    axios
      .get("http://localhost:5500/countstaple") // เปลี่ยนเส้นทาง URL ตามที่คุณใช้งาน
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
      .get("http://localhost:5500/Report_Stable")
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

  const [filterVal, setFilterVal] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);

  const handleFilter = (e) => {
    if (e.target.value == "") {
      setData(searchApiData);
    } else {
      const filterResult = searchApiData.filter(
        (item) =>
          item.Name_staple.toLowerCase().includes(
            e.target.value.toLowerCase()
          ) ||
          item.Name_INCIname.toLowerCase().includes(
            e.target.value.toLowerCase()
          ) ||
          item.reOrder.toString().includes(e.target.value.toString()) ||
          item.cost.toString().includes(e.target.value.toString()) ||
          item.amount_re.toString().includes(e.target.value.toString()) ||
          item.id_staple.toString().includes(e.target.value)
      );

      if (filterResult.length > 0) {
        setData(filterResult);
      } else {
        setData([
          {
            Name_staple: "ไม่มีข้อมูล",
            Name_INCIname: "ไม่มีข้อมูล",
            reOrder: "ไม่มีข้อมูล",
            cost: "ไม่มีข้อมูล",
            amount_re: "ไม่มีข้อมูล",
            id_staple: "ไม่มีข้อมูล",
          },
        ]);
      }
    }
    setFilterVal(e.target.value);
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
                    <div className="title-boxRSM1">วัตถุดิบทั้งหมด</div>
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
                </div> */}
                {/* <div className="boxRSM2-1-1">
                  <div className="title-boxRSM">
                    <div className="title-boxRSM1">วัตถุดิบหมดอายุ</div>
                    <div className="title-boxRSM2">10</div>
                  </div>
                </div> */}
              </div>
              <div className="boxR2-2">
                <div className="titleR">
                  <div className="titleR-Table">ตารางวัตถุดิบ</div>
                </div>

                <table class="styled-table-Unit">
                  <thead>
                    <tr>
                      <th>รหัส</th>
                      <th>ชื่อวัตถุดิบ</th>
                      <th>INCIname </th>
                      <th>จุดสั่งซื้อ</th>
                      <th>ปริมาณคงเหลือ (กรัม)</th>
                      <th>ราคา (บาท)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.id_staple}</td>
                          <td>{item.Name_staple}</td>
                          <td>{item.Name_INCIname}</td>
                          <td>{item.reOrder}</td>
                          <td>{item.amount_re}</td>
                          <td>{item.cost}</td>
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
    </>
  );
}

export default ReportAD1;
