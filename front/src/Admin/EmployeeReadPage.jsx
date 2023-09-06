import React, { useEffect, useState } from "react";
import MenuAD from "./ComponentAD/MenuAD";
import TopNavAD from "./ComponentAD/TopNavAD";
import { FaPen, FaEye } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import "./CSS/ComponentAD.css";
import "./CSS/Employee.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
          item.line_id.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.facebook_id
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          item.username.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.password.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.card_id.toLowerCase().includes(e.target.value.toLowerCase())
        // item.id_customer.toLowerCase().includes(e.target.value.toLowerCase())
      );

      if (filterResult.length > 0) {
        setData(filterResult);
      } else {
        setData([
          {
            department: "ไม่มีข้อมูล",
            title: "ไม่มีข้อมูล",
            name: "ไม่มีข้อมูล",
            sex: "ไม่มีข้อมูล",
            birthday: "ไม่มีข้อมูล",
            card_id: "ไม่มีข้อมูล",
            phone: "ไม่มีข้อมูล",
            line_id: "ไม่มีข้อมูล",
            facebook_id: "ไม่มีข้อมูล",
            username: "ไม่มีข้อมูล",
            password: "ไม่มีข้อมูล",
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
          <button className="btn1" onClick={() => navigate(`EmployeeAddPage`)}>
            <h2>
              <BiPlus />
            </h2>
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
                <th>ไอดีไลน์</th>
                <th>ชื่อเฟสบุ๊ค</th>
                <th>ชื่อบัญชี</th>
                <th>รหัสผ่าน</th>

                <th>แก้ไข</th>
              </tr>
            </thead>
            <tbody>
              {records.map((item, index) => {
                return (
                  <tr key={index}>
                    <td
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={() => navigate(`CreateRead/${item.id_employee}`)}
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
                    <td>{item.line_id}</td>
                    <td>{item.facebook_id}</td>
                    <td>{item.username}</td>
                    <td>{item.password}</td>

                    <td>
                      <div className="TDB">
                        <button
                          className="btn2"
                          onClick={() =>
                            navigate(`EmployeeUpdatePage/${item.id_employee}`)
                          }
                        >
                          <h3>
                            <FaEye />
                          </h3>
                        </button>
                        <button
                          onClick={() =>
                            navigate(`EmployeeUpdatePage/${item.id_employee}`)
                          }
                          className="btn3"
                        >
                          <h3>
                            <FaPen />
                          </h3>
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
