import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";

function Report5Chart1() {
  const [data, setData] = useState([]);
  //   โหลดข้อมูลมาใส่ไว้ใน component นี้
  useEffect(() => {
    axios
      .get("http://localhost:5500/producter")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  //next page555555
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 11;
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
            <th>รหัสการผลิต</th>
            <th>ชื่อลูกค้า</th>
            <th>วันที่ผลิต </th>
            <th>วันที่ส่งมอบ</th>
            <th>ยอดรวม</th>
          </tr>
        </thead>
        <tbody>
          {records.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.id_productorder}</td>
                <td>{item.name_cus}</td>
                <td>{item.day_productorder}</td>
                <td>{item.day_move}</td>
                <td>{item.total_cost}</td>
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

export default Report5Chart1;
