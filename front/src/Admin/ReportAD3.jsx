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

function ReportAD3() {
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
      .get("http://localhost:5500/Report_cutStock_all")
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

  // ! ฟังก์ชั่นเลือกรีพอร์ต
  // สร้าง state สำหรับเก็บวันที่เริ่มต้นและสิ้นสุดของช่วงเวลาที่จะค้นหา
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // ฟังก์ชันสำหรับค้นหาข้อมูล
  const handleSearch = () => {
    axios
      .get(
        `http://localhost:5500/Report_cutStock_date?start_date=${startDate}&end_date=${endDate}`
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error searching for students", error);
      });
  };

  // ล้างข้อมูล
  const handleClear = () => {
    setStartDate("");
    setEndDate("");
    axios
      .get("http://localhost:5500/Report_cutStock_all")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching students", error);
      });
  };

  // select เลือกวัน/เดือน/ปี
  const handleViewOptionselect = (event) => {
    const view = event.target.value;
    axios
      .get(`http://localhost:5500/buy_stable_all3/${view}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching students", error);
      });
  };

  // ปุ่มกด สัปหาด์/เดือน/ปี
  const handleViewOption2 = (option) => {
    axios
      .get(`http://localhost:5500/Report_cutStock_date_button_date/${option}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching students", error);
      });
  };

  // กด เรียงลำดับน้อยไปมาก มากไปน้อย
  const [sortOrder, setSortOrder] = useState("asc");
  const handleSort = (column) => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    axios
      .get(
        `http://localhost:5500/Report_cutStock_date_button_sort/${column}/${newSortOrder}`
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error sorting students", error);
      });
  };

  // ! ฟังก์ชั่นเลือกรีพอร์ต------------------------------

  return (
    <>
      <div className="back-0">
        
        <div className="back01new">
          <div className="R00">
            <input
              type="text"
              className="inReport00"
              placeholder="ค้นหา..."
              value={filterVal}
              onInput={(e) => handleFilter(e)}
            />
          </div>

          <div className="R01">
            <div className="R1">
              {/* <select name="" id="" className="selectReport00">
                <option value="">วัตถุดิบทั้งหมด</option>
                <option value="">1</option>
                <option value="">1</option>
              </select> */}
            </div>

            <div className="R2">
              <button
                className="B_DMY"
                onClick={() => handleViewOption2("week")}
              >
                สัปดาห์
              </button>
              <button
                className="B_DMY"
                onClick={() => handleViewOption2("month")}
              >
                เดือน
              </button>
              <button
                className="B_DMY"
                onClick={() => handleViewOption2("year")}
              >
                ปี
              </button>
            </div>

            <div className="R3">
              <input
                type="date"
                name=""
                className="dateSeach"
                id="startDate"
                onChange={(e) => setStartDate(e.target.value)}
              />
              <label htmlFor="" className="labeldate">
                ถึง
              </label>
              <input
                type="date"
                name=""
                className="dateSeach"
                id="endDate"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="R4">
              <button className="B_report00" onClick={handleSearch}>
                ค้นหา
              </button>
              <button className="B_report01" onClick={handleClear}>
                ล้าง
              </button>
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
                      <p
                        style={{
                          paddingLeft: "5px",
                          color: "#393B44",
                          fontSize: "25px",
                        }}
                      >
                        รายการ
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="boxR2-2">
                <div className="titleR">
                  <div className="titleR-Table">ตารางปรับสต๊อก</div>
                </div>

                <div className="mainR">
                  <table class="styled-table-Unit">
                    <thead>
                      <tr>
                        <th onClick={() => handleSort("id_cutStock")}>
                          รหัสการปรับ
                          <FontAwesomeIcon
                            icon={faArrowRightArrowLeft}
                            rotation={270}
                            style={{ marginLeft: "15px" }}
                          />
                        </th>
                        <th onClick={() => handleSort("date_cutStock")}>
                          วันที่ทำการ
                          <FontAwesomeIcon
                            icon={faArrowRightArrowLeft}
                            rotation={270}
                            style={{ marginLeft: "15px" }}
                          />
                        </th>
                        <th onClick={() => handleSort("Name_staple")}>
                          ชื่อวัตถุดิบ
                          <FontAwesomeIcon
                            icon={faArrowRightArrowLeft}
                            rotation={270}
                            style={{ marginLeft: "15px" }}
                          />
                        </th>
                        <th onClick={() => handleSort("id_lot")}>
                          รหัสล็อต
                          <FontAwesomeIcon
                            icon={faArrowRightArrowLeft}
                            rotation={270}
                            style={{ marginLeft: "15px" }}
                          />
                        </th>
                        <th onClick={() => handleSort("amount_old")}>
                          ปริมาณก่อนปรับ (กรัม)
                          <FontAwesomeIcon
                            icon={faArrowRightArrowLeft}
                            rotation={270}
                            style={{ marginLeft: "15px" }}
                          />
                        </th>
                        <th onClick={() => handleSort("amount_total")}>
                          ปริมาณที่ปรับ (กรัม)
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

export default ReportAD3;
