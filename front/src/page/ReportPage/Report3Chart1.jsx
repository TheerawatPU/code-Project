import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";

function Report3Chart1() {
  const [data, setData] = useState([]);
  //   โหลดข้อมูลมาใส่ไว้ใน component นี้
  useEffect(() => {
    axios
      .get("http://localhost:5500/table_cutStock")
      .then((res) => setData(res.data))
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

  return (
    <>
      <table class="styled-table-Unit">
        <thead>
          <tr>
            <th>รหัสการปรับ</th>
            <th>วันที่ทำการ</th>
            <th>ชื่อวัตถุดิบ </th>
            <th>รหัสล็อต</th>
            <th>ปริมาณก่อนปรับ (กรัม)</th>
            <th>ปริมาณที่ปรับ (กรัม)</th>
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
              <a href="#" className="page-link" onClick={() => changeCPage(n)}>
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
    </>
  );
}

export default Report3Chart1;
