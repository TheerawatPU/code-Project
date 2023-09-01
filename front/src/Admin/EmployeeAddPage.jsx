import React, { useEffect, useState } from "react";
import axios from "axios";
import TopNavAD from "./ComponentAD/TopNavAD";
import MenuAD from "./ComponentAD/MenuAD";
import "./CSS/Employee.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";

function EmployeeAddPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    Name_staple: "",
    Name_INCIname: "",
    howUsing: "",
    howMixing: "",
    saving: "",
    melting: "",
    reOrder: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:5500/stapleNew", {
        ...values,
      })
      .then((res) => {
        console.log(res);
        navigate("/EM/StablePage");
      })
      .catch((err) => console.log(err));
  };

  const handleInput = (event) => {
    const { name, value } = event.target;

    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="all-page">
      <header className="header">
        <TopNavAD />
      </header>
      <section className="aside">
        <MenuAD />
      </section>
      <main className="main">
        <div className="top-text-new-EM">
          <div className="text-new-EM">เพิ่มข้อมูลพนักงาน</div>
        </div>

        <div className="text-new-lg">
          กรุณากรอกข้อมูลให้ครบทุกช่อง ถ้าไม่มีให้ใส่เครื่องหมาย - ไว้
        </div>

        <div className="box-big-bg-new-EM">
          {/* //!ฟอร์มที่1 รูป */}
          <div className="box-BG-area-new-EM">
            <form className="form-EM-new" onSubmit={handleSubmit}>
              <div className="form-row-new">
                <label className="form-label-new">
                  <p>*</p>อีเมล :
                </label>
                <input
                  name="reOrder"
                  type="text"
                  className="form-input-new-EM"
                  onChange={handleInput}
                />
              </div>
              <div className="form-row-new">
                <label className="form-label-new">
                  <p>*</p>รหัสผ่าน :
                </label>
                <input
                  name="reOrder"
                  type="text"
                  className="form-input-new-EM"
                  onChange={handleInput}
                />
              </div>
              
            </form>
          </div>

          {/* //!ฟอร์มที่2 ข้อมูลส่วนตัว */}
          <div className="box-BG-area-new-EM">
            <form className="form-EM-new" onSubmit={handleSubmit}>
              {/* เลือกตำแหน่ง และสถานะ */}
              <div className="form-row-new-select-EM">
                <div className="select-row-C">
                  <label className="form-label-new-EM">
                    <p>*</p>ตำแหน่ง :
                  </label>
                  <select className="form-input-select-EM" name="provinces">
                    <option>เลือกตำแหน่ง</option>
                    <option>พนักงานฝ่ายขาย</option>
                    <option>พนักงานฝ่ายผลิต</option>
                    <option>ผู้ดูแลระบบ</option>
                  </select>
                </div>

                <div className="select-row-C">
                  <label className="form-label-new-EM">
                    <p>*</p>สถานะการทำงาน :
                  </label>
                  <select className="form-input-select-EM" name="provinces">
                    <option>เลือกสถานะการทำงาน</option>
                    <option>กำลังทำงาน</option>
                    <option>พ้นสภาพการทำงาน</option>
                  </select>
                </div>
              </div>

              {/*คำนำหน้า ชื่อ-นามสกุล */}
              <div className="form-row-new-select-EM">
                <div className="select-row-C">
                  <label className="form-label-new-EM">
                    <p>*</p>คำนำหน้า :
                  </label>
                  <select
                    className="form-input-select-title-EM"
                    name="provinces"
                  >
                    <option>เลือกคำนำหน้า</option>
                    <option>นาย</option>
                    <option>นาง</option>
                    <option>นางสาว</option>
                  </select>
                </div>

                <div className="select-row-C">
                  <label className="form-label-new-EM">
                    <p>*</p>ชื่อ-นามสกุล :
                  </label>
                  <input
                    name="Name_staple"
                    type="text"
                    className="form-input-new-title-EM"
                    onChange={handleInput}
                  />
                </div>
              </div>

              {/* เพศ วันเกิด */}
              <div className="form-row-new-select-EM-Radio">
                <div className="select-row-Radio">
                  <div className="btn-Radio">
                    <label className="form-label-new-EM">
                      <p>*</p>เพศ :
                    </label>
                    <div className="radio-EM">
                      <input
                        name="Name_staple"
                        type="radio"
                        className="form-input-new-title-Radio-EM"
                      />
                      <span>ชาย</span>
                      <input
                        name="Name_staple"
                        type="radio"
                        className="form-input-new-title-Radio-EM"
                      />
                      <span>หญิง</span>
                    </div>
                  </div>
                </div>

                <div className="select-row-C">
                  <label className="form-label-new-EM">
                    <p>*</p>วันเดือนปีเกิด :
                  </label>
                  <input
                    name="Name_staple"
                    type="date"
                    className="form-input-new-title-EM"
                    onChange={handleInput}
                  />
                </div>
              </div>

              {/* เบอร์โทร IDLine Facebook */}

              <div className="form-row-new-select-EM">
                <div className="select-row-C">
                  <label className="form-label-new-EM">
                    <p>*</p>เบอร์โทรศัพท์ :
                  </label>
                  <input
                    name="Name_staple"
                    type="text"
                    className="form-input-new-3-EM"
                    onChange={handleInput}
                  />
                </div>
                <div className="select-row-C">
                  <label className="form-label-new-EM">
                    <p>*</p>ไอดีไลน์ :
                  </label>
                  <input
                    name="Name_staple"
                    type="text"
                    className="form-input-new-3-EM"
                    onChange={handleInput}
                  />
                </div>
                <div className="select-row-C">
                  <label className="form-label-new-EM">
                    <p>*</p>เฟสบุ๊ค :
                  </label>
                  <input
                    name="Name_staple"
                    type="text"
                    className="form-input-new-3-EM"
                    onChange={handleInput}
                  />
                </div>
              </div>

              <div className="form-row-new">
                <label className="form-label-new">
                  <p>*</p>รหัสบัตรประชาชน :
                </label>
                <input
                  name="reOrder"
                  type="text"
                  className="form-input-new-EM"
                  onChange={handleInput}
                />
              </div>
            </form>
          </div>

          {/* //!ฟอร์มที่3 บัญชีผู้ใช้ */}
          <div className="box-BG-area-new-EM">
            <form className="form-EM-new" onSubmit={handleSubmit}>
              <div className="form-row-new">
                <label className="form-label-new">
                  <p>*</p>อีเมล :
                </label>
                <input
                  name="reOrder"
                  type="text"
                  className="form-input-new-EM"
                  onChange={handleInput}
                />
              </div>
              <div className="form-row-new">
                <label className="form-label-new">
                  <p>*</p>รหัสผ่าน :
                </label>
                <input
                  name="reOrder"
                  type="text"
                  className="form-input-new-EM"
                  onChange={handleInput}
                />
              </div>
              <div className="form-row-new">
                <label className="form-label-new">
                  <p>*</p>ยืนยันรหัสผ่าน :
                </label>
                <input
                  name="reOrder"
                  type="text"
                  className="form-input-new-EM"
                  onChange={handleInput}
                />
              </div>
            </form>
          </div>
          {/* //!ปุ่ม */}
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
  );
}

export default EmployeeAddPage;
