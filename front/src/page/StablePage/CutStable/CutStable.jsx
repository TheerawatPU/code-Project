import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../CSS/Stable.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEye,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import { FaEye } from "react-icons/fa";

function CutStable() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

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
            className="btnstable2"
            onClick={() => navigate(`CusStableNew`)}
          >
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
                <tr key={index}>
                  <td style={{ color: "blue", cursor: "pointer" }}>
                    {item.id_cutStock}
                  </td>
                  <td>{item.date_cutStock}</td>
                  <td>{item.Name_staple}</td>
                  <td>{item.id_lot}</td>
                  <td>{item.amount_old}</td>
                  <td>{item.amount_total}</td>
                  <td>
                    <div className="text-cutstable">{item.cause}</div>
                  </td>
                  <td>{item.details_cutStock}</td>
                  <td>{item.name}</td>

                  <td className="TDStable">
                    <button
                      className="btnstableRead2"
                      onClick={() =>
                        navigate(`CusStableReadID/${item.id_cutStock}`)
                      }
                    >
                      <div className="icon_edit">
                        <FontAwesomeIcon icon={faEye} />
                      </div>
                      {/* <div className="test-icon-edit">ดูข้อมูล</div> */}
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

export default CutStable;
