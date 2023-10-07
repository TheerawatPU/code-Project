import React, { useEffect, useState } from "react";
import { FaPen, FaEye } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Topnav from "../../component/Topnav";
import Menu from "../../component/Menu";
import { useLocation } from "react-router-dom";

function TabUnit2() {
  // ดึงข้อมูลผู้บันทึกที่เข้าระบบตอนนั้น
  const userLoginData = JSON.parse(sessionStorage.getItem("userlogin"));
  const location = useLocation();
  // ตัวใช้สำหรับการลิงค์ข้าม component
  const navigate = useNavigate();

  //   state สำหรับเก็บข้อมูลที่ได้ทำการโหลดมา
  const [data, setData] = useState([]);

  //   โหลดข้อมูลมาใส่ไว้ใน component นี้
  useEffect(() => {
    axios
      .get("http://localhost:5500/productRead")
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
          <button className="btnstable" onClick={() => navigate(`ProductNew`)}>
            <h2>
              <BiPlus />
            </h2>
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
                <th>สถานะการชำระ</th>
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
                      onClick={() => navigate(`ProductID/${item.id_productorder}`)}
                    >
                      {item.id_productorder}
                    </td>
                    <td>
                      <b>อภิชาติ ฟาร์มไก่</b>
                    </td>
                    <td>{item.day_productorder}</td>
                    <td>{item.day_move}</td>
                    <td>{item.amount_productorder}</td>
                    <td>ชำระแล้ว</td>
                    <td>ยืนยันแล้ว</td>
                    <td>{userLoginData[0].name}</td>

                    <td className="TDStable">
                      <button
                        className="btnstableRead"
                        onClick={() => navigate(`ProductID/${item.id_productorder}`)}
                      >
                        <h3>
                          <FaEye />
                        </h3>
                      </button>
                      <button
                        onClick={() => navigate(`StableEdit/${item.id_unit}`)}
                        className="btnstableEdit"
                      >
                        <h3>
                          <FaPen />
                        </h3>
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
                <td>ยังไม่ชำระ</td>
                <td>
                  <button className="btnstableRead">
                    <h3>
                      ยืนยัน
                    </h3>
                  </button>
                </td>
                <td>{userLoginData[0].name}</td>

                <td className="TDStable">
                  <button
                    className="btnstableRead"
                    onClick={() => navigate(`ProductID/${ProductID}`)}
                  >
                    <h3>
                      <FaEye />
                    </h3>
                  </button>
                  <button
                    onClick={() => navigate(`StableEdit/$`)}
                    className="btnstableEdit"
                  >
                    <h3>
                      <FaPen />
                    </h3>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <nav>
            <ul className="pagination-stable">
              <li className="page-item-stable">
                <a href="#" className="page-link" onClick={prePage}>
                  ก่อน
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
                  ต่อไป
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
