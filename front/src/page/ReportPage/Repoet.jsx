import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPen, FaEye } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Repoet() {
  const navigate = useNavigate();
  // const [currentPage, setCurrentPage] = useState(1);
  // const recordsPerPage = 9;
  // const lastIndex = currentPage * recordsPerPage;
  // const firstIndex = lastIndex - recordsPerPage;
  // const records = tableData.slice(firstIndex, lastIndex);
  // const npage = Math.ceil(tableData.length / recordsPerPage);
  // const number = [...Array(npage + 1).keys()].slice(1);

  // function prePage() {
  //   if (currentPage < firstIndex) {
  //     setCurrentPage(currentPage - 1);
  //   } else if (currentPage === firstIndex) {
  //     setCurrentPage(changeCPage + 0);
  //   }
  // }

  // function changeCPage(id) {
  //   setCurrentPage(id);
  // }

  // function nextPage() {
  //   if (currentPage !== npage) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // }





  const [itemss, setItemss] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tableData, setTableData] = useState([]);

  const select_nameStable = (e) => {
    const selectedId = e.target.value;
    setSelectedCategory(selectedId);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5500/lotReadSelect")
      .then((res) => setItemss(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetch(`http://localhost:5500/lotTable/${selectedCategory}`)
        .then((response) => response.json())
        .then((data) => setTableData(data))
        .catch((error) => console.error("Error fetching table data:", error));
    } else {
      setTableData([]);
    }
  }, [selectedCategory]);








  
  return <><main className="main-stable ">
    <div className="lot-text-header">ล็อตวัตถุดิบ</div>

    <div className="grup_btn-lot">
      <div className="select-show">
        <div style={{ color: "black" }}>เลือกวัตถุดิบ : </div>
        <select
          className="select-stable-showtable"
          value={selectedCategory}
          onChange={(e) => select_nameStable(e)}
        >
          <option value="">เลือกวัตถุดิบ</option>
          {itemss.map((item) => (
            <option key={item.id} value={item.id_staple}>
              {item.Name_staple}
            </option>
          ))}
        </select>
      </div>

      <button className="btnstable">
        <h2>
          <BiPlus />
        </h2>
      </button>
    </div>

    <div class="table-body-lot">
      <table class="styled-table-lot">
        <thead>
          <tr>
            <th>รหัสล็อต</th>
            <th>วันหมดอายุ</th>
            <th>ราคา</th>
            <th>ปริมาณ</th>
            <th>ปริมาณคงเหลือ </th>

            <th>COA</th>
            <th>MSDS</th>
            <th>ผู้บันทึก</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data) => (
            <tr>
              <td style={{ color: "blue", cursor: "pointer" }}>
                {data.id_lot}
              </td>
              <td>{data.expiration_date}</td>
              <td>{data.cost}</td>
              <td>{data.amount}</td>
              <td>{data.amount_re}</td>
              {/* <td>{data.amount_re - data.amount}</td> */}
              <td className="td-lot">
                <button className="btnstableRead">
                  <h3>
                    <FaEye />
                  </h3>
                </button>
              </td>
              <td className="td-lot">
                <button className="btnstableRead">
                  <h3>
                    <FaEye />
                  </h3>
                </button>
              </td>
              <td>{data.name}</td>

              {/* <td className="TDStable">{data.cost}</td>
                  <td className="TDStable">{data.cost}</td> */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* <nav>
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
              <a href="#" className="page-link" onClick={() => changeCPage(n)}>
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
      </nav> */}
    </div>
  </main>;</>;
}

export default Repoet;
