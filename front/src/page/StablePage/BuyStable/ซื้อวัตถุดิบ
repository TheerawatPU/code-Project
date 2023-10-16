import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../CSS/lot.css";
import { FaPen, FaEye } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";

import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxArchive,
  faPlus,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

function TabContent2() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const [filterVal, setFilterVal] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:5500/stapleRead")
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
          //   item.id_staple
          //     .toLowerCase()
          //     .includes(e.target.value.toLowerCase()) ||
          item.Name_staple.toLowerCase().includes(
            e.target.value.toLowerCase()
          ) ||
          item.Name_INCIname.toLowerCase().includes(
            e.target.value.toLowerCase()
          ) ||
          item.reOrder.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.cost.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.amount.toLowerCase().includes(e.target.value.toLowerCase())

        // item.id_customer.toLowerCase().includes(e.target.value.toLowerCase())
      );

      if (filterResult.length > 0) {
        setData(filterResult);
      } else {
        setData([
          {
            id_staple: "ไม่มีข้อมูล",
            Name_staple: "ไม่มีข้อมูล",
            Name_INCIname: "ไม่มีข้อมูล",
            reOrder: "ไม่มีข้อมูล",
            cost: "ไม่มีข้อมูล",
            amount: "ไม่มีข้อมูล",
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
      <main className="main-stable ">
        <div className="grup_btn">
          <p>รายการสั่งซื้อวัตถุดิบ</p>
          <input
            className="inputsearch"
            type="text"
            placeholder="ช่องค้นหา...."
            value={filterVal}
            onInput={(e) => handleFilter(e)}
          />
          <button
            className="btnstable2"
            onClick={() => navigate(`BuyStableNew`)}
          >
            <div>
              <FontAwesomeIcon icon={faPlus} />
            </div>
            <div>เพิ่ม</div>
          </button>
          {/* <button
            className="btnstable"
            onClick={() => navigate(`BuyStableNew`)}
          >
            <h2>
              <BiPlus />
            </h2>
          </button> */}
        </div>

        <div class="table-body">
          <table class="styled-table">
            <thead>
              <tr>
                <th>รหัสรายการสั่งซื้อ</th>
                <th>ร้านที่สั่งซื้อ</th>
                <th>วันที่สั่งซื้อ</th>
                <th>วันที่รับวัตถุดิบ</th>
                <th>รหัสอ้างอิง</th>
                <th>ยอดรวม</th>
                <th>ยืนยันวัตถุดิบ</th>

                <th
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  ชื่อผู้บันทึก
                </th>
              </tr>
            </thead>
            <tbody>
              {records.map((item, index) => {
                return (
                  <tr key={index}>
                    <td
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={() => navigate(`Stabledetel/${item.id_staple}`)}
                    >
                      {item.id_staple}
                    </td>

                    <td style={{ color: item.textColor }}>
                      {item.Name_staple}
                    </td>
                    {/* <td>{item.Name_INCIname}</td> */}
                    <td style={{ color: item.textColor }}>
                      {item.Name_INCIname}
                    </td>
                    <td style={{ color: item.textColor }}>{item.reOrder}</td>
                    <td style={{ color: item.textColor }}>{item.cost}</td>
                    <td style={{ color: item.textColor }}>{item.amount}</td>

                    <td className="TDStable">
                      <button
                        className="btnstableRead"
                        onClick={() =>
                          navigate(`Stabledetel/${item.id_staple}`)
                        }
                      >
                        <h3>
                          <FaEye />
                        </h3>
                      </button>
                      <button
                        onClick={() => navigate(`StableEdit/${item.id_staple}`)}
                        className="btnstableEdit"
                      >
                        <h3>
                          <FaPen />
                        </h3>
                      </button>
                      <button
                        className="btnstableLot"
                        // onClick={() => navigate(`TableLot/${item.id_staple}`)}
                        onClick={() => navigate(`TableLot/${item.id_staple}`)}

                        // onClick={() => navigate(`TableLot/${item.id_staple}`)}
                      >
                        <h3>
                          <FontAwesomeIcon icon={faBoxArchive} />
                        </h3>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <nav>
            <ul className="pagination-stable">
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
                  <a
                    href="#"
                    className="page-link"
                    onClick={() => changeCPage(n)}
                  >
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
        </div>
      </main>
    </div>
  );
}

export default TabContent2;
