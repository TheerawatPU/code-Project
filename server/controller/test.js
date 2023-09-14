import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../CSS/Unit.css";
import Menu from "../../component/Menu";
import Topnav from "../../component/Topnav";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { FaPen, FaEye } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

function UnitNew() {
  // สำหรับเก็บชื่อลูกค้า
  const [datacustomer, setDatacustomer] = useState([]);
  // สำหรับเก็บผู้เข้าสู่ระบบตอนนั้น
  const userLoginData = JSON.parse(sessionStorage.getItem("userlogin"));

  // อ่านข้อมูลลูกค้า
  useEffect(() => {
    // ใช้ axios หรือวิธีการดึงข้อมูลจาก API ตามที่คุณใช้งาน
    axios
      .get("http://localhost:5500/customer")
      .then((response) => {
        setDatacustomer(response.data);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลวัตถุดิบ:", error);
      });
  }, []);

  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // อ่านข้อมูลวัตถุดิบ
  useEffect(() => {
    // ใช้ axios หรือวิธีการดึงข้อมูลจาก API ตามที่คุณใช้งาน
    axios
      .get("http://localhost:5500/lotReadSelect")
      .then((response) => {
        setStaples(response.data);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลวัตถุดิบ:", error);
      });
  }, []);

  const [values, setValues] = useState({
    unit_name: "",
    day_admit_list: "",
    notification_num: "",
    date_notification_num: "",
    id_customer: "",
    id_employee: `${userLoginData[0].id_employee}`,
  });
  // console.log(values);

  // บันทึกข้อมูล
  const handleSubmit = (event) => {
    event.preventDefault();

    // สร้างข้อมูลที่จะส่งไปยังเซิร์ฟเวอร์
    const dataToSendToServer = {
      ...values, // เพิ่มข้อมูลสูตร
      unitDetails: inputarr, // เพิ่มข้อมูลวัตถุดิบจาก inputarr
    };

    // บันทึกข้อมูลสูตร
    axios
      .post("http://localhost:5500/newAddUnit", dataToSendToServer)

      .then((res) => {
        console.log(res);
        navigate("/EM/Unit");
      })
      .catch((err) => console.log(err));
  };

  // ค่าที่ส่งมาจาก Input
  const handleInput = (event) => {
    const { name, value } = event.target;

    setValues((prev) => ({ ...prev, [name]: value }));
  };

  // ทำส่วนกดแล้วเพิ่มข้อมูลในตาราง
  const [staples, setStaples] = useState([]);
  const [selectedStaple, setSelectedStaple] = useState("");

  const [inputarr, setInputarr] = useState([]); // สร้าง state เพื่อเก็บข้อมูลวัตถุดิบในตาราง
  const [inputdata, setInputdata] = useState({ id_staple: "", AmountP: "" });

  function changehandle(e) {
    setInputdata({ ...inputdata, [e.target.name]: e.target.value });
  }

  let { id_staple, AmountP } = inputdata;

  function changhandle() {
    // คำนวณผลรวมในอาเรย์
    const totalAmount =
      inputarr.reduce((acc, item) => acc + parseFloat(item.AmountP), 0) +
      parseFloat(inputdata.AmountP);

    // เงื่อนไขถ้าผลรวมในอาเรย์น้อยกว่าหรือเท่ากับ 100 ให้เพิ่มข้อมูลใน อาเรย์ได้ แต่ถ้าน้อยกว่าให้แสดง ป๊อปอัพเด้งขึ้นมา
    if (totalAmount <= 100) {
      // เก็บข้อมูลใน setInputarr

      setInputarr([
        ...inputarr,
        {
          id_staple: selectedStaple,
          AmountP,
        },
      ]);

      console.log(inputdata, "ข้อมูลที่มาจากการเพิ่ม inputdata");
      console.log(inputarr, "ข้อมูลที่มาจาก inputarr");
      setInputdata({ id_staple: "", AmountP: "" });
    } else {
      alert("ปริมาณสารเกิน 100%");
    }
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
          <div className="text-new-EM-Unit">เพิ่มข้อมูลสูตรผลิต</div>
        </div>

        <div className="text-new-lg-Unit">
          กรุณากรอกข้อมูลใน * ให้ครบทุกช่อง ถ้าไม่มีให้ใส่เครื่องหมาย - ไว้
        </div>

        <div className="box-big-bg-new-Unit">
          {/* //!ฟอร์มที่1 ข้อมูลสูตร */}
          <div className="box-BG-area-new-Unit">
            <form className="form-new-Unit">
              <h2 style={{ marginBottom: "20px" }}>ข้อมูลสูตร</h2>
              {/* ชื่อสูตร */}
              <div className="form-row-new">
                <label className="form-label-new-Unit">
                  <p>*</p>ชื่อสูตร :
                </label>
                <input
                  name="unit_name"
                  type="text"
                  className="form-input-new-Unit"
                  onChange={handleInput}
                />
              </div>
              {/* วันที่รับรายการ */}
              <div className="form-row-new-Unit">
                <div className="form-row-2-input-Unit">
                  <label className="form-label-new-Unit">
                    <p>*</p>วันที่รับรายการ :
                  </label>
                  <input
                    name="day_admit_list"
                    type="date"
                    className="form-input-new2-Unit"
                    onChange={handleInput}
                  />
                </div>
                <div className="form-row-2-input-Unit">
                  <label className="form-label-new-Unit">
                    <p>*</p>วันที่เลขจดแจ้งสิ้นสุด :
                  </label>
                  <input
                    name="date_notification_num"
                    type="date"
                    className="form-input-new2-Unit"
                    onChange={handleInput}
                  />
                </div>
              </div>
              {/* เลขที่จดแจ้ง */}
              <div className="form-row-new">
                <label className="form-label-new">
                  <p>*</p>เลขที่จดแจ้ง :
                </label>
                <input
                  name="notification_num"
                  type="text"
                  className="form-input-new-Unit"
                  onChange={handleInput}
                />
              </div>

              {/* ชื่อลูกค้า */}
              <div className="form-row-new">
                <label className="form-label-new">
                  <p>*</p>ชื่อลูกค้า :
                </label>

                <select
                  name="id_customer"
                  className="form-input-select-Unit"
                  onChange={handleInput}
                >
                  <option value="">เลือกชื่อลูกค้า</option>
                  {datacustomer.map((customer) => (
                    <option key={customer.id} value={customer.id_customer}>
                      {customer.name_cus}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </div>
          {/* //!ฟอร์มที่2 ข้อมูลส่วนตัว */}
          <div className="box-BG-area-new-Unit">
            {/* <form className="form-new-Unit"> */}
            <div className="form-new-Unit">
              <h2 style={{ marginBottom: "20px" }}>ข้อมูลสูตร</h2>
              {/* ชื่อสูตร */}
              <div className="form-row-Unit">
                <div className="row-add-select-Unit">
                  <label className="form-label-new-Unit">
                    <p>*</p>วัตถุดิบ :
                  </label>

                  <select
                    name="id_staple"
                    className="form-input-new-Unit-short"
                    value={selectedStaple}
                    onChange={(e) => setSelectedStaple(e.target.value)}
                  >
                    <option value="">เลือกวัตถุดิบ</option>
                    {staples.map((staple) => (
                      <option key={staple.id} value={staple.id_staple}>
                        {staple.Name_staple}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="row-add-select-Unit">
                  <label className="form-label-new-Unit">
                    <p>*</p>ปริมาณ(%) :
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
                </div>
              </div>

              {/* ตาราง */}
              <div class="table-body-Unit">
                <table class="styled-table-Unit">
                  <thead>
                    <tr>
                      <th>รหัส</th>
                      <th>ชื่อวัตถุดิบ</th>
                      <th>รวมปริมาณสาร {totalAmountInTable} %</th>

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
                          <td>{info.id_staple}</td>
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

export default UnitNew;
