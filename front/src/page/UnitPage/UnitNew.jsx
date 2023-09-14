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
  // todo
  // unit
  const [unit_Unit_name, setUnit_Unit_name] = useState("");
  const [unit_day_admit_list, setUnit_Day_admit_list] = useState("");
  const [unit_notification_num, setUnit_Notification_num] = useState("");
  const [unit_date_notification_num, setUnit_Date_notification_num] =
    useState("");
  const [unit_id_customer, setUnit_Id_customer] = useState("");

  // detail_unit
  const [unit_detail_id_staple, setUnit_detail_id_staple] = useState("");
  const [unit_detail_AmountP, setUnit_detail_AmountP] = useState("");

  const [detail_unit, setDetail_unit] = useState([]);
  // todo end
  const [teacherFirstName, setTeacherFirstName] = useState("");
  const [teacherLastName, setTeacherLastName] = useState("");
  const [teacherAge, setTeacherAge] = useState("");

  const [studentFirstName, setStudentFirstName] = useState("");
  const [studentLastName, setStudentLastName] = useState("");
  const [studentAge, setStudentAge] = useState("");

  const [students, setStudents] = useState([]);

  // เก็บข้อมูล customer จาก api
  const [customerOptions, setCustomerOptions] = useState([]);

  // ดึงข้อมูล customer มาจาก api
  useEffect(() => {
    axios
      .get("http://localhost:5500/customer")
      .then((response) => {
        // ตั้งค่าข้อมูลอายุให้กับ customerOptions state
        setCustomerOptions(response.data);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลลูกค้า:", error);
      });
  }, []);

  // เก็บข้อมูล staple จาก api
  const [stapleOptions, setStapleOptions] = useState([]);

  // ดึงข้อมูล staple มาจาก api
  useEffect(() => {
    axios
      .get("http://localhost:5500/stapleRead_lot")
      .then((response) => {
        // ตั้งค่าข้อมูลอายุให้กับ stapleOptions state
        setStapleOptions(response.data);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลลูกค้า:", error);
      });
  }, []);

  // ฟังก์ชั่นสำหรับการเพิ่มข้อมูลอาเรย์ของวัตถุดิบตัวใหม่ หลายๆตัว
  const handleAddStudent = () => {
    const newUnit_detail = {
      id_staple: unit_detail_id_staple,
      AmountP: unit_detail_AmountP,
    };
    setDetail_unit([...detail_unit, newUnit_detail]);
    setUnit_detail_id_staple("");
    setUnit_detail_AmountP("");
  };
  console.log("detail_unit", detail_unit);

  // ฟังก์ชั่นสำหรับการลบข้อมูลแถวในตาราง
  const handleDelete = (indexToDelete) => {
    const updatedStudents = detail_unit.filter(
      (student, index) => index !== indexToDelete
    );
    setDetail_unit(updatedStudents);
  };

  // ดึงข้อมูลผู้เข้าสู่ระบบมาใช้
  const userLoginData = JSON.parse(sessionStorage.getItem("userlogin"));

  // เรียกใช้ navigate เพื่อใช้สำหรับ การกดข้ามคอมโพเน้น
  const navigate = useNavigate();

  // ฟังก์ชั่นสำหรับการกดบันทึก
  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5500/newAddUnit", {
        unit: {
          unit_name: unit_Unit_name,
          day_admit_list: unit_day_admit_list,
          date_notification_num: unit_date_notification_num,
          notification_num: unit_notification_num,
          id_customer: unit_id_customer,
          id_employee: `${userLoginData[0].id_employee}`,
        },
        detail_unit,
      });
      console.log(response.data);
      navigate("/EM/Unit");
    } catch (error) {
      console.error(error);
    }
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
        <div className="top-text-new-EM">
          <div className="text-new-EM-Unit">เพิ่มข้อมูลสูตรผลิต</div>
        </div>
        <div className="text-new-lg-Unit">
          กรุณากรอกข้อมูลใน * ให้ครบทุกช่อง ถ้าไม่มีให้ใส่เครื่องหมาย - ไว้
        </div>

        <div className="box-big-bg-new-Unit">
          {/* //!ฟอร์มที่1 ข้อมูลสูตร */}
          <div className="box-BG-area-new-Unit">
            <div className="form-new-Unit">
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
                  value={unit_Unit_name}
                  onChange={(e) => setUnit_Unit_name(e.target.value)}
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
                    value={unit_day_admit_list}
                    onChange={(e) => setUnit_Day_admit_list(e.target.value)}
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
                    value={unit_date_notification_num}
                    onChange={(e) =>
                      setUnit_Date_notification_num(e.target.value)
                    }
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
                  value={unit_notification_num}
                  onChange={(e) => setUnit_Notification_num(e.target.value)}
                />
              </div>

              <select
                name="id_customer"
                className="form-input-select-Unit"
                value={unit_id_customer}
                onChange={(e) => setUnit_Id_customer(e.target.value)}
              >
                <option value="">เลือกชื่อลูกค้า</option>
                {customerOptions.map((cusOption) => (
                  <option key={cusOption.id} value={cusOption.id_customer}>
                    {cusOption.name_cus}
                  </option>
                ))}
              </select>
              {/* ชื่อลูกค้า
              <div className="form-row-new">
                <label className="form-label-new">
                  <p>*</p>ชื่อลูกค้า :
                </label>

                <select name="id_customer" className="form-input-select-Unit">
                  <option value="">เลือกชื่อลูกค้า</option>
                </select>
              </div> */}
            </div>
          </div>

          {/* //!ฟอร์มที่2 รายละเอียดสูตร */}
          <div className="box-BG-area-new-Unit">
            {/* <form className="form-new-Unit"> */}
            <div className="form-new-Unit">
              <h2 style={{ marginBottom: "20px" }}>ข้อมูลสูตร</h2>
              {/* stapleOptions */}
              {/* ชื่อสูตร */}
              <div className="form-row-Unit">
                <div className="row-add-select-Unit">
                  <label className="form-label-new-Unit">
                    <p>*</p>วัตถุดิบ :
                  </label>

                  <select
                    name="id_staple"
                    className="form-input-new-Unit-short"
                    value={unit_detail_id_staple}
                    onChange={(e) => setUnit_detail_id_staple(e.target.value)}
                  >
                    <option value="">เลือกวัตถุดิบ</option>
                    {stapleOptions.map((staple) => (
                      <option key={staple.id} value={staple.id_staple}>
                        {staple.Name_staple}
                      </option>
                    ))}
                  </select>
                </div>
                {/* ช่องเลือกข้อมูลวัตถุดิบ */}
                {/* <div className="form-row-Unit">
                <div className="row-add-select-Unit">
                  <label className="form-label-new-Unit">
                    <p>*</p>วัตถุดิบ :
                  </label>
                  <input
                    name="id_staple"
                    type="text"
                    className="form-input-new-Unit-short"
                    value={unit_detail_id_staple}
                    onChange={(e) => setUnit_detail_id_staple(e.target.value)}
                  />
                </div> */}
                {/* ช่องกรอกข้อมูลปริมาณ */}
                <div className="row-add-select-Unit">
                  <label className="form-label-new-Unit">
                    <p>*</p>ปริมาณ(%) :
                  </label>
                  <input
                    name="AmountP"
                    type="number"
                    className="form-input-new-Unit-short"
                    value={unit_detail_AmountP}
                    onChange={(e) => setUnit_detail_AmountP(e.target.value)}
                  />
                </div>
                {/* ปุ่มกดเพิ่มข้อมูลวัตถุดิบใหม่ */}
                <div className="row-add-select-Unit">
                  <button
                    className="btnAddUnit-stable"
                    onClick={handleAddStudent}
                  >
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
                      <th>รวมปริมาณสาร %</th>

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
                    {/* วนลูปข้อมูลในอาเรย์รายละเอียดวัตถุดิบ */}
                    {detail_unit.map((student, index) => (
                      <tr key={index}>
                        {/* นำค่า index มานับ 1 2 3 */}
                        <td>{index + 1}</td>
                        {/* เรียก ID_staple มาแสดง */}
                        <td>{student.id_staple}</td>
                        {/* เรียก AmountP มาแสดง */}
                        <td>{student.AmountP}</td>

                        {/* ปุ่มกดลบในแถว */}
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
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* </form> */}
          </div>

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
                onClick={handleSubmit}
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
