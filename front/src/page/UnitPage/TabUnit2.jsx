import React, { useEffect, useState } from "react";
import { FaPen, FaEye } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faEye,
  faPlus,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

function TabUnit2() {
  // ดึงข้อมูลผู้บันทึกที่เข้าระบบตอนนั้น
  const userLoginData = JSON.parse(sessionStorage.getItem("userlogin"));

  // ตัวใช้สำหรับการลิงค์ข้าม component
  const navigate = useNavigate();

  //   state สำหรับเก็บข้อมูลที่ได้ทำการโหลดมา
  const [data, setData] = useState([]);

  //   โหลดข้อมูลมาใส่ไว้ใน component นี้
  useEffect(() => {
    axios
      .get("http://localhost:5500/producter")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

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

  return (
    <div>
      <main className="main-stable ">
        <div className="grup_btn">
          <p>รายการผลิต</p>
          <input
            className="inputsearch"
            type="text"
            placeholder="ช่องค้นหา...."
            // value={filterVal}
            // onInput={(e) => handleFilter(e)}
          />
          <button className="btnstable2" onClick={() => navigate(`ProductNew`)}>
            <div>
              <FontAwesomeIcon icon={faPlus} />
            </div>
            <div>เพิ่ม</div>
          </button>
        </div>

        <div class="table-body">
          <table class="styled-table">
            <thead>
              <tr>
                <th>รหัส</th>
                <th>ชื่อลูกค้า</th>
                <th>วันที่ผลิต</th>
                <th>วันที่ส่งมอบ</th>
                <th>ยอดรวม </th>
              
                <th>ยืนยันการผลิต</th>
                <th>ผู้บันทึก</th>

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
                      onClick={() =>
                        navigate(`ProductID/${item.id_productorder}`)
                      }
                    >
                      {item.id_productorder}
                    </td>
                    <td>
                      <b>อภิชาติ ฟาร์มไก่</b>
                    </td>
                    <td>{item.day_productorder}</td>
                    <td>{item.day_move}</td>
                    <td>{item.total_cost}</td>
                    
                    <td>ยืนยันแล้ว</td>
                    <td>{userLoginData[0].name}</td>

                    <td className="TDStable">
                  <button
                    className="btnstableRead2"
                    onClick={() => navigate(`ProductID/${ProductID}`)}
                  >
                    <div className="icon_edit">
                      <FontAwesomeIcon icon={faEye} />
                    </div>
                    {/* <div className="test-icon-edit">ดูข้อมูล</div> */}
                  </button>

                  <button
                    onClick={() => navigate(`StableEdit/$`)}
                    className="btnstableEdit2"
                  >
                    <div className="icon_edit">
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </div>
                    {/* <div className="test-icon-edit">แก้ไข</div> */}
                  </button>
                </td>
                  </tr>
                );
              })}

              {/* ข้อมูลจำลอง */}
              <tr>
                <td style={{ color: "blue", cursor: "pointer" }}>2</td>
                <td>
                  <b>ดวงใจ เดือนเพ็ญ</b>
                </td>
                <td>12/12/2023</td>
                <td>5/5/2024</td>
                <td>4500</td>
              
                <td>
                  <button className="btnstableRead">
                    <h3>ยืนยัน</h3>
                  </button>
                </td>
                <td>{userLoginData[0].name}</td>

                <td className="TDStable">
                  <button
                    className="btnstableRead2"
                    onClick={() => navigate(`ProductID/${ProductID}`)}
                  >
                    <div className="icon_edit">
                      <FontAwesomeIcon icon={faEye} />
                    </div>
                    {/* <div className="test-icon-edit">ดูข้อมูล</div> */}
                  </button>

                  <button
                    onClick={() => navigate(`StableEdit/$`)}
                    className="btnstableEdit2"
                  >
                    <div className="icon_edit">
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </div>
                    {/* <div className="test-icon-edit">แก้ไข</div> */}
                  </button>
                </td>
              </tr>
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

export default TabUnit2;
