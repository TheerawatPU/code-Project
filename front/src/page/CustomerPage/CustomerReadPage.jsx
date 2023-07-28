import React, { useEffect, useState } from "react";
import { FaPen, FaEye } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../../CSS/Customer.css";

function CustomerReadPage() {
  const navigate = useNavigate();

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
          item.address.toLowerCase().includes(e.target.value.toLowerCase())
        // item.id_customer.toLowerCase().includes(e.target.value.toLowerCase())
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
    <div>
      <div className="grup_btn">
        <p>ลูกค้า</p>
        <input
          className="inputsearch"
          type="text"
          placeholder="ช่องค้นหา...."
          value={filterVal}
          onInput={(e) => handleFilter(e)}
        />
        <button className="btn1" onClick={() => navigate(`CustomerCreatePage`)}>
          <h2>
            <BiPlus />
          </h2>
        </button>
      </div>

      <div class="table-body">
        <table class="styled-table">
          <thead>
            <tr>
              <th>รหัส</th>
              <th>ชื่อบริษัท</th>
              <th>ชื่อลูกค้า</th>
              <th>รหัสบัตรประชาชน</th>
              <th>อีเมล</th>
              <th className="sss">เบอร์โทรศัพท์</th>
              <th>ที่อยู่</th>

              <th
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                แก้ไข
              </th>
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
                  <td>{item.phone_cus}</td>
                  <td>{item.address}</td>

                  <td className="TDB">
                    <button
                      className="btn2"
                      onClick={() => navigate(`CustomerReadIDPage/${item.id_customer}`)}
                    >
                      <h3>
                        <FaEye />
                      </h3>
                    </button>
                    <button
                      onClick={() => navigate(`CustomerUpdatePage/${item.id_customer}`)}
                      className="btn3"
                    >
                      <h3>
                        <FaPen />
                      </h3>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <nav>
          <ul className="pagination">
            <li className="page-item">
              <a href="#" className="page-link" onClick={prePage}>
                ก่อน
              </a>
            </li>
            {number.map((n, i) => (
              <li
                className={`page-item ${currentPage === n ? "active" : ""}`}
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
            <li className="page-item">
              <a href="#" className="page-link" onClick={nextPage}>
                ต่อไป
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default CustomerReadPage;
