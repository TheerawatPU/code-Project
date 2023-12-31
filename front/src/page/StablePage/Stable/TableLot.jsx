import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../CSS/lot.css";
import { BiPlus } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import Topnav from "../../../component/Topnav";
import Menu from "../../../component/Menu";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faPlus,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import { FaArrowLeftLong } from "react-icons/fa6";

function TableLot() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [stapleName, setStapleName] = useState("");

  const [Data, setdata] = useState([]);

  console.log("Data", Data);
  console.log("stapleName", stapleName);

  useEffect(() => {
    // ดึงชื่อวัตถุดิบจาก API โดยใช้ไอดี
    axios
      .get("http://localhost:5500/lotReadSelectID/" + id)
      .then((res) => {
        console.log("API Response:", res.data[0].Name_staple); // Log the API response
        if (res.data[0].Name_staple) {
          setStapleName(res.data[0].Name_staple); // ตั้งค่าชื่อวัตถุดิบ
          console.log("stapleName:", res.data.Name_staple);
        }
      })
      .catch((err) => console.log(err));

    axios
      .get(`http://localhost:5500/lotTable/${id}`)
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  //next page
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 9;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = Data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(Data.length / recordsPerPage);
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
    <div className="all-page-new">
      <header className="header-new">
        <Topnav />
      </header>
      <section className="aside-new">
        <Menu />
      </section>
      <main className="main-new">
        <div className="top-lot-0">
          <div className="select-show">
            <div
              className="lot-text-header"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            >
              <FaArrowLeftLong />
            </div>
            <div className="lot-header">ล็อตวัตถุดิบ {stapleName}</div>
          </div>

          <div className="amount_lot_all">
            <label style={{ color: "black", marginRight: "20px" }}>
              ปริมาณรับเข้าทั้งหมด:
            </label>
            <div className="numberSUM1">
              <input
                className="numberSUM2"
                type="text"
                disabled
                // value={ (Data.reduce((sum, student) => sum + student.amount, 0))  }
                value={`จำนวน ${Data.reduce(
                  (sum, student) => sum + student.amount,
                  0
                )}  ชิ้น`}
              />
            </div>
          </div>

          <div className="amount_lot_all">
            <label style={{ color: "black", marginRight: "20px" }}>
              ปริมาณคงเหลือทั้งหมด:
            </label>
            <div className="numberSUM1">
              <input
                className="numberSUM2"
                type="text"
                disabled
                // value={ (Data.reduce((sum, student) => sum + student.amount, 0))  }
                value={`จำนวน ${Data.reduce(
                  (sum, student) => sum + student.amount_re,
                  0
                )}  ชิ้น`}
              />
            </div>
          </div>

          <button className="btnstable2" onClick={() => navigate(`AddLot`)}>
            <div>
              <FontAwesomeIcon icon={faPlus} />
            </div>
            <div>เพิ่ม</div>
          </button>
        </div>

        <div class="table-body-lot">
          <table class="styled-table-Customer">
            <thead>
              <tr>
                <th>รหัสล็อต</th>
                <th>วันหมดอายุ</th>
                <th>ราคา</th>
                <th>ปริมาณ</th>
                <th>ปริมาณคงเหลือ</th>
                <th>COA</th>
                <th>MSDS</th>
                <th>ผู้บันทึก</th>
              </tr>
            </thead>
            <tbody>
              {records.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id_lot}</td>
                    <td>{item.expiration_date}</td>
                    <td>{item.cost}</td>
                    <td>{item.amount}</td>
                    <td>{item.amount_re}</td>

                    <td>
                      <div className="TDB">
                        <button
                          className="lot-download"
                          onClick={() =>
                            navigate(`CustomerReadIDPage/${item.id_lot}`)
                          }
                        >
                          <h3>
                            <FontAwesomeIcon icon={faDownload} />
                          </h3>
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="TDB">
                        <button
                          className="lot-download"
                          onClick={() =>
                            navigate(`CustomerReadIDPage/${item.id_lot}`)
                          }
                        >
                          <h3>
                            <FontAwesomeIcon icon={faDownload} />
                          </h3>
                        </button>
                      </div>
                    </td>

                    <td>{item.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <nav>
            <ul className="pagination-Customer">
              <li className="page-item-Customer">
                <a href="#" className="page-link" onClick={prePage}>
                  <FontAwesomeIcon icon={faAnglesLeft} />
                </a>
              </li>
              {number.map((n, i) => (
                <li
                  className={`page-item-Customer ${
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
              <li className="page-item-Customer">
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

export default TableLot;
