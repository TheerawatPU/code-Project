import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../CSS/Stable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxArchive,
  faPenToSquare,
  faEye,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

function TabContent1() {
  //! การนำทางข้าม component
  const navigate = useNavigate();
  //! ..........................................

  //! โหลดข้อมูลจาก api เข้ามา
  const [data, setData] = useState([]);

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
  //! ..........................................

  //! ฟังก์ชั่นเลขหน้าจำนวนแถวในตาราง
  const [filterVal, setFilterVal] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);
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
          <p>วัตถุดิบ</p>
          <input
            className="inputsearch"
            type="text"
            placeholder="ช่องค้นหา...."
            value={filterVal}
            onInput={(e) => handleFilter(e)}
          />
          <button className="btnstable2" onClick={() => navigate(`StableNew`)}>
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
                <th>รหัส</th>
                <th>ชื่อวัตถุดิบ</th>
                <th>INCI Name</th>
                <th>จุดสั่งซื้อ</th>
                <th>ราคา</th>
                <th>คงเหลือ</th>

                <th
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  จัดการ
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
                    <td style={{ color: item.textColor }}>{item.amount_re}</td>

                    <td className="TDStable">
                      <button
                        className="btnstableRead2"
                        onClick={() =>
                          navigate(`Stabledetel/${item.id_staple}`)
                        }
                      >
                        <div className="icon_edit">
                          <FontAwesomeIcon icon={faEye} />
                        </div>
                        {/* <div className="test-icon-edit">ดูข้อมูล</div> */}
                      </button>
                      <button
                        onClick={() => navigate(`StableEdit/${item.id_staple}`)}
                        className="btnstableEdit2"
                      >
                        <div className="icon_edit">
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </div>
                        {/* <div className="test-icon-edit">แก้ไข</div> */}
                      </button>
                      <button
                        className="btnstableLot2"
                        onClick={() => navigate(`TableLot/${item.id_staple}`)}
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

export default TabContent1;
