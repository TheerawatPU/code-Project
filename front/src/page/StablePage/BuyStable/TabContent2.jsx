import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../CSS/lot.css";
import { FaPen, FaEye } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import AddLot from "./AddLot";
import { useNavigate } from "react-router-dom";

function TabContent2() {
  const [itemss, setItemss] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tableData, setTableData] = useState([]);

  console.log("itemss", itemss);

  // const select_nameStable = (e) => {
  //   const selectedId = e.target.value;
  //   setSelectedCategory(selectedId);
  // };

  const select_nameStable = (e) => {
    const selectedId = e.target.value;
    setSelectedCategory(selectedId);
  };

  console.log("selectedCategory", selectedCategory);

  // function handleAddLotClick() {
  //   // แก้ตรงนี้
  //   // navigate(`/EM/StablePage/AddLot`, { state: { selectedCategory } });
  //   navigate(`/EM/StablePage/AddLot`, { state: { selectedCategory, selectedCategoryName: e.target.options[e.target.selectedIndex].text } });
  // }

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5500/lotReadSelect")
  //     .then((res) => setItemss(res.data))
  //     .catch((err) => console.log(err));
  // }, []);

  function handleAddLotClick() {
    // ส่งข้อมูลไปหน้า AddLot
    navigate(`/EM/StablePage/AddLot`, {
      state: {
        selectedCategory,
        selectedCategoryName: itemss.find(
          (item) => item.id_staple === selectedCategory
        )?.Name_staple,
      },
    });
  }

  useEffect(() => {
    axios
      .get("http://localhost:5500/lotReadSelect")
      .then((res) => setItemss(res.data))
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   if (selectedCategory) {
  //     fetch(`http://localhost:5500/lotTable/${selectedCategory}`)
  //       .then((response) => response.json())
  //       .then((data) => setTableData(data))
  //       .catch((error) => console.error("Error fetching table data:", error));
  //   } else {
  //     setTableData([]); // รีเซ็ตข้อมูลเมื่อไม่มี category ที่ถูกเลือก
  //   }
  // }, [selectedCategory]);

  // useEffect(() => {
  //   if (selectedCategory) {
  //     fetch(`http://localhost:5500/lotTable/${selectedCategory}`)
  //       .then((response) => response.json())
  //       .then((data) => setTableData(data))
  //       .catch((error) => console.error("Error fetching table data:", error));
  //   } else {
  //     setTableData([]);
  //   }
  // }, [selectedCategory]);

  useEffect(() => {
    if (selectedCategory) {
      fetch(`http://localhost:5500/lotTable/${selectedCategory}`)
        .then((response) => response.json())
        .then((data) => setTableData(data))
        .catch((error) => console.error("Error fetching table data:", error));
    } else {
      setTableData([]);
    }
  }, [selectedCategory]);

  console.log("tableData", tableData);

  const navigate = useNavigate();
  //next page555555
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 9;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = tableData.slice(firstIndex, lastIndex);
  const npage = Math.ceil(tableData.length / recordsPerPage);
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

  // console.log("Data" , )

  return (
    <div>
      <main className="main-stable ">
        <div className="lot-text-header">ล็อตวัตถุดิบ</div>

        <div className="grup_btn-lot">
          <div className="select-show">
            <div style={{ color: "black" }}>เลือกวัตถุดิบ : </div>
            <select
              className="select-stable-showtable"
              // value={selectedCategory}
              // onChange={(e) => setSelectedCategory(e.target.value)}
              // onChange={(e) => select_nameStable(e)}
              value={selectedCategory}
              onChange={(e) => select_nameStable(e)}
            >
              <option value="">เลือกวัตถุดิบ</option>
              {itemss.map((item) => (
                <option key={item.id} value={item.id_staple}>
                  {item.Name_staple}
                </option>
              ))}
            </select>
          </div>
          <p>ปริมาณที่มีทั้งหมด</p>
          <div className="numberSUM">
            <input
              type="text"
              style={{ width: "100px", height: "50px" }}
              disabled
              value={tableData.reduce(
                (sum, student) => sum + student.amount,
                0
              )}
            />
          </div>
          <div className="seact-lot">
            <input
              className="inputsearch-lot"
              type="text"
              placeholder="ช่องค้นหา...."
            />
            <button className="btn-lot-seact">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>

          {/* <button className="btnstable" onClick={() => navigate(`StableNew`)}>
            <h2>
              <BiPlus />
            </h2>
          </button> */}
          <button className="btnstable" onClick={handleAddLotClick}>
            <h2>
              <BiPlus />
            </h2>
          </button>
        </div>

        <div class="table-body-lot">
          <table class="styled-table-lot">
            <thead>
              <tr>
                <th>รหัสล็อต</th>
                <th>วันหมดอายุ</th>
                <th>ราคา</th>
                <th>ปริมาณ</th>
                <th>ปริมาณคงเหลือ </th>
                {/* <th>ผลรวม </th> */}

                <th>COA</th>
                <th>MSDS</th>
                <th>ผู้บันทึก</th>
              </tr>
            </thead>
            <tbody>
              {records.map((data) => (
                <tr>
                  <td
                    style={{ color: "blue", cursor: "pointer" }}
                    // onClick={() => navigate(`Stabledetel/${item.id_staple}`)}
                  >
                    {data.id_lot}
                  </td>
                  <td>{data.expiration_date}</td>
                  <td>{data.cost}</td>
                  <td>{data.amount}</td>
                  <td>{data.amount_re}</td>
                  {/* <td>{data.amount_re - data.amount}</td> */}
                  <td className="td-lot">
                    <button className="btnstableRead">
                      <h3>
                        <FaEye />
                      </h3>
                    </button>
                  </td>
                  <td className="td-lot">
                    <button className="btnstableRead">
                      <h3>
                        <FaEye />
                      </h3>
                    </button>
                  </td>
                  <td>{data.name }</td>

                  {/* <td className="TDStable">{data.cost}</td>
                  <td className="TDStable">{data.cost}</td> */}
                </tr>
              ))}
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

export default TabContent2;
