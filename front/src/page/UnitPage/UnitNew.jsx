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
import { FaArrowLeftLong } from "react-icons/fa6";

import { faBoxArchive } from "@fortawesome/free-solid-svg-icons";
import { ImCancelCircle } from "react-icons/im";

function UnitNew() {
  // console.log("unit_id", unit_id);

  // todo
  // unit
  const [unit_id, setUnit_Id] = useState(""); // เพิ่ม state สำหรับเก็บ ID สูตรใหม่

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

  // เก็บข้อมูล customer จาก api
  const [customerOptions, setCustomerOptions] = useState([]);

  // เก็บข้อมูล remainingAmount เพื่อหาค่าคงเหลือ
  const [remainingAmount, setRemainingAmount] = useState(100);

  // เก็บข้อมูล readID เพื่อหาค่าคงเหลือ
  // สร้าง state สำหรับเก็บข้อมูลที่อ่านได้จาก API
  const [readID, setReadID] = useState([]);

  const [oldestIdUnit, setOldestIdUnit] = useState(null);

  console.log(oldestIdUnit + 1);

  // ใน useEffect ที่ดึงข้อมูล unitRead
  useEffect(() => {
    // ใช้ Axios ในการทำ HTTP GET request เพื่อดึงข้อมูลจาก API
    axios
      .get("http://localhost:5500/unitRead")
      .then((response) => {
        
        // ตั้งค่าข้อมูลที่อ่านได้ใน state โดยใช้ setReadID
        setReadID(response.data);

        // อ่าน id_unit ตัวเก่าสุด
        const oldestIdUnit =
          response.data.length > 0 ? response.data[0].id_unit : null;

        // ตั้งค่า state สำหรับ id_unit ตัวเก่าสุด
        setOldestIdUnit(oldestIdUnit);
        // แสดงผลในคอนโซล
        console.log("id_unit ตัวเก่าสุด:", oldestIdUnit);
      })
      .catch((error) => {
        // แสดงข้อผิดพลาดในการดึงข้อมูล
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลลูกค้า:", error);
      });
  }, []); // useEffect นี้จะทำงานเมื่อคอมโพเนนต์ถูกโหลดครั้งแรกเท่านั้น

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

  // Initialize stapleNameMap as an empty object
  const [stapleNameMap, setStapleNameMap] = useState({});

  // เพิ่มตัวแปร totalAmountP เพื่อหาคำนวณ ว่าสารจะครบ 100%
  const [totalAmountP, setTotalAmountP] = useState(0);

  // ดึงข้อมูล staple มาจาก api
  useEffect(() => {
    axios
      .get("http://localhost:5500/stapleRead_lot")
      .then((response) => {
        // ตั้งค่าข้อมูลอายุให้กับ stapleOptions state
        setStapleOptions(response.data);
        // Create a map of id_staple to Name_staple
        const nameMap = {};
        response.data.forEach((staple) => {
          nameMap[staple.id_staple] = staple.Name_staple;
        });

        // Set the stapleNameMap state
        setStapleNameMap(nameMap);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลลูกค้า:", error);
      });
  }, []);

  // ฟังก์ชั่นสำหรับการเพิ่มข้อมูลอาเรย์ของวัตถุดิบตัวใหม่ หลายๆตัว
  const handleAddUnit = () => {
    // ตรวจสอบว่าผู้ใช้เลือกวัตถุดิบหรือไม่
    if (!unit_detail_id_staple) {
      alert("กรุณาเลือกวัตถุดิบ");
      return; // ยกเลิกการเพิ่มข้อมูลหากไม่เลือกวัตถุดิบ
    }

    // คำนวณและอัปเดต totalAmountP
    const newAmountP = parseFloat(unit_detail_AmountP);

    // ตรวจสอบว่า newAmountP เป็นตัวเลขหรือไม่
    if (isNaN(newAmountP)) {
      alert("กรุณากรอกปริมาณวัตถุดิบ");
      return; // ยกเลิกการเพิ่มข้อมูลหากปริมาณวัตถุดิบไม่ถูกต้อง
    }

    // ตรวจสอบว่า newAmountP มีค่ามากกว่า 0 หรือไม่
    if (newAmountP <= 0) {
      alert("กรุณากรอกปริมาณวัตถุดิบมากกว่า 0");
      return; // ยกเลิกการเพิ่มข้อมูลหากปริมาณวัตถุดิบไม่ถูกต้อง
    }

    // คำนวณรวมปริมาณสารในรายการปัจจุบัน
    const currentTotalAmountP = detail_unit.reduce(
      (accumulator, currentDetail) =>
        accumulator + parseFloat(currentDetail.AmountP),
      0
    );

    // ตรวจสอบว่ารวมปริมาณสารใหม่เกิน 100%
    if (currentTotalAmountP + newAmountP > 100) {
      alert("รวมปริมาณวัตถุดิบเกิน 100%");
      return; // ยกเลิกการเพิ่มข้อมูลหากรวมปริมาณสารเกิน 100%
    }

    // สร้างวัตถุใหม่เพื่อเก็บข้อมูลวัตถุดิบ
    const newUnit_detail = {
      id_staple: unit_detail_id_staple,
      AmountP: unit_detail_AmountP,
    };

    // เพิ่มข้อมูลวัตถุดิบใหม่ลงในรายการ
    setDetail_unit([...detail_unit, newUnit_detail]);

    // ล้างค่า input หลังจากเพิ่มข้อมูล
    setUnit_detail_id_staple("");
    setUnit_detail_AmountP("");

    // อัปเดตรวมปริมาณสารใหม่
    setTotalAmountP(currentTotalAmountP + newAmountP);

    // คำนวณค่าปริมาณคงเหลือ
    const remainingAmount = 100 - (currentTotalAmountP + newAmountP);
    setRemainingAmount(remainingAmount);
  };

  console.log("detail_unit", detail_unit);

  // ฟังก์ชั่นสำหรับการลบข้อมูลแถวในตาราง

  // ฟังก์ชั่นสำหรับการลบข้อมูลแถวในตาราง
  function handleDelete(index) {
    // 1. ดึงข้อมูลที่จะถูกลบออกมาจาก detail_unit
    const deletedUnit = detail_unit[index];

    // 2. คำนวณค่าปริมาณสารในแถวที่ถูกลบ
    const updatedUnitSum = parseFloat(deletedUnit.AmountP);

    // 3. คำนวณค่ารวมปริมาณสารใหม่โดยลบค่าปริมาณสารในแถวที่ถูกลบออกจากค่ารวมปริมาณสารเดิม
    const updatedTotalAmountP = totalAmountP - updatedUnitSum;

    // 4. สร้างคัวแปรใหม่ที่เป็นสำเนาของ detail_unit และลบแถวที่ถูกลบออกจากคัวแปรใหม่
    const updatedInputArr = [...detail_unit];
    updatedInputArr.splice(index, 1); // ลบแถวที่มี index ที่ระบุ

    // 5. อัปเดต state ของ detail_unit เพื่อลบแถวที่ถูกลบออก
    setDetail_unit(updatedInputArr);

    // 6. อัปเดต state ของ totalAmountP เพื่อลดค่ารวมปริมาณสารตามที่คำนวณไว้ในขั้นตอนที่ 3
    setTotalAmountP(updatedTotalAmountP);

    // 7. คำนวณค่าปริมาณคงเหลือ
    const remainingAmount = 100 - updatedTotalAmountP;
    setRemainingAmount(remainingAmount);
  }

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
        <div className="title-Text">
          <div className="top-text-new-EM">
            <div className="text-new-EM-Unit">
              <div
                className="titleText"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(-1)}
              >
                <FaArrowLeftLong />
              </div>
              <div className="titleText">เพิ่มข้อมูลสูตร</div>
            </div>
          </div>
          <div className="all-btn-0">
            <button
              className="btn01"
              type="submit"
              style={{
                background: "rgb(221 62 62)",
                color: "white",
                width: "auto",
                height: "auto",
                marginRight: "20px",
                marginBottom: "10px",
              }}
              onClick={() => navigate(-1)}
            >
              <div className="btn-save01">
                <ImCancelCircle />
                <label style={{ paddingLeft: "5px" }}>ยกเลิก</label>
              </div>
            </button>
            <button
              className="btn01"
              type="submit"
              style={{
                background: "#22a699",
                color: "white",
                width: "auto",
                height: "auto",
                marginRight: "50px",
                marginBottom: "10px",
              }}
              onClick={handleSubmit}
            >
              <div className="btn-save01">
                <FontAwesomeIcon icon={faFloppyDisk} />
                <label style={{ paddingLeft: "5px" }}>บันทึก</label>
              </div>
            </button>
          </div>

          {/* <div className="text-new-lg-Unit">
            กรุณากรอกข้อมูลใน * ให้ครบทุกช่อง ถ้าไม่มีให้ใส่เครื่องหมาย - ไว้
          </div> */}
        </div>

        <div className="Ubox0">
          <div className="Ubox1">
            <div className="Ubox1-1">
              <h2 style={{ marginBottom: "25px" }}>ข้อมูลการผลิต</h2>

              <div className="Ubox1-1-1">
                <label className="form-label1-1">รหัสสูตร :</label>
                <input
                  type="text"
                  className="Uinput1"
                  name="unit_id"
                  value={oldestIdUnit + 1} // รับค่า ID จาก state หรือ props ตามที่คุณเก็บ
                  disabled
                  style={{ background: "#e5e5e5", border: "none" }}
                />
              </div>

              <div className="Ubox1-1-1">
                <label className="form-label1-1">ชื่อสูตร :</label>
                <input
                  type="text"
                  className="Uinput1"
                  name="unit_name"
                  value={unit_Unit_name}
                  onChange={(e) => setUnit_Unit_name(e.target.value)}
                />
              </div>

              <div className="Ubox1-1-1D">
                <div className="doubleU">
                  <label className="form-label1-1">วันที่รับรายการ :</label>
                  <input
                    className="form-date"
                    type="date"
                    name="day_admit_list"
                    value={unit_day_admit_list}
                    onChange={(e) => setUnit_Day_admit_list(e.target.value)}
                  />
                </div>
                <div className="doubleU">
                  <label className="form-label1-1">
                    วันที่เลขจดแจ้งสิ้นสุด :
                  </label>
                  <input
                    className="form-date"
                    type="date"
                    name="date_notification_num"
                    value={unit_date_notification_num}
                    onChange={(e) =>
                      setUnit_Date_notification_num(e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="Ubox1-1-1">
                <label className="form-label1-1">เลขที่จดแจ้ง :</label>
                <input
                  type="text"
                  className="Uinput1"
                  name="notification_num"
                  value={unit_notification_num}
                  onChange={(e) => setUnit_Notification_num(e.target.value)}
                />
              </div>

              <div className="Ubox1-1-1">
                <label className="form-label1-1">ลูกค้า :</label>
                <select
                  className="Uinput1s"
                  name="id_customer"
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
              </div>
            </div>
          </div>

          <div className="Ubox2">
            <div className="Ubox2-1">
              <h2 style={{ marginBottom: "25px" }}>ตารางวัตถุดิบ</h2>

              <div className="Ubox2-1-1">
                <div className="UboxS-1">
                  <label className="form-label1-1">วัตถุดิบ :</label>
                  <select
                    className="Uinput1s"
                    name="id_staple"
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

                <div className="UboxS-2">
                  <div className="UboxS-2-1">
                    <label className="form-label1-1">ปริมาณสาร :</label>
                    <input
                      type="number"
                      className="Uinput1"
                      name="AmountP"
                      value={unit_detail_AmountP}
                      onChange={(e) => setUnit_detail_AmountP(e.target.value)}
                    />
                  </div>

                  <div className="UboxS-2-1">
                    <button
                      type="submit"
                      style={{ background: "blue", color: "white" }}
                      onClick={handleAddUnit}
                    >
                      <h3>
                        <BiPlus />
                      </h3>
                    </button>
                  </div>
                </div>
              </div>

              <div className="Ubox2-1-2">
                <div className="UboxS-3">
                  <div className="UboxS-2-1s">
                    <label className="form-label1-1">รวมปริมาณสาร :</label>
                    <input
                      className="Uinput1ss"
                      disabled
                      value={totalAmountP.toFixed(4)}
                    />
                    <label>%</label>
                  </div>
                </div>

                <div className="UboxS-4">
                  <div className="UboxS-2-1s">
                    <label className="form-label1-1">ปริมาณคงเหลือ :</label>
                    <input
                      className="Uinput1ss"
                      disabled
                      value={remainingAmount.toFixed(4)}
                    />
                    <label>%</label>
                  </div>
                </div>
              </div>

              <div className="Ubox2-1-1">
                <div class="table-body-Unit">
                  <table class="styled-table-Unit">
                    <thead>
                      <tr>
                        <th>รหัส</th>
                        <th>ชื่อวัตถุดิบ</th>
                        <th>รวมปริมาณสาร {totalAmountP.toFixed(4)}%</th>

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
                      {detail_unit.map((detail, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{stapleNameMap[detail.id_staple] || ""}</td>
                          <td>{detail.AmountP}</td>
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default UnitNew;
