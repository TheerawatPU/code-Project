import React, { useEffect, useState } from "react";
import MenuAD from "./ComponentAD/MenuAD";
import TopNavAD from "./ComponentAD/TopNavAD";
import { FaPen, FaEye } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import "./CSS/ComponentAD.css";
import "./CSS/Employee.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faEye,
  faPlus,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

import { Tooltip as ReactTooltip } from "react-tooltip";

function EmployeeReadPage() {
  const userLoginData = JSON.parse(sessionStorage.getItem("userlogin"));

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5500/employeeRead")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  //search
  const [data, setData] = useState([]);
  const [filterVal, setFilterVal] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);

  const handleFilter = (e) => {
    if (e.target.value == "") {
      setData(searchApiData);
    } else {
      const filterResult = searchApiData.filter(
        (item) =>
          item.department
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          item.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.sex.toLowerCase().includes(e.target.value.toLowerCase()) ||
          // -----------------
          item.birthday.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.phone.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.status.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.username.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.password.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.card_id.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.id_employee.toString().includes(e.target.value)
      );

      if (filterResult.length > 0) {
        setData(filterResult);
      } else {
        setData([
          {
            id_employee: "ไม่มีข้อมูล",
            department: "ไม่มีข้อมูล",
            title: "ไม่มีข้อมูล",
            name: "ไม่มีข้อมูล",
            sex: "ไม่มีข้อมูล",
            birthday: "ไม่มีข้อมูล",
            card_id: "ไม่มีข้อมูล",
            phone: "ไม่มีข้อมูล",
            status: "ไม่มีข้อมูล",
          },
        ]);
      }
    }
    setFilterVal(e.target.value);
  };
  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:5500/employeeRead")
        .then((res) => {
          setData(res.data);
          setSearchApiData(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
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
    <div className="all-page">
      <header className="header">
        <TopNavAD />
      </header>
      <section className="aside">
        <MenuAD />
      </section>

      <main className="main">
        <div className="area main C"></div>
        <div className="grup_btn">
          <p>พนักงาน</p>
          <input
            className="inputsearch"
            type="text"
            placeholder="ช่องค้นหา...."
            value={filterVal}
            onInput={(e) => handleFilter(e)}
          />
          <button className="btnstable2" onClick={() => navigate(`EMnew`)}>
            {/* <BiPlus /> */}
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
                <th>ตำแหน่ง</th>
                <th>คำนำหน้า</th>
                <th>ชื่อ</th>
                <th>เพศ</th>
                <th className="sss">วันเกิด</th>
                <th>บัตรประชาชน</th>
                <th>เบอร์โทรศัพท์</th>
                <th style={{ textAlign: "center" }}>สถานะการทำงาน</th>

                <th>แก้ไข</th>
              </tr>
            </thead>
            <tbody>
              {records.map((item, index) => {
                return (
                  <tr key={index}>
                    <td
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={() =>
                        navigate(`EmployeeReadIDPage/${item.id_employee}`)
                      }
                    >
                      {item.id_employee}
                    </td>
                    <td>{item.department}</td>
                    <td>{item.title}</td>
                    <td>{item.name}</td>
                    <td>{item.sex}</td>
                    <td>{item.birthday}</td>
                    <td>{item.card_id}</td>
                    <td>{item.phone}</td>
                    <td
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          background:
                            item.status === "กำลังทำงาน"
                              ? "#C6F1D6"
                              : "#F48484",
                          color:
                            item.status === "กำลังทำงาน"
                              ? "#099A97"
                              : "#B70404",
                          padding: "5px",
                          textAlign: "center",
                          borderRadius: "20px",
                          width: "70%",
                        }}
                      >
                        {item.status}
                      </div>
                    </td>
                    {/* <td>{item.status}</td> */}

                    <td>
                      <div className="TDB">
                        <button
                          data-tooltip-id="my-tooltip-1"
                          // style={{ backgroundColor: "#999" }}
                          style={{
                            fontSize: "18px",
                            height: "35px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "50px",
                            background: "#6499e9",
                          }}
                          className="btn2"
                          onClick={() =>
                            navigate(`EmployeeReadIDPage/${item.id_employee}`)
                          }
                        >
                          <div className="icon_edit">
                            <FontAwesomeIcon icon={faEye} />
                          </div>
                          {/* <h3>
                            <FaEye />
                          </h3> */}
                        </button>
                        {/* hint Button */}
                        <ReactTooltip
                          id="my-tooltip-1"
                          place="bottom"
                          content="ดูข้อมูล"
                          style={{
                            backgroundColor: "#0000005b",
                            borderRadius: "15px",
                            marginTop: "12px",
                          }}
                        />
                        <button
                          data-tooltip-id="my-tooltip-2"
                          style={{
                            fontSize: "18px",
                            height: "35px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "50px",
                            background: "#353ffd",
                          }}
                          onClick={() => navigate(`EMUP/${item.id_employee}`)}
                          className="btn3"
                        >
                          <div
                            className="icon_edit"
                            style={{ fontSize: "18px" }}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </div>
                        </button>
                        {/* hint Button */}
                        <ReactTooltip
                          id="my-tooltip-2"
                          place="bottom"
                          content="แก้ไข"
                          style={{
                            backgroundColor: "#0000005b",
                            borderRadius: "15px",
                            marginTop: "12px",
                          }}
                        />
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

export default EmployeeReadPage;
