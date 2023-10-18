import React, { useEffect, useState } from "react";
import { FaPen, FaEye } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faEye,
  faPlus,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

function TabContent2() {
  // ดึงข้อมูลผู้บันทึกที่เข้าระบบตอนนั้น
  const userLoginData = JSON.parse(sessionStorage.getItem("userlogin"));

  // ตัวใช้สำหรับการลิงค์ข้าม component
  const navigate = useNavigate();

  //   state สำหรับเก็บข้อมูลที่ได้ทำการโหลดมา
  const [data, setData] = useState([]);

  //   โหลดข้อมูลมาใส่ไว้ใน component นี้
  useEffect(() => {
    axios
      .get("http://localhost:5500/buystableRead")
      .then((res) => {
        setData(res.data);
        setSearchApiData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //ตัวแปรสำหรับใช้การกดเลขถัดไปของหน้าจอ
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const number = [...Array(npage + 1).keys()].slice(1);

  //   ข้อมูลก่อนหน้า
  function prePage() {
    if (currentPage < firstIndex) {
      setCurrentPage(currentPage - 1);
    } else if (currentPage === firstIndex) {
      setCurrentPage(changeCPage + 0);
    }
  }

  //   ตัวเลขข้อมูล
  function changeCPage(id) {
    setCurrentPage(id);
  }

  //   ข้อมูลถัดไป
  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  //! ฟังก์ชั่นเลขหน้าจำนวนแถวในตาราง
  const [filterVal, setFilterVal] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);

  const handleFilter = (e) => {
    if (e.target.value == "") {
      setData(searchApiData);
    } else {
      const filterResult = searchApiData.filter(
        (item) =>
          item.store.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.day_buy.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.refer_id.toString().includes(e.target.value.toString()) ||
          item.day_admit_staple
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.id_buylist.toString().includes(e.target.value)
      );

      if (filterResult.length > 0) {
        setData(filterResult);
      } else {
        setData([
          {
            id_buylist: "ไม่มีข้อมูล",
            store: "ไม่มีข้อมูล",
            day_buy: "ไม่มีข้อมูล",
            day_admit_staple: "ไม่มีข้อมูล",
            refer_id: "ไม่มีข้อมูล",
            name: "ไม่มีข้อมูล",
          },
        ]);
      }
    }
    setFilterVal(e.target.value);
  };
  //! ..........................................

  return (
    <div>
      <main className="main-stable ">
        <div className="grup_btn">
          <p>รายการผลิต</p>
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
        </div>

        <div class="table-body">
          <table class="styled-table">
            <thead>
              <tr>
                <th>รหัสการสั่งซื้อ</th>
                <th>ร้านที่สั่งซื้อ</th>
                <th>วันที่สั่งซื้อ</th>
                <th>วันที่รับวัตถุดิบ</th>
                <th>รหัสอ้างอิง </th>

                {/* <th>ยอดรวม</th>
                <th>ยืนยันวัตถุดิบ</th> */}
                <th>ผู้บันทึก</th>

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
                      onClick={() =>
                        navigate(`BuyStableRead/${item.id_buylist}`)
                      }
                    >
                      {item.id_buylist}
                    </td>
                    <td>
                      <b>{item.store}</b>
                    </td>
                    <td>{item.day_buy}</td>
                    <td>{item.day_admit_staple}</td>
                    <td>{item.refer_id}</td>
                    {/* <td>{item.total_cost}</td> */}

                    {/* <td>ยืนยันแล้ว</td> */}
                    <td>{item.name}</td>

                    <td className="TDStable">
                      <button
                        className="btnstableRead2"
                        onClick={() =>
                          navigate(`BuyStableRead/${item.id_buylist}`)
                        }
                      >
                        <div className="icon_edit">
                          <FontAwesomeIcon icon={faEye} />
                        </div>
                        {/* <div className="test-icon-edit">ดูข้อมูล</div> */}
                      </button>

                      <button
                        onClick={() => navigate(`StableEdit/$`)}
                        className="btnstableEdit2"
                      >
                        <div className="icon_edit">
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </div>
                        {/* <div className="test-icon-edit">แก้ไข</div> */}
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
