import React, { useEffect, useState } from "react";

import "../../CSS/Report.css";

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

function TabReport1() {
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
      .get("http://localhost:5500/Report_Stable_all")
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

  // ล้างข้อมูล
  const handleClear = () => {
    axios
      .get("http://localhost:5500/Report_Stable_all")
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
      .get(`http://localhost:5500/Report_Stable_date/${view}`)
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
        `http://localhost:5500/Report_Stable_button_sort/${column}/${newSortOrder}`
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error sorting students", error);
      });
  };

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
              {/* <button className="B_DMY">สัปดาห์</button>
              <button className="B_DMY">เดือน</button>
              <button className="B_DMY">ปี</button> */}
            </div>

            <div className="R3">
              {/* <input type="date" name="" id="" className="dateSeach" />
              <label htmlFor="" className="labeldate">
                ถึง
              </label>
              <input type="date" name="" id="" className="dateSeach" /> */}
            </div>

            <div className="R4-4">
              {/* <button className="B_report00">ค้นหา</button> */}
              <select
                name=""
                id=""
                className="selectReport00"
                onChange={handleViewOptionselect}
              >
                <option value="วัตถุดิบทั้งหมด">วัตถุดิบทั้งหมด</option>
                <option value="วัตถุดิบต่ำกว่าจุดสั่งซื้อ">
                  วัตถุดิบต่ำกว่าจุดสั่งซื้อ
                </option>
                <option value="วัตถุดิบคงเหลือมากสุด">
                  วัตถุดิบคงเหลือมากสุด
                </option>
                <option value="วัตถุดิบคงเหลือน้อยสุด">
                  วัตถุดิบคงเหลือน้อยสุด
                </option>
                <option value="วัตถุดิบราคามากสุด">วัตถุดิบราคามากสุด</option>
                <option value="วัตถุดิบราคาน้อยสุด">วัตถุดิบราคาน้อยสุด</option>
              </select>
              <button className="B_report02" onClick={handleClear}>
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
                    <div className="title-boxRSM1">วัตถุดิบทั้งหมด</div>
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
                      <th onClick={() => handleSort("id_staple")}>
                        รหัส
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
                      <th onClick={() => handleSort("Name_INCIname")}>
                        INCIname
                        <FontAwesomeIcon
                          icon={faArrowRightArrowLeft}
                          rotation={270}
                          style={{ marginLeft: "15px" }}
                        />
                      </th>
                      <th onClick={() => handleSort("reOrder")}>
                        จุดสั่งซื้อ
                        <FontAwesomeIcon
                          icon={faArrowRightArrowLeft}
                          rotation={270}
                          style={{ marginLeft: "15px" }}
                        />
                      </th>
                      <th onClick={() => handleSort("cost")}>
                        ปริมาณคงเหลือ (กรัม)
                        <FontAwesomeIcon
                          icon={faArrowRightArrowLeft}
                          rotation={270}
                          style={{ marginLeft: "15px" }}
                        />
                      </th>
                      <th onClick={() => handleSort("amount_re")}>
                        ราคา (บาท)
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

export default TabReport1;
