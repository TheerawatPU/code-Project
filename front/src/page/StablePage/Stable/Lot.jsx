import React, { useEffect, useState } from "react";
import axios from "axios";
import Topnav from "../../../component/Topnav";
import Menu from "../../../component/Menu";
import "../../../CSS/Stable.css";
import { BiPlus } from "react-icons/bi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDown } from "@fortawesome/free-solid-svg-icons";
function Lot() {
  useEffect(() => {
    axios
      .get("http://localhost:5500/customer")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  //search
  const [data, setData] = useState([]);
  const [filterVal, setFilterVal] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);

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
    <div className="all-page-new">
      <header className="header-new">
        <Topnav />
      </header>
      <section className="aside-new">
        <Menu />
      </section>
      <main className="main-new">
        <div className="grup_btn">
          <p>ล็อต</p>
          <input
            className="inputsearch"
            type="text"
            placeholder="ช่องค้นหา...."
          />
          <button
            className="btn1"
            onClick={() => navigate(`CustomerCreatePage`)}
          >
            <h2>
              <BiPlus />
            </h2>
          </button>
        </div>

        <div class="table-body-Customer">
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
              </tr>
            </thead>
            <tbody>
              {records.map((item, index) => {
                return (
                  <tr key={index}>
                    <td
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={() => navigate(`CreateRead/${item.id_customer}`)}
                    >
                      {item.id_customer}
                    </td>
                    <td>{item.name_company}</td>
                    <td>{item.name_cus}</td>
                    <td>{item.card_ID}</td>
                    <td>{item.email_cus}</td>
                    <td>
                      <button
                        style={{
                          background: "blue",
                          color: "white",
                          borderRadius: "100px",
                          width: "40px",
                        }}
                      >
                        <FontAwesomeIcon icon={faCircleDown} />
                      </button>
                    </td>
                    <td>
                      <button
                        style={{
                          background: "blue",
                          color: "white",
                          borderRadius: "100px",
                          width: "40px",
                        }}
                      >
                        <FontAwesomeIcon icon={faCircleDown} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <nav>
            <ul className="pagination-Customer">
              <li className="page-item-Customer">
                <a href="#" className="page-link" onClick={prePage}>
                  ก่อน
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

export default Lot;
