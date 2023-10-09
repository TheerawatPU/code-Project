import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import Topnav from "../../component/Topnav";
import Menu from "../../component/Menu";
import "../../CSS/CustomerNew.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faArrowLeft,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ImCancelCircle } from "react-icons/im";

function CustomerReadIDPage() {
  const { id } = useParams();
  const [Data, setdata] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5500/customerID/" + id)
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();

  return (
    <div className="all-page">
      <header className="header">
        <Topnav />
      </header>
      <section className="aside">
        <Menu />
      </section>
      <main className="main">
        {Data.map((d, index) => (
          <div className="box-big-bg-new-C" key={index}>
            <div className="box-BG-area-new-Customer">

              <div className="title-Text-customer">
                <div className="top-text-new-EM">
                  <div className="text-new-EM-Unit">
                    <div
                      className="titleText"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(-1)}
                    >
                      <FaArrowLeftLong />
                    </div>
                    <div className="titleText">แก้ไขข้อมูลลูกค้า</div>
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
                      marginLeft: "20px",
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
                      marginLeft: "20px",
                      marginBottom: "10px",
                    }}
                    onClick={(e) => {
                      handleUpdate(e);
                    }}
                  >
                    <div className="btn-save01">
                      <FontAwesomeIcon icon={faFloppyDisk} />
                      <label style={{ paddingLeft: "5px" }}>บันทึก</label>
                    </div>
                  </button>
                </div>
              </div>

              <form className="form-stable-new-C">
                <div className="form-row-new-C">
                  <label className="form-label-new-C">รหัสลูกค้า :</label>
                  <input
                    name="name_company"
                    type="text"
                    className="form-input-new-read-C"
                    value={d.id_customer}
                    readOnly
                    disabled
                  />
                </div>
                <div className="form-row-new-C">
                  <label className="form-label-new-C">ชื่อบริษัท :</label>
                  <input
                    name="name_company"
                    type="text"
                    className="form-input-new-read-C"
                    value={d.name_company}
                    readOnly
                    disabled
                  />
                </div>
                <div className="form-row-new-C">
                  <label className="form-label-new-C">ชื่อลูกค้า :</label>
                  <input
                    name="name_cus"
                    type="text"
                    className="form-input-new-read-C"
                    value={d.name_cus}
                    readOnly
                    disabled
                  />
                </div>
                <div className="form-row-new-C">
                  <label className="form-label-new-C">รหัสบัตรประชาชน :</label>
                  <input
                    name="card_ID"
                    type="text"
                    className="form-input-new-read-C"
                    value={d.card_ID}
                    readOnly
                    disabled
                  />
                </div>
                <div className="form-row-new-C">
                  <label className="form-label-new-C">อีเมล :</label>
                  <input
                    name="email_cus"
                    type="email"
                    className="form-input-new-read-C"
                    value={d.email_cus}
                    readOnly
                    disabled
                  />
                </div>
                <div className="form-row-new-C">
                  <label className="form-label-new-C">เบอร์โทรศัพท์ :</label>
                  <input
                    name="phone_cus"
                    type="text"
                    className="form-input-new-read-C"
                    value={d.phone_cus}
                    readOnly
                    disabled
                  />
                </div>

                <div className="form-row-new-C">
                  <label className="form-label-new-C">ที่อยู่ :</label>
                  <input
                    type="text"
                    className="form-input-new-read-C"
                    name="address_cus"
                    value={d.address}
                    readOnly
                    disabled
                  />
                </div>
              </form>
            </div>

            {/* <div className="btn-submit-new-C">
              <div className="btn-area-new-C">
                <button
                  type="cancle"
                  className="cancle-new-C"
                  onClick={() => navigate(-1)}
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                  <span>ย้อนกลับ</span>
                </button>
                <button
                  type="submit"
                  className="submit-new-C"
                  onClick={() =>
                    navigate(
                      `/EM/CustomerReadPage/CustomerUpdatePage/${d.id_customer}`
                    )
                  }
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                  <span>แก้ไข</span>
                </button>
              </div>
            </div> */}
          </div>
        ))}
      </main>
    </div>
  );
}

export default CustomerReadIDPage;
