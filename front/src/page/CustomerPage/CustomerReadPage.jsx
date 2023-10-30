import React, { useEffect, useState } from "react";
import { FaPen, FaEye } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Topnav from "../../component/Topnav";
import Menu from "../../component/Menu";
import "../../CSS/button.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faEye,
  faPlus,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

import { Tooltip as ReactTooltip } from "react-tooltip";

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

  const [showHintEdit, setShowHintEdit] = useState({});
  const [showHintRead, setShowHintRead] = useState({});
  const [showHintLot, setShowHintLot] = useState({});
  const handleMouseEnterEdit = (id) => {
    setShowHintEdit((prevShowHint) => ({ ...prevShowHint, [id]: true }));
  };
  const handleMouseLeaveEdit = (id) => {
    setShowHintEdit((prevShowHint) => ({ ...prevShowHint, [id]: false }));
  };
  const handleMouseEnterRead = (id) => {
    setShowHintRead((prevShowHint) => ({ ...prevShowHint, [id]: true }));
  };
  const handleMouseLeaveRead = (id) => {
    setShowHintRead((prevShowHint) => ({ ...prevShowHint, [id]: false }));
  };
  const handleMouseEnterLot = (id) => {
    setShowHintLot((prevShowHint) => ({ ...prevShowHint, [id]: true }));
  };
  const handleMouseLeaveLot = (id) => {
    setShowHintLot((prevShowHint) => ({ ...prevShowHint, [id]: false }));
  };

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
                const showHintEditButton =
                  showHintEdit[item.id_staple] || false;
                const showHintReadButton =
                  showHintRead[item.id_staple] || false;
                const showHintLotButton = showHintLot[item.id_staple] || false;

                return (
                  <tr key={index}>
                    <td
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={() =>
                        navigate(`CustomerReadIDPage/${item.id_customer}`)
                      }
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
                          data-tooltip-id="my-tooltip-1"
                          className="btnstableRead2"
                          onClick={() =>
                            navigate(`CustomerReadIDPage/${item.id_customer}`)
                          }
                          // onMouseEnter={() =>
                          //   handleMouseEnterRead(item.id_staple)
                          // }
                          // onMouseLeave={() =>
                          //   handleMouseLeaveRead(item.id_staple)
                          // }
                        >
                          <div className="icon_edit">
                            <FontAwesomeIcon icon={faEye} />
                          </div>

                          <ReactTooltip
                            id="my-tooltip-1"
                            place="bottom"
                            content="ดูข้อมูล"
                            style={{
                              backgroundColor: "#0000005b",
                              borderRadius: "15px",
                              marginTop: "10px",
                            }}
                          />

                          {/* {showHintReadButton && (
                            <div className="hint-button-popup5">ดูข้อมูล</div>
                          )} */}
                        </button>

                        <button
                          id="my-tooltip-20"
                          onClick={() =>
                            navigate(`CustomerUpdatePage/${item.id_customer}`)
                          }
                          className="btnstableEdit2"
                          // onMouseEnter={() =>
                          //   handleMouseEnterRead(item.id_customer)
                          // }
                          // onMouseLeave={() =>
                          //   handleMouseLeaveRead(item.id_customer)
                          // }
                        >
                          <ReactTooltip
                            id="my-tooltip-20"
                            place="bottom"
                            content="แก้ไข"
                            style={{
                              backgroundColor: "#0000005b",
                              borderRadius: "15px",
                              marginTop: "10px",
                            }}
                          />

                          <div className="icon_edit">
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </div>

                          {/* {showHintReadButton && (
                            <div className="hint-button-popup6">
                              แก้ไขข้อมูล
                            </div>
                          )} */}
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
