import React, { useEffect, useState } from "react";
import { FaPen, FaEye } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Topnav from "../../component/Topnav";
import Menu from "../../component/Menu";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faEye,
  faPlus,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

function CustomerReadPage() {
  // การนำทางข้ามคอมโพเน้น
  const navigate = useNavigate();

  // ดึง api มา
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5500/customer")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  //search
  const [filterVal, setFilterVal] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:5500/customer")
        .then((res) => {
          setData(res.data);
          setSearchApiData(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);

  const handleFilter = (e) => {
    if (e.target.value == "") {
      setData(searchApiData);
    } else {
      const filterResult = searchApiData.filter(
        (item) =>
          item.name_company
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          item.name_cus.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.card_ID.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.email_cus.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.phone_cus.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.address.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.id_customer.toString().includes(e.target.value)
      );

      if (filterResult.length > 0) {
        setData(filterResult);
      } else {
        setData([
          {
            name_company: "ไม่มีข้อมูล",
            name_cus: "ไม่มีข้อมูล",
            card_ID: "ไม่มีข้อมูล",
            email_cus: "ไม่มีข้อมูล",
            phone_cus: "ไม่มีข้อมูล",
            address: "ไม่มีข้อมูล",
          },
        ]);
      }
    }
    setFilterVal(e.target.value);
  };

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
    <div className="all-page">
      <header className="header">
        <Topnav />
      </header>
      <section className="aside">
        <Menu />
      </section>

      <main className="main">
        <div className="area main C"></div>
        <div className="grup_btn">
          <p>ลูกค้า</p>
          <input
            className="inputsearch"
            type="text"
            placeholder="ช่องค้นหา...."
            value={filterVal}
            onInput={(e) => handleFilter(e)}
          />

          <button
            className="btnstable2"
            onClick={() => navigate(`CustomerCreatePage`)}
          >
            <div>
              <FontAwesomeIcon icon={faPlus} />
            </div>
            <div>เพิ่ม</div>
          </button>
        </div>

        <div class="table-body-Customer">
          <table class="styled-table-Customer">
            <thead>
              <tr>
                <th>รหัส</th>
                <th>ชื่อบริษัท</th>
                <th>ชื่อลูกค้า</th>
                <th>บัตรประชาชน</th>
                <th>อีเมล</th>
                <th className="sss">เบอร์โทรศัพท์</th>
                <th>ที่อยู่</th>

                <th>แก้ไข</th>
              </tr>
            </thead>
            <tbody>
              {records.map((item, index) => {
                return (
                  <tr key={index}>
                    <td
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={() => navigate(`CustomerReadIDPage/${item.id_customer}`)}
                    >
                      {item.id_customer}
                    </td>
                    <td>{item.name_company}</td>
                    <td>{item.name_cus}</td>
                    <td>{item.card_ID}</td>
                    <td>{item.email_cus}</td>
                    <td>{item.phone_cus}</td>
                    <td>{item.address}</td>

                    <td>
                      <div className="TDB">
                        <button
                          className="btnstableRead2"
                          onClick={() =>
                            navigate(`CustomerReadIDPage/${item.id_customer}`)
                          }
                        >
                          <div className="icon_edit">
                            <FontAwesomeIcon icon={faEye} />
                          </div>
                          {/* <div className="test-icon-edit">ดูข้อมูล</div> */}
                        </button>

                        <button
                          onClick={() =>
                            navigate(`CustomerUpdatePage/${item.id_customer}`)
                          }
                          className="btnstableEdit2"
                        >
                          <div className="icon_edit">
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </div>
                          {/* <div className="test-icon-edit">แก้ไข</div> */}
                        </button>
                      </div>
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

export default CustomerReadPage;
