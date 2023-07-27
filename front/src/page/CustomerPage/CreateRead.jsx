import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CreateCus.css";

function CreateRead() {
  const { id } = useParams();
  //   const [customer, setCustomer] = useState([])
  const [Data, setdata] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5500/customerID/" + id)
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();
  return (
    <div>
      <h2>รายละเอียดลูกค้า</h2>
      <div className="g-btn">
        <button className="cancle-btn" onClick={() => navigate(-1)}>
          ย้อนกลับ
        </button>
      </div>
      {Data.map((d, index) => (
        <div key={index}>
          <div className="con">
            <form>
              <div className="form-row">
                <label for="name_company" className="form-label">
                  รหัสลูกค้า :
                </label>
                <input
                  type="text"
                  name="name_company"
                  className="form-input"
                  value={d.id_customer}
                  readOnly
                />
              </div>
              <div className="form-row">
                <label for="name_company" className="form-label">
                  ชื่อบริษัท :
                </label>
                <input
                  type="text"
                  name="name_company"
                  className="form-input"
                  value={d.name_company}
                  readOnly
                />
              </div>

              <div className="form-row">
                <label for="name_cus" className="form-label">
                  ชื่อลูกค้า :
                </label>
                <input
                  type="text"
                  className="form-input"
                  name="name_cus"
                  value={d.name_cus}
                  readOnly
                />
              </div>

              <div className="form-row">
                <label for="card_ID" className="form-label">
                  รหัสบัตรประชาชน :
                </label>
                <input
                  type="number"
                  className="form-input"
                  name="card_ID"
                  value={d.card_ID}
                  readOnly
                />
              </div>

              <div className="form-row">
                <label for="email_cus" className="form-label">
                  อีเมลล์ :
                </label>
                <input
                  type="email"
                  className="form-input"
                  name="email_cus"
                  value={d.email_cus}
                  readOnly
                />
              </div>

              <div className="form-row">
                <label for="phone_cus" className="form-label">
                  เบอร์โทรศัพท์ :
                </label>
                <input
                  type="text"
                  className="form-input"
                  name="phone_cus"
                  value={d.phone_cus}
                  readOnly
                />
              </div>

              <div className="form-row2">
                <label for="address_cus" className="form-label">
                  ที่อยู่ :
                </label>
                <input
                  type="text"
                  className="form-input"
                  name="address_cus"
                  value={d.address}
                  readOnly
                />
              </div>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CreateRead;
