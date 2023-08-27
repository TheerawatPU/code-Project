import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import Topnav from "../../../component/Topnav";
import Menu from "../../../component/Menu";
import "../../../CSS/Stable.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function Stabledetel() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [Data, setdata] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5500/stableID/" + id)
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="all-page-new">
      <header className="header-new">
        <Topnav />
      </header>
      <section className="aside-new">
        <Menu />
      </section>
      <main className="main-new">
        <div className="top-text-new">
          <div className="text-new">รายละเอียดวัตถุดิบ</div>
        </div>

        {Data.map((d, index) => (
          <div className="box-big-bg-new" key={index}>
            <div className="box-BG-area-new">
              <form className="form-stable-new">
                <div className="form-row-new">
                  <label className="form-label-new">รหัสวัตถุดิบ :</label>
                  <input
                    type="text"
                    className="form-input-new-read"
                    name="id_staple"
                    value={d.id_staple}
                    disabled
                  />
                </div>
                <div className="form-row-new">
                  <label className="form-label-new">ชื่อวัตถุดิบ :</label>
                  <input
                    type="text"
                    className="form-input-new-read"
                    name="Name_staple"
                    value={d.Name_staple}
                    disabled
                  />
                </div>
                <div className="form-row-new">
                  <label className="form-label-new">INCI Name :</label>
                  <input
                    type="text"
                    className="form-input-new-read"
                    name="Name_INCIname"
                    value={d.Name_INCIname}
                    disabled
                  />
                </div>
                <div className="form-row-new">
                  <label className="form-label-new">การใช้ :</label>
                  <textarea
                    type="text"
                    className="form-input-new2-read"
                    name="howUsing"
                    value={d.howUsing}
                    disabled
                  />
                </div>
                <div className="form-row-new">
                  <label className="form-label-new">การผสม :</label>
                  <textarea
                    type="text"
                    className="form-input-new2-read"
                    name="howMixing"
                    value={d.howMixing}
                    disabled
                  />
                </div>

                <div className="form-row-new">
                  <label className="form-label-new">การรักษา :</label>
                  <textarea
                    type="text"
                    className="form-input-new2-read"
                    name="saving"
                    value={d.saving}
                    disabled
                  />
                </div>

                <div className="form-row-new">
                  <label className="form-label-new">การละลาย :</label>
                  <textarea
                    type="text"
                    className="form-input-new2-read"
                    name="melting"
                    value={d.melting}
                    disabled
                  />
                </div>

                <div className="form-row-new">
                  <label className="form-label-new">จุดสั่งซื้อ :</label>
                  <input
                    type="text"
                    className="form-input-new-read"
                    name="reOrder"
                    value={d.reOrder}
                    disabled
                  />
                </div>
              </form>
            </div>
            
            <div className="btn-submit-new">
              <div className="btn-area-new">
                <button
                  type="cancle"
                  className="cancle-new"
                  onClick={() => navigate(-1)}
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                  <span>ย้อนกลับ</span>
                </button>
                <button
                  type="submit"
                  className="submit-new"
                  onClick={() =>
                    navigate(
                      `/EM/StablePage/StableEdit/${d.id_staple}`
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

export default Stabledetel;
