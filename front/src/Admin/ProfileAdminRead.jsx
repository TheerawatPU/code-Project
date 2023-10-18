import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import MenuAD from "./ComponentAD/MenuAD";
import TopNavAD from "./ComponentAD/TopNavAD";

import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { ImCancelCircle } from "react-icons/im";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaArrowLeftLong } from "react-icons/fa6";

import "../CSS/Profile.css";

function ProfileAdminRead() {
  const navigate = useNavigate();

  const userLoginData = JSON.parse(sessionStorage.getItem("userlogin"));
  return (
    <>
      <div className="all-page">
        <header className="header">
          <TopNavAD />
        </header>
        <section className="aside">
          <MenuAD />
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
                <div className="titleText">โปรไฟล์</div>
              </div>
            </div>
            <div className="all-btn-0">
              {/* <button
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
              </button> */}
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
                onClick={() =>
                  navigate(
                    `/AD/ProfileAdminRead/ProfileADmin/${userLoginData[0].id_employee}`
                  )
                }
              >
                <div className="btn-save01">
                  {/* <FontAwesomeIcon icon={faFloppyDisk} /> */}
                  <FontAwesomeIcon icon={faPenToSquare} />
                  <label style={{ paddingLeft: "5px" }}>แก้ไข</label>
                </div>
              </button>
            </div>
          </div>

          <div className="Ubox0">
            <div className="Profile1">
              {/* <div className="profile-img"></div> */}
              <img
                src={userLoginData[0].image}
                alt=""
                className="profile-img"
              />
              {/* <input
                type="file"
                className="profile-img"
                src={userLoginData[0].image}
              /> */}
              {/* <button className="profile-btn">เลือกรูป</button> */}
            </div>

            <div className="Profile2">
              {/* รหัส-ตำแหน่ง */}
              <div className="profile2plye" style={{ marginTop: "10px" }}>
                <div className="profile2-1">
                  <label className="label-profile">รหัสพนักงาน:</label>
                  <input
                    type="text"
                    className="input-profile-read"
                    disabled
                    value={userLoginData[0].id_employee}
                  />
                </div>
                <div className="profile2-1">
                  <label className="label-profile">ตำแหน่ง:</label>
                  {/* <select name="" id="" className="input-profile">
                    <option value="">1</option>
                  </select> */}
                  <input
                    type="text"
                    className="input-profile-read"
                    disabled
                    value={userLoginData[0].department}
                  />
                </div>
              </div>

              {/* คำนำหน้า-ชื่อ */}
              <div className="profile2plye">
                <div className="profile2-1">
                  <label className="label-profile">คำนำหน้า:</label>
                  <input
                    type="text"
                    className="input-profile-read"
                    disabled
                    value={userLoginData[0].title}
                  />
                  {/* <select name="" id="" className="input-profile">
                    <option value="">เลือกคำนำหน้า</option>
                    <option value="">นาย</option>
                    <option value="">นาง</option>
                    <option value="">นางสาว</option>
                  </select> */}
                </div>
                <div className="profile2-1">
                  <label className="label-profile">ชื่อ-นามสกุล:</label>
                  <input
                    type="text"
                    className="input-profile-read"
                    disabled
                    value={userLoginData[0].name}
                  />
                </div>
              </div>

              {/* เพศ-วันเกิด */}
              <div className="profile2plye">
                <div className="profile2-1">
                  <label className="label-profile">เพศ:</label>
                  <input
                    type="text"
                    className="input-profile-read"
                    disabled
                    value={userLoginData[0].sex}
                  />
                  {/* <select name="" id="" className="input-profile">
                    <option value="">เลือกเพศ</option>
                    <option value="">ชาย</option>
                    <option value="">หญิง</option>
                  </select> */}
                </div>
                <div className="profile2-1">
                  <label className="label-profile">วันเกิด:</label>
                  <input
                    type="text"
                    className="input-profile-read"
                    disabled
                    value={userLoginData[0].birthday}
                  />
                </div>
              </div>

              {/* เลขบัตร */}
              <div className="profile2-1-long">
                <label className="label-profile">เลขบัตรประชาชน:</label>
                <input
                  type="text"
                  className="input-profile-long-read"
                  disabled
                  value={userLoginData[0].card_id}
                />
              </div>

              {/* เบอร์โทร - ไลน์ - เฟส */}
              <div className="profile2plye">
                <div className="profile2-1">
                  <label className="label-profile">เบอร์โทร:</label>
                  <input
                    type="text"
                    className="input-profile-read"
                    disabled
                    value={userLoginData[0].phone}
                  />
                </div>
                <div className="profile2-1">
                  <label className="label-profile">ไอดีไลน์:</label>
                  <input
                    type="text"
                    className="input-profile-read"
                    disabled
                    value={userLoginData[0].line_id}
                  />
                </div>
                <div className="profile2-1">
                  <label className="label-profile">ชื่อเฟส:</label>
                  <input
                    type="text"
                    className="input-profile-read"
                    disabled
                    value={userLoginData[0].facebook_id}
                  />
                </div>
              </div>

              {/* บัญชีผู้ใช้ */}
              <div className="profile2-1-long">
                <label className="label-profile">บัญชีผู้ใช้:</label>
                <input
                  type="text"
                  className="input-profile-long-read"
                  disabled
                  value={userLoginData[0].username}
                />
              </div>

              {/* รหัสผ่าน */}
              <div className="profile2-1-long">
                <label className="label-profile">รหัสผ่าน:</label>
                <input
                  type="password"
                  className="input-profile-long-read"
                  disabled
                  value={userLoginData[0].password}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default ProfileAdminRead;
