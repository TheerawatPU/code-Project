import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../../CSS/Customer.css";
import Topnav from "../../component/Topnav";
import Menu from "../../component/Menu";
import "../../CSS/CustomerNew.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

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
        <div className="top-text-new-C">
          <div className="text-new-C">รายละเอียดข้อมูลลูกค้า</div>
        </div>
        {Data.map((d, index) => (
          <div className="box-big-bg-new-C" key={index}>
            <div className="box-BG-area-new-C">
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

            <div className="btn-submit-new-C">
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
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default CustomerReadIDPage;
