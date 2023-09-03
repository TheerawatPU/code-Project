import React, { useState, useEffect } from "react";
import axios from "axios";
import Topnav from "../../../component/Topnav";
import Menu from "../../../component/Menu";
import TabContent2 from "./TabContent2";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function AddLot() {
  const userLoginData = JSON.parse(sessionStorage.getItem("userlogin"));
  //   const location = useLocation();
  //   const selectedCategory = location.state.selectedCategory;
  //   const { selectedCategory, selectedCategoryName } = location.state;

  const location = useLocation();
  const { selectedCategory, selectedCategoryName } = location.state; // รับข้อมูลที่ส่งมาจากหน้า TabContent2
  const navigate = useNavigate();

  const [values, setValues] = useState({
    expiration_date: "",
    cost: "",
    amount: "",
    amount_re: "",
    COA_name: "",
    MSDS_name: "",
    id_staple: selectedCategory,
    // id_staple: selectedCategory ? selectedCategory.id_staple : "",

    id_employee: `${userLoginData[0].id_employee}`,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:5500/LotNew", {
        ...values,
        // id_staple: selectedCategory,
      })
      .then((res) => {
        console.log(res);
        navigate("/EM/StablePage");
      })
      .catch((err) => console.log(err));
  };

  //   const handleInput = (event) => {
  //     const { name, value } = event.target;

  //     setValues((prev) => ({ ...prev, [name]: value }));
  //   };
  const handleInput = (event) => {
    const { name, value } = event.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  console.log(values);

  return (
    <div>
      <div className="all-page">
        <header className="header">
          <Topnav />
        </header>
        <section className="aside">
          <Menu />
        </section>
        <main className="main">
          <div className="top-text-new">
            <div className="text-new">
              {/* เพิ่มข้อมูลล็อตของ {selectedCategory.Name_staple} */}
              เพิ่มข้อมูลล็อต
            </div>
          </div>

          <div className="text-new-lg">
            กรุณากรอกข้อมูลให้ครบทุกช่อง ถ้าไม่มีให้ใส่เครื่องหมาย - ไว้
          </div>

          <div className="box-big-bg-new">
            <div className="box-BG-area-new">
              <form className="form-stable-new" onSubmit={handleSubmit}>
                <div className="form-row-new">
                  <label className="form-label-new">
                    <p>*</p>วันหมดอายุ :
                  </label>
                  <input
                    name="expiration_date"
                    type="date"
                    className="form-input-new"
                    onChange={handleInput}
                  />
                </div>
                <div className="form-row-new">
                  <label className="form-label-new">
                    <p>*</p>ราคา :
                  </label>
                  <input
                    name="cost"
                    type="text"
                    className="form-input-new"
                    onChange={handleInput}
                  />
                </div>
                <div className="form-row-new">
                  <label className="form-label-new">
                    <p>*</p>ปริมาณ :
                  </label>
                  <input
                    name="amount"
                    type="text"
                    className="form-input-new"
                    onChange={handleInput}
                  />
                </div>
                <div className="form-row-new">
                  <label className="form-label-new">
                    <p>*</p>ปริมาณคงเหลือ :
                  </label>
                  <input
                    name="amount_re"
                    type="text"
                    className="form-input-new"
                    onChange={handleInput}
                  />
                </div>

                <div className="form-row-new">
                  <label className="form-label-new">
                    <p>*</p>COA :
                  </label>
                  <textarea
                    name="COA_name"
                    type="text"
                    className="form-input-new2"
                    onChange={handleInput}
                  />
                </div>

                <div className="form-row-new">
                  <label className="form-label-new">
                    <p>*</p>MSDS :
                  </label>
                  <textarea
                    name="MSDS_name"
                    type="text"
                    className="form-input-new2"
                    onChange={handleInput}
                  />
                </div>

                {/* <div className="form-row-new">
                  <label className="form-label-new">
                    <p>*</p>จุดสั่งซื้อ :
                  </label>
                  <input
                    name="reOrder"
                    type="text"
                    className="form-input-new"
                    onChange={handleInput}
                  />
                </div> */}
              </form>
            </div>

            <div className="btn-submit-new">
              <div className="btn-area-new">
                <button
                  type="cancle"
                  className="cancle-new"
                  onClick={() => navigate(-1)}
                >
                  <FontAwesomeIcon icon={faXmark} />
                  <span>ยกเลิก</span>
                </button>
                <button
                  type="submit"
                  className="submit-new"
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                >
                  <FontAwesomeIcon icon={faFloppyDisk} />
                  <span>บันทึก</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AddLot;
