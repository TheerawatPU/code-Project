import React, { useEffect, useState } from "react";
import { FaPen, FaEye } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../../../CSS/Stable.css";

function TabContent1() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5500/stable")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const [filterVal, setFilterVal] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:5500/stable")
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
      <div className="grup_btn">
        <p>วัตถุดิบ</p>
        <input
          className="inputsearch"
          type="text"
          placeholder="ช่องค้นหา...."
          value={filterVal}
          onInput={(e) => handleFilter(e)}
        />
        <button
          className="btnstable"
          onClick={() => navigate(`CustomerCreatePage`)}
        >
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
              <th>ชื่อวัตถุดิบ</th>
              <th>ชื่อINCIANME</th>
              <th>จุดสั่งซื้อ</th>
              <th>ราคา</th>
              <th >คงเหลือ</th>

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
                    onClick={() => navigate(`..//StableReadIDPage/${item.id_staple}`)}
                  >
                    {item.id_staple}
                  </td>
                  <td>{item.Name_staple}</td>
                  <td>{item.Name_INCIname}</td>
                  <td>{item.reOrder}</td>
                  <td>{item.cost}</td>
                  <td>{item.amount}</td>

                  <td className="TDStable">
                    <button
                      className="btnstableRead"
                      onClick={() =>
                        navigate(`..//StableReadIDPage/${item.id_staple}`)
                      }
                    >
                      <h3>
                        <FaEye />
                      </h3>
                    </button>
                    <button
                      onClick={() =>
                        navigate(`CustomerUpdatePage/${item.id_staple}`)
                      }
                      className="btnstableEdit"
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
          <ul className="pagination-stable">
            <li className="page-item-stable">
              <a href="#" className="page-link" onClick={prePage}>
                ก่อน
              </a>
            </li>
            {number.map((n, i) => (
              <li
                className={`page-item-stable ${currentPage === n ? "active" : ""}`}
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
    </div>
  );
}

export default TabContent1;