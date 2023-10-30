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
  faArrowRightArrowLeft,
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
  // ! ฟังก์ชั่นเลือกรีพอร์ต
  // สร้าง state สำหรับเก็บวันที่เริ่มต้นและสิ้นสุดของช่วงเวลาที่จะค้นหา
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // ฟังก์ชันสำหรับค้นหาข้อมูล
  const handleSearch = () => {
    axios
      .get(
        `http://localhost:5500/Report_buy_stable_date?start_date=${startDate}&end_date=${endDate}`
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
      .get("http://localhost:5500/buy_stable_all")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching students", error);
      });
  };

  // select เลือกวัน/เดือน/ปี
  const handleViewOption = (event) => {
    const view = event.target.value;
    axios
      .get(`http://localhost:5500/Report_buy_stable_button_date/${view}`)
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
      .get(`http://localhost:5500/Report_buy_stable_button_date/${option}`)
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
        `http://localhost:5500/Report_buy_stable_button_sort/${column}/${newSortOrder}`
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error sorting students", error);
      });
  };

  // เลือกร้านค้า
  const [store, setStore] = useState([]);
  //   โหลดข้อมูลมาใส่ไว้ใน component นี้
  useEffect(() => {
    axios
      .get("http://localhost:5500/Report_buy_stable_select_Store")
      .then((res) => {
        setStore(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // โชว์จากที่เลือก
  const handleTeacherSelect = (event) => {
    const store = event.target.value;

    if (store) {
      axios
        .get(
          `http://localhost:5500/Report_buy_stable_select_StoreData/${store}`
        )
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching students", error);
        });
    } else {
      // ถ้าคุณเลือก "เลือกครูที่ปรึกษา" ให้ดึงรายชื่อนักเรียนทั้งหมด
      axios
        .get("http://localhost:5500/buy_stable_all")
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching students", error);
        });
    }
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
              <select
                name=""
                id=""
                className="selectReport00"
                onChange={handleTeacherSelect}
              >
                <option value="">ร้านค้าที่สั่งซื้อ</option>
                {store.map((cusOption) => (
                  <option key={cusOption.id} value={cusOption.store}>
                    {cusOption.store}
                  </option>
                ))}
              </select>
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
                    <div className="title-boxRSM1">สั่งซื้อวัตถุดิบ</div>
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
                        <th onClick={() => handleSort("id_buylist")}>
                          รหัสการสั่งซื้อ
                          <FontAwesomeIcon
                            icon={faArrowRightArrowLeft}
                            rotation={270}
                            style={{ marginLeft: "15px" }}
                          />
                        </th>
                        <th onClick={() => handleSort("day_buy")}>
                          วันที่สั่งซื้อ
                          <FontAwesomeIcon
                            icon={faArrowRightArrowLeft}
                            rotation={270}
                            style={{ marginLeft: "15px" }}
                          />
                        </th>
                        <th onClick={() => handleSort("day_admit_staple")}>
                          วันที่รับวัตถุดิบ
                          <FontAwesomeIcon
                            icon={faArrowRightArrowLeft}
                            rotation={270}
                            style={{ marginLeft: "15px" }}
                          />
                        </th>
                        <th onClick={() => handleSort("store")}>
                          ร้านค้าที่สั่งซื้อ
                          <FontAwesomeIcon
                            icon={faArrowRightArrowLeft}
                            rotation={270}
                            style={{ marginLeft: "15px" }}
                          />
                        </th>
                        <th onClick={() => handleSort("cost_price")}>
                          ราคาต้นทุน (บาท)
                          <FontAwesomeIcon
                            icon={faArrowRightArrowLeft}
                            rotation={270}
                            style={{ marginLeft: "15px" }}
                          />
                        </th>
                        <th onClick={() => handleSort("total_cost")}>
                          ยอดรวม (บาท)
                          <FontAwesomeIcon
                            icon={faArrowRightArrowLeft}
                            rotation={270}
                            style={{ marginLeft: "15px" }}
                          />
                        </th>
                        <th onClick={() => handleSort("refer_id")}>
                          รหัสอ้างอิง
                          <FontAwesomeIcon
                            icon={faArrowRightArrowLeft}
                            rotation={270}
                            style={{ marginLeft: "15px" }}
                          />
                        </th>
                        <th onClick={() => handleSort("note")}>
                          หมายเหตุ
                          <FontAwesomeIcon
                            icon={faArrowRightArrowLeft}
                            rotation={270}
                            style={{ marginLeft: "15px" }}
                          />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => {
                        let date = new Date(item["day_buy"]);
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
