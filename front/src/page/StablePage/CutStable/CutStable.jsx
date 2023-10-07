import React, { useEffect, useState } from "react";
import { FaPen, FaEye } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import { CgBox } from "react-icons/cg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../../../CSS/Stable.css";
import Topnav from "../../../component/Topnav";
import Menu from "../../../component/Menu";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxArchive } from "@fortawesome/free-solid-svg-icons";

function CutStable() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  // ไอดีการเพิ่มสต๊อก
  // const [oldestIdUnit, setOldestIdUnit] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:5500/table_cutStock")
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);

  // console.log("ID" , oldestIdUnit)

  //next page555555
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;
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
    <div>
      <main className="main-stable ">
        <div className="grup_btn">
          <p>รายการปรับสต๊อก</p>
          <input
            className="inputsearch"
            type="text"
            placeholder="ช่องค้นหา...."
          />
          <button
            className="btnstable"
            onClick={() => navigate(`CusStableNew`)}
          >
            <h2>
              <BiPlus />
            </h2>
          </button>
        </div>

        <div class="table-body">
          <table class="styled-table">
            <thead>
              <tr>
                <th>รหัสการปรับ</th>
                <th>วันที่ทำการ</th>
                <th>ชื่อวัตถุดิบ</th>
                <th>รหัสล็อต</th>
                <th>จำนวนก่อนปรับ(กรัม)</th>
                <th>จำนวนที่ปรับ(กรัม)</th>
                <th>สาเหตุการปรับ</th>
                <th>รายละเอียด</th>
                <th>ผู้บันทึก</th>

                <th
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  ดูรายละเอียด
                </th>
              </tr>
            </thead>

            <tbody>
              {records.map((item, index) => (
                <tr>
                  <td style={{ color: "blue", cursor: "pointer" }}>
                    {item.id_cutStock}
                  </td>
                  <td>{item.date_cutStock}</td>
                  <td>{item.Name_staple}</td>
                  <td>{item.id_lot}</td>
                  <td>{item.amount_old}</td>
                  <td>{item.amount_total}</td>
                  <td><p>{item.cause}</p></td>
                  <td>{item.details_cutStock}</td>
                  <td>{item.name}</td>

                  <td className="TDStable">
                    <button className="btnstableRead">
                      <h3>
                        <FaEye />
                      </h3>
                    </button>
                  </td>
                </tr>
              ))}
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

export default CutStable;
