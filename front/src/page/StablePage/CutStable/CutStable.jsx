import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../CSS/Stable.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEye,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

function CutStable() {
  //! การนำทางข้าม component
  const navigate = useNavigate();
  //! ..........................................

  //! โหลดข้อมูลจาก api เข้ามา
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:5500/table_cutStock")
        .then((res) => {
          setData(res.data);
          setSearchApiData(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);

  //! ฟังก์ชั่นเลขหน้าจำนวนแถวในตาราง
  const [filterVal, setFilterVal] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);

  const handleFilter = (e) => {
    if (e.target.value == "") {
      setData(searchApiData);
    } else {
      const filterResult = searchApiData.filter(
        (item) =>
          item.date_cutStock
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          item.Name_staple.toLowerCase().includes(
            e.target.value.toLowerCase()
          ) ||
          item.id_lot.toString().includes(e.target.value.toString()) ||
          item.amount_old.toString().includes(e.target.value.toString()) ||
          item.amount_total.toString().includes(e.target.value.toString()) ||
          item.cause.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.details_cutStock
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.id_cutStock.toString().includes(e.target.value)
      );

      if (filterResult.length > 0) {
        setData(filterResult);
      } else {
        setData([
          {
            date_cutStock: "ไม่มีข้อมูล",
            Name_staple: "ไม่มีข้อมูล",
            id_lot: "ไม่มีข้อมูล",
            amount_old: "ไม่มีข้อมูล",
            amount_total: "ไม่มีข้อมูล",
            cause: "ไม่มีข้อมูล",
            details_cutStock: "ไม่มีข้อมูล",
            name: "ไม่มีข้อมูล",
            id_cutStock: "ไม่มีข้อมูล",
          },
        ]);
      }
    }
    setFilterVal(e.target.value);
  };
  //! ..........................................

  //! ฟังก์ชั่นเลขหน้าจำนวนแถวในตาราง
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const number = [...Array(npage + 1).keys()].slice(1);
  // todo1 ฟังก์ชั่นเลขเพจก่อนหน้าแรก
  function prePage() {
    if (currentPage < firstIndex) {
      setCurrentPage(currentPage - 1);
    } else if (currentPage === firstIndex) {
      setCurrentPage(changeCPage + 0);
    }
  }
  // todo1 ฟังก์ชั่นเลขเพจทั้งหมด
  function changeCPage(id) {
    setCurrentPage(id);
  }
  // todo1 ฟังก์ชั่นเลขเพจสุดท้าย
  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }
  //! ..................

  return (
    <div>
      <main className="main-stable ">
        <div className="grup_btn">
          <p>รายการปรับสต๊อก</p>
          <input
            className="inputsearch"
            type="text"
            placeholder="ช่องค้นหา...."
            value={filterVal}
            onInput={(e) => handleFilter(e)}
          />

          <button
            className="btnstable2"
            onClick={() => navigate(`CusStableNew`)}
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
                <th>รหัสการปรับ</th>
                <th>วันที่ทำการ</th>
                <th>ชื่อวัตถุดิบ</th>
                <th>รหัสล็อต</th>
                <th>จำนวนก่อนปรับ(กรัม)</th>
                <th>จำนวนที่ปรับ(กรัม)</th>
                <th>สาเหตุการปรับ</th>
                <th>รายละเอียด</th>
                <th>ผู้บันทึก</th>

                <th
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  ดูรายละเอียด
                </th>
              </tr>
            </thead>

            <tbody>
              {records.map((item, index) => (
                <tr key={index}>
                  <td
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() =>
                      navigate(`CusStableReadID/${item.id_cutStock}`)
                    }
                  >
                    {item.id_cutStock}
                  </td>
                  <td>{item.date_cutStock}</td>
                  <td>{item.Name_staple}</td>
                  <td>{item.id_lot}</td>
                  <td>{item.amount_old}</td>
                  <td>{item.amount_total}</td>
                  <td>
                    <div className="text-cutstable">{item.cause}</div>
                  </td>
                  <td>{item.details_cutStock}</td>
                  <td>{item.name}</td>

                  <td className="TDStable">
                    <button
                      className="btnstableRead2"
                      onClick={() =>
                        navigate(`CusStableReadID/${item.id_cutStock}`)
                      }
                    >
                      <div className="icon_edit">
                        <FontAwesomeIcon icon={faEye} />
                      </div>
                      {/* <div className="test-icon-edit">ดูข้อมูล</div> */}
                    </button>
                  </td>
                </tr>
              ))}
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

export default CutStable;
