import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../CSS/Unit.css";
import Menu from "../../component/Menu";
import Topnav from "../../component/Topnav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

function UnitReadID() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [unit, setUnit] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5500/UreadID/${id}`)
      .then((res) => setUnit(res.data))
      .catch((err) => console.log(err));
  }, []);

  // const dataArray = Array.from(data);
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
                            <button className="dalete-Unit">
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

export default UnitReadID;
