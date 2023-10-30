import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Menu from "../../component/Menu";
import Topnav from "../../component/Topnav";

import {
  faPenToSquare,
  faArrowLeft,
  faFloppyDisk,
  faBan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaArrowLeftLong } from "react-icons/fa6";

import "../../CSS/Profile.css";
import "../../Admin/CSS/EM.css";

function ProfileRead() {
  const navigate = useNavigate();

  const userLoginData = JSON.parse(sessionStorage.getItem("userlogin"));

  function formatDateOfBirth(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", options);
  } // แปลงวันเกิดเป็น "วัน/เดือน/ปี"

  const formattedDateOfBirth = formatDateOfBirth(userLoginData[0].birthday);

  console.log(formattedDateOfBirth);

  return (
    <>
      <div className="all-page-new">
        <header className="header-new">
          <Topnav />
        </header>
        <section className="aside-new">
          <Menu />
        </section>

        <main className="main-new">
          <div className="embox0">
            <div className="emtitle">
              <div className="title1">
                <div className="text_title1">
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    style={{ marginRight: "10px", cursor: "pointer" }}
                    onClick={() => navigate("/EM/StablePage")}
                  />
                  โปรไฟล์
                </div>
              </div>
              <div className="title2">
                {/* <div className="btn_can">
                <button
                  className="cencle"
                  onClick={() => navigate(-1)}
                  type="cancle"
                >
                  <FontAwesomeIcon icon={faBan} />
                  <label htmlFor="" className="text_cencle">
                    ยกเลิก
                  </label>
                </button>
              </div> */}

                <div className="btn_can">
                  <button
                    className="submit"
                    type="submit"
                    onClick={() =>
                      navigate(
                        `/EM/ProfileRead/ProfileEdit/${userLoginData[0].id_employee}`
                      )
                    }
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                    <label htmlFor="" className="text_cencle">
                      แก้ไข
                    </label>
                  </button>
                </div>
              </div>
            </div>
            <div className="embox1">
              <div className="embox21">
                <div className="pic0">
                  <img
                    src={userLoginData[0].image}
                    alt=""
                    className="pic1"
                    name="image"
                  />
                </div>
              </div>
              <div className="embox22">
                <div className="embox22_1">
                  <div className="textem1">
                    <h3>ตำแหน่ง:</h3>
                    <input
                      type="text"
                      className="inputtext1_read"
                      disabled
                      value={userLoginData[0].department}
                    />
                  </div>
                  <div className="textem1">
                    <h3>สถานะการทำงาน:</h3>
                    <input
                      type="text"
                      className="inputtext1_read"
                      disabled
                      value={userLoginData[0].status}
                    />
                  </div>
                  {/* <div className="textem1">
                  <h3>ตำแหน่ง:</h3>
                  <select className="inputtext1_3" name="department">
                    <option value="">เลือกตำแหน่ง</option>
                    <option value="ผู้บริหาร">ผู้บริหาร</option>
                    <option value="พนักงานฝ่ายผลิต">พนักงานฝ่ายผลิต</option>
                  </select>
                </div>
                <div className="textem1">
                  <h3>สถานะการทำงาน:</h3>
                  <select className="inputtext1_3" name="status">
                    <option value="">เลือกตำแหน่ง</option>
                    <option value="กำลังทำงาน">กำลังทำงาน</option>
                    <option value="พ้นสภาพการทำงาน">พ้นสภาพการทำงาน</option>
                  </select>
                </div> */}
                </div>

                <div className="embox22_1">
                  {/* <div className="textem1">
                  <h3>คำนำหน้า:</h3>
                  <select name="title" className="inputtext1_3">
                    <option value="">เลือกคำนำหน้า</option>
                    <option value="นาย">นาย</option>
                    <option value="นาง">นาง</option>
                    <option value="นางสาว">นางสาว</option>
                  </select>
                </div> */}
                  <div className="textem1">
                    <h3>คำนำหน้า:</h3>
                    <input
                      type="text"
                      className="inputtext1_read"
                      name="title"
                      value={userLoginData[0].title}
                      disabled
                    />
                  </div>
                  <div className="textem1">
                    <h3>ชื่อ-นามสกุล:</h3>
                    <input
                      type="text"
                      className="inputtext1_read"
                      name="name"
                      value={userLoginData[0].name}
                      disabled
                    />
                  </div>
                </div>

                <div className="embox22_1">
                  {/* <div className="textem1">
                  <h3>เพศ:</h3>
                  <select name="sex" className="inputtext1_3">
                    <option value="">เลือกเพศ</option>
                    <option value="ชาย">ชาย</option>
                    <option value="หญิง">หญิง</option>
                  </select>
                </div> */}
                  <div className="textem1">
                    <h3>เพศ:</h3>
                    <input
                      type="text"
                      className="inputtext1_read"
                      name="sex"
                      value={userLoginData[0].sex}
                      disabled
                    />
                  </div>
                  <div className="textem1">
                    <h3>วันเกิด:</h3>
                    <input
                      type="text"
                      className="inputtext1_read"
                      name="birthday"
                      // value={values.birthday}
                      value={formattedDateOfBirth}
                      disabled
                    />
                  </div>
                </div>

                <div className="embox22_1">
                  <div className="textem1">
                    <h3>เลขบัตรประชาชน:</h3>
                    <input
                      type="number"
                      className="inputtext1_2_read"
                      name="card_id"
                      value={userLoginData[0].card_id}
                      disabled
                    />
                  </div>
                </div>

                <div className="embox22_1-2">
                  <div className="textem1">
                    <h3>เบอร์โทรศัพท์:</h3>
                    <input
                      type="number"
                      className="inputtext1_read"
                      name="phone"
                      value={userLoginData[0].phone}
                      disabled
                    />
                  </div>
                  <div className="textem1">
                    <h3>ไอดีไลน์:</h3>
                    <input
                      type="text"
                      className="inputtext1_read"
                      name="line_id"
                      value={userLoginData[0].line_id}
                      disabled
                    />
                  </div>
                  <div className="textem1">
                    <h3>ชื่อเฟสบุ๊ค:</h3>
                    <input
                      type="text"
                      className="inputtext1_read"
                      name="facebook_id"
                      value={userLoginData[0].facebook_id}
                      disabled
                    />
                  </div>
                </div>

                <div className="embox22_1">
                  <div className="textem1">
                    <h3>บัญชีผู้ใช้:</h3>
                    <input
                      type="text"
                      className="inputtext1_2_read"
                      name="username"
                      value={userLoginData[0].username}
                      disabled
                    />
                  </div>
                </div>

                <div className="embox22_1">
                  <div className="textem1">
                    <h3>รหัสผ่าน:</h3>
                    <input
                      type="password"
                      className="inputtext1_2_read"
                      name="password"
                      value={userLoginData[0].password}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default ProfileRead;
