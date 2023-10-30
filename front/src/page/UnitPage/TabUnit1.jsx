import React, { useEffect, useState } from "react";
import { FaPen, FaEye } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Topnav from "../../component/Topnav";
import Menu from "../../component/Menu";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxArchive,
  faPenToSquare,
  faEye,
  faPlus,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

import "../../CSS/button.css";

import { Tooltip as ReactTooltip } from "react-tooltip";

function TabUnit1() {
  // ดึงข้อมูลผู้บันทึกที่เข้าระบบตอนนั้น
  const userLoginData = JSON.parse(sessionStorage.getItem("userlogin"));
  const location = useLocation();
  // ตัวใช้สำหรับการลิงค์ข้าม component
  const navigate = useNavigate();

  //  state สำหรับเก็บข้อมูลที่ได้ทำการโหลดมา
  const [data, setData] = useState([]);

  //  โหลดข้อมูลมาใส่ไว้ใน component นี้
  useEffect(() => {
    axios
      .get("http://localhost:5500/unitRead")
      .then((res) => {
        setData(res.data);
        setSearchApiData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //! ฟังก์ชั่นเลขหน้าจำนวนแถวในตาราง
  const [filterVal, setFilterVal] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);

  const handleFilter = (e) => {
    if (e.target.value == "") {
      setData(searchApiData);
    } else {
      const filterResult = searchApiData.filter(
        (item) =>
          item.unit_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.day_admit_list
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          item.notification_num
            .toString()
            .includes(e.target.value.toString()) ||
          item.date_notification_num
            .toString()
            .includes(e.target.value.toString()) ||
          item.name_cus.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.id_unit.toString().includes(e.target.value)
      );

      if (filterResult.length > 0) {
        setData(filterResult);
      } else {
        setData([
          {
            unit_name: "ไม่มีข้อมูล",
            day_admit_list: "ไม่มีข้อมูล",
            notification_num: "ไม่มีข้อมูล",
            date_notification_num: "ไม่มีข้อมูล",
            name_cus: "ไม่มีข้อมูล",
            name: "ไม่มีข้อมูล",
            id_unit: "ไม่มีข้อมูล",
          },
        ]);
      }
    }
    setFilterVal(e.target.value);
  };
  //! ..........................................

  //ตัวแปรสำหรับใช้การกดเลขถัดไปของหน้าจอ
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const number = [...Array(npage + 1).keys()].slice(1);

  //   ข้อมูลก่อนหน้า
  function prePage() {
    if (currentPage < firstIndex) {
      setCurrentPage(currentPage - 1);
    } else if (currentPage === firstIndex) {
      setCurrentPage(changeCPage + 0);
    }
  }

  //   ตัวเลขข้อมูล
  function changeCPage(id) {
    setCurrentPage(id);
  }

  //   ข้อมูลถัดไป
  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  const [showHint, setShowHint] = useState(false);

  return (
    <div>
      <main className="main-stable ">
        <div className="grup_btn">
          <p>สูตรผลิต</p>
          <input
            className="inputsearch"
            type="text"
            placeholder="ช่องค้นหา...."
            value={filterVal}
            onInput={(e) => handleFilter(e)}
          />
          <button className="btnstable2" onClick={() => navigate(`UnitNew`)}>
            <div>
              <FontAwesomeIcon icon={faPlus} />
            </div>
            <div>เพิ่ม</div>
          </button>

          {/* <button className="btnstable" onClick={() => navigate(`UnitNew`)}>
            <h2>
              <BiPlus />
            </h2>
          </button> */}
        </div>

        <div class="table-body">
          <table class="styled-table">
            <thead>
              <tr>
                <th>รหัส</th>
                <th>ชื่อสูตร</th>
                <th>วันที่รับรายการ</th>
                <th>เลขจดแจ้ง</th>
                <th>วันสิ้นสุดเลขจดแจ้ง </th>
                <th>ชื่อลูกค้า</th>
                <th>ชื่อผู้บันทึก</th>

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
              {records.map((item, index) => {
                return (
                  <tr key={index}>
                    <td
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={() => navigate(`Utest/${item.id_unit}`)}
                    >
                      {item.id_unit}
                    </td>
                    <td>
                      <b>{item.unit_name}</b>
                    </td>
                    <td>{item.day_admit_list}</td>
                    <td>{item.notification_num}</td>
                    <td>{item.date_notification_num}</td>
                    <td>{item.name_cus}</td>
                    <td>{item.name}</td>

                    <td className="TDStable">
                      <button
                        data-tooltip-id="my-tooltip-1"
                        className="btnstableRead2"
                        onClick={() => navigate(`Utest/${item.id_unit}`)}
                        onMouseEnter={() => setShowHint(true)}
                        onMouseLeave={() => setShowHint(false)}
                      >
                        <div className="icon_edit">
                          <FontAwesomeIcon icon={faEye} />
                        </div>

                        <ReactTooltip
                          id="my-tooltip-1"
                          place="bottom"
                          content="ดูข้อมูล"
                          style={{
                            backgroundColor: "#0000005b",
                            borderRadius: "15px",
                            marginTop: "10px",
                          }}
                        />
                      </button>

                      {/* <button
                        onClick={() => navigate(`UnitEdit/${item.id_unit}`)}
                        className="btnstableEdit2"
                      >
                        <div className="icon_edit">
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </div>
                      </button> */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <nav>
            <ul className="pagination-stable">
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
      </main>
    </div>
  );
}

export default TabUnit1;
