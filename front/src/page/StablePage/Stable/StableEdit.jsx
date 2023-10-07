import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Topnav from "../../../component/Topnav";
import Menu from "../../../component/Menu";
import "../../../CSS/Stable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";

import { FaArrowLeftLong } from "react-icons/fa6";

function StableEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      //อัพเดตข้อมูล
      .get("http://localhost:5500/stableIdUpdate/" + id)
      .then((res) => {
        console.log(res);
        setValues({
          ...values,
          id_staple: res.data[0].id_staple,
          Name_staple: res.data[0].Name_staple,
          Name_INCIname: res.data[0].Name_INCIname,
          howUsing: res.data[0].howUsing,
          howMixing: res.data[0].howMixing,
          saving: res.data[0].saving,
          melting: res.data[0].melting,
          reOrder: res.data[0].reOrder,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const [values, setValues] = useState({
    Name_staple: "",
    Name_INCIname: "",
    howUsing: "",
    howMixing: "",
    saving: "",
    melting: "",
    reOrder: "",
  });

  const handleUpdate = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:5500/stableUpdate/" + id, values)
      .then((res) => {
        console.log(res);
        navigate("/EM/StablePage");
      })
      .catch((err) => console.log(err));
  };

  console.log(values);

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
          <div className="text-new" style={{cursor:"pointer"}} onClick={() => navigate(-1)}>
            <FaArrowLeftLong />
          </div>
          <div className="text-new">แก้ไขข้อมูลวัตถุดิบ</div>
        </div>

        <div className="text-new-lg">
          กรุณากรอกข้อมูลให้ครบทุกช่อง ถ้าไม่มีให้ใส่เครื่องหมาย - ไว้
        </div>
        <div className="box-big-bg-new">
          <div className="box-BG-area-new">
            <form className="form-stable-new" onSubmit={handleUpdate}>
              <div className="form-row-new">
                <label className="form-label-new">รหัสวัตถุดิบ :</label>
                <input
                  style={{ background: "#e5e5e5", border: "none" }}
                  type="text"
                  className="form-input-new"
                  name="id_staple"
                  value={values.id_staple}
                  disabled
                  onChange={(e) =>
                    setValues({ ...values, id_staple: e.target.value })
                  }
                />
              </div>

              <div className="form-row-new">
                <label className="form-label-new">
                  <p>*</p>ชื่อวัตถุดิบ :
                </label>
                <input
                  type="text"
                  className="form-input-new"
                  name="Name_staple"
                  value={values.Name_staple}
                  onChange={(e) =>
                    setValues({ ...values, Name_staple: e.target.value })
                  }
                />
              </div>
              <div className="form-row-new">
                <label className="form-label-new">
                  <p>*</p>INCI Name :
                </label>
                <input
                  type="text"
                  className="form-input-new"
                  name="Name_INCIname"
                  value={values.Name_INCIname}
                  onChange={(e) =>
                    setValues({ ...values, Name_INCIname: e.target.value })
                  }
                />
              </div>
              <div className="form-row-new">
                <label className="form-label-new">
                  <p>*</p>การใช้ :
                </label>
                <textarea
                  type="text"
                  className="form-input-new2"
                  name="howUsing"
                  value={values.howUsing}
                  onChange={(e) =>
                    setValues({ ...values, howUsing: e.target.value })
                  }
                />
              </div>
              <div className="form-row-new">
                <label className="form-label-new">
                  <p>*</p>การผสม :
                </label>
                <textarea
                  type="text"
                  className="form-input-new2"
                  name="howMixing"
                  value={values.howMixing}
                  onChange={(e) =>
                    setValues({ ...values, howMixing: e.target.value })
                  }
                />
              </div>

              <div className="form-row-new">
                <label className="form-label-new">
                  <p>*</p>การรักษา :
                </label>
                <textarea
                  type="text"
                  className="form-input-new2"
                  name="saving"
                  value={values.saving}
                  onChange={(e) =>
                    setValues({ ...values, saving: e.target.value })
                  }
                />
              </div>

              <div className="form-row-new">
                <label className="form-label-new">
                  <p>*</p>การละลาย :
                </label>
                <textarea
                  type="text"
                  className="form-input-new2"
                  name="melting"
                  value={values.melting}
                  onChange={(e) =>
                    setValues({ ...values, melting: e.target.value })
                  }
                />
              </div>

              <div className="form-row-new">
                <label className="form-label-new">
                  <p>*</p>จุดสั่งซื้อ :
                </label>
                <input
                  type="text"
                  className="form-input-new"
                  name="reOrder"
                  value={values.reOrder}
                  onChange={(e) =>
                    setValues({ ...values, reOrder: e.target.value })
                  }
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
                <FontAwesomeIcon icon={faXmark} />
                <span>ยกเลิก</span>
              </button>
              <button
                type="submit"
                className="submit-new"
                onClick={handleUpdate}
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

export default StableEdit;
