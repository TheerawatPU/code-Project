import React, { useEffect, useState } from "react";
import axios from "axios";
import Topnav from "../../../component/Topnav";
import Menu from "../../../component/Menu";
import "../../../CSS/Stable.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FaPen, FaEye } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

function BuyStableNew() {
  const userLoginData = JSON.parse(sessionStorage.getItem("userlogin"));
  const navigate = useNavigate();

  const [values, setValues] = useState({
    Name_staple: "",
    Name_INCIname: "",
    howUsing: "",
    howMixing: "",
    saving: "",
    melting: "",
    reOrder: "",
    id_employee: `${userLoginData[0].id_employee}`,
  });

  const [datacustomer, setDatacustomer] = useState([]);
  // อ่านข้อมูลลูกค้า
  useEffect(() => {
    // ใช้ axios หรือวิธีการดึงข้อมูลจาก API ตามที่คุณใช้งาน
    axios
      .get("http://localhost:5500/customer")
      .then((response) => {
        setDatacustomer(response.data); // ตั้งค่า state ของวัตถุดิบ
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลวัตถุดิบ:", error);
      });
  }, []);
  const [data, setData] = useState([]);

  useEffect(() => {
    // ใช้ axios หรือวิธีการดึงข้อมูลจาก API ตามที่คุณใช้งาน
    axios
      .get("http://localhost:5500/lotReadSelect")
      .then((response) => {
        setStaples(response.data); // ตั้งค่า state ของวัตถุดิบ
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลวัตถุดิบ:", error);
      });
  }, []);

  // ทำส่วนกดแล้วเพิ่มข้อมูลในตาราง
  const [staples, setStaples] = useState([]);
  const [selectedStaple, setSelectedStaple] = useState("");

  const [inputarr, setInputarr] = useState([]);
  const [inputdata, setInputdata] = useState({ Name_staple: "", AmountP: "" });

  function changehandle(e) {
    setInputdata({ ...inputdata, [e.target.name]: e.target.value });
  }

  let { Name_staple, AmountP } = inputdata;

  function changhandle() {
    const totalAmount =
      inputarr.reduce((acc, item) => acc + parseFloat(item.AmountP), 0) +
      parseFloat(inputdata.AmountP);

    if (totalAmount ) {
      setInputarr([...inputarr, { Name_staple: selectedStaple, AmountP }]);

      console.log(inputdata, "input data what we Enter");
      setInputdata({ Name_staple: "", AmountP: "" });
    } else {
      alert("ปริมาณสารเกิน 100%");
    }
    // setInputarr([...inputarr, { Name_staple, AmountP }]);
  }

  function changhandle2() {
    console.log("Object store in Array", inputarr);
  }
  function handleDelete(index) {
    const updatedInputArr = [...inputarr];
    updatedInputArr.splice(index, 1); // ลบแถวที่มี index ที่ระบุ
    setInputarr(updatedInputArr); // อัปเดต inputarr ใหม่
  }

  // คำนวณผลรวมของรายการในตาราง
  const totalAmountInTable = inputarr.reduce(
    (acc, item) => acc + parseFloat(item.AmountP),
    0
  );
  // สิ้นสุดกดแล้วเพิ่มข้อมูลในตาราง

  return (
    <div className="all-page">
      <header className="header">
        <Topnav />
      </header>
      <section className="aside">
        <Menu />
      </section>
      <main className="main">
        <div className="top-text-new-EM">
          <div className="text-new-EM-Unit">เพิ่มรายการสั่งซื้อ</div>
        </div>

        <div className="text-new-lg-Unit">
          กรุณากรอกข้อมูลใน * ให้ครบทุกช่อง ถ้าไม่มีให้ใส่เครื่องหมาย - ไว้
        </div>

        <div className="box-big-bg-new-Unit">
          {/* //!ฟอร์มที่1 ข้อมูลสูตร */}
          <div className="box-BG-area-new-Unit">
            <form className="form-new-Unit">
              <h2 style={{ marginBottom: "20px" }}>รายการสั่งซื้อ</h2>
              
              {/* วันที่สั่งซื้อ/วันที่รับรายการ */}
              <div className="form-row-new-Unit">
                <div className="form-row-2-input-Unit">
                  <label className="form-label-new-Unit">
                    <p>*</p>วันที่สั่งซื้อ :
                  </label>
                  <input name="" type="date" className="form-input-new2-Unit" />
                </div>
                <div className="form-row-2-input-Unit">
                  <label className="form-label-new-Unit">
                    <p>*</p>วันที่รับรายการ :
                  </label>
                  <input name="" type="date" className="form-input-new2-Unit" />
                </div>
              </div>
              {/* ร้านค้าที่สั่งซื้อ */}
              <div className="form-row-new">
                <label className="form-label-new">
                  <p>*</p>ร้านค้าที่สั่งซื้อ :
                </label>
                <input name="" type="text" className="form-input-new-Unit" />
              </div>
              {/* รหัสอ้างอิง */}
              <div className="form-row-new">
                <label className="form-label-new">
                  <p>*</p>รหัสอ้างอิง :
                </label>
                <input name="" type="text" className="form-input-new-Unit" />
              </div>

             
            </form>
          </div>
          {/* //!ฟอร์มที่2 ข้อมูลส่วนตัว */}
          <div className="box-BG-area-new-Unit">
            {/* <form className="form-new-Unit"> */}
            <div className="form-new-Unit">
              <h2 style={{ marginBottom: "20px" }}>วัตถุดิบที่ต้องการสั่งซื้อ</h2>
              {/* ชื่อสูตร */}
              <div className="form-row-Unit">
                <div className="row-add-select-Unit">
                  <label className="form-label-new-Unit">
                    <p>*</p>วัตถุดิบ :
                  </label>
                  {/* <input
                    type="text"
                    name="Name_staple"
                    className="form-input-new-Unit-short"
                    value={inputdata.Name_staple}
                    onChange={changehandle}
                  /> */}
                  <select
                    name="Name_staple"
                    className="form-input-new-Unit-short"
                    value={selectedStaple}
                    onChange={(e) => setSelectedStaple(e.target.value)}
                  >
                    <option value="">เลือกวัตถุดิบ</option>
                    {staples.map((staple) => (
                      <option key={staple.id} value={staple.Name_staple}>
                        {staple.Name_staple}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="row-add-select-Unit">
                  <label className="form-label-new-Unit">
                    <p>*</p>ปริมาณ(กรัม) :
                  </label>
                  <input
                    name="AmountP"
                    type="number"
                    className="form-input-new-Unit-short"
                    value={inputdata.AmountP}
                    onChange={changehandle}
                  />
                </div>
                <div className="row-add-select-Unit">
                  <button className="btnAddUnit-stable" onClick={changhandle}>
                    <h2>
                      <BiPlus />
                    </h2>
                  </button>
                  {/* <button className="btnAddUnit-stable" onClick={changhandle2}>
                    <h2>
                      <FaEye />
                    </h2>
                  </button> */}
                </div>
              </div>

              {/* ตาราง */}
              <div class="table-body-Unit">
                <table class="styled-table-Unit">
                  <thead>
                    <tr>
                      <th>รหัส</th>
                      <th>ชื่อวัตถุดิบ</th>
                      <th>รวมปริมาณสาร {totalAmountInTable} กรัม</th>

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
                    {inputarr.map((info, index) => {
                      return (
                        <tr key={index}>
                          <td style={{ color: "blue", cursor: "pointer" }}>
                            {index + 1}
                          </td>
                          <td>{info.Name_staple}</td>
                          <td>{info.AmountP}</td>

                          <td className="TDStable">
                            <button
                              className="dalete-Unit"
                              onClick={() => handleDelete(index)}
                            >
                              <h3>
                                <AiFillDelete />
                              </h3>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            {/* </form> */}
          </div>

          {/* //!ปุ่ม */}
          <div className="btn-submit-new">
            <div className="btn-area-new-Unit">
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
  );
}

export default BuyStableNew;
