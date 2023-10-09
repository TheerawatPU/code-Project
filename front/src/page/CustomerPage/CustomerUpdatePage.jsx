import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import Topnav from "../../component/Topnav";
import Menu from "../../component/Menu";
import "../../CSS/CustomerNew.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ImCancelCircle } from "react-icons/im";

function CustomerUpdatePage() {
  const [province, setProvince] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subdistricts, setSubdistricts] = useState([]);

  // //! จังหวัด อำเภอ ตำบล
  useEffect(() => {
    //ดึงข้อมูลจังหวัด
    axios
      .get("http://localhost:5500/api/province")
      .then((res) => {
        setProvince(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onChangeProvince = (e) => {
    let index = e.nativeEvent.target.selectedIndex;
    let label = e.nativeEvent.target[index].text;
    setValues({ ...values, [e.target.name]: label });
    // setValues({ ...values, provinces: e.target.value });

    const id = e.target.value;
    axios
      .get(`http://localhost:5500/api/province/${id}/districts`)
      .then((res) => {
        setDistricts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onChangeDistricts = (e) => {
    let index = e.nativeEvent.target.selectedIndex;
    let label = e.nativeEvent.target[index].text;
    setValues({ ...values, [e.target.name]: label });

    const id = e.target.value;
    axios
      //อ่านข้อมูลแต่ละไอดี
      .get(`http://localhost:5500/api/districts/${id}`)
      .then((res) => {
        setSubdistricts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onChangeSubdistricts = (e) => {
    // let index = e.nativeEvent.target.selectedIndex;
    // let label = e.nativeEvent.target[index].text;
    const filterDistrict = subdistricts.filter((item) => {
      return e.target.value == item.id;
    });
    console.log(filterDistrict[0].name_in_thai);
    console.log(filterDistrict[0].zip_code);

    setValues({
      ...values,
      [e.target.name]: filterDistrict[0].name_in_thai,
      zip_code: filterDistrict[0].zip_code,
    });
    console.log(e.target.value);
  };

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      //อัพเดตข้อมูล
      .get("http://localhost:5500/customerUpdate/" + id)
      .then((res) => {
        console.log(res);
        setValues({
          ...values,
          id_customer: res.data[0].id_customer,
          name_company: res.data[0].name_company,
          name_cus: res.data[0].name_cus,
          card_ID: res.data[0].card_ID,
          email_cus: res.data[0].email_cus,
          phone_cus: res.data[0].phone_cus,
          address_cus: res.data[0].address_cus,
          provinces: res.data[0].provinces,
          districts: res.data[0].districts,
          subdistricts: res.data[0].subdistricts,
          zip_code: res.data[0].zip_code,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const [values, setValues] = useState({
    name_company: "",
    name_cus: "",
    card_ID: "",
    email_cus: "",
    phone_cus: "",
    address_cus: "",
    provinces: "",
    districts: "",
    subdistricts: "",
    zip_code: "",
  });

  const handleUpdate = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:5500/customerUp/" + id, values)
      .then((res) => {
        console.log(res);
        navigate("/EM/CustomerReadPage");
      })
      .catch((err) => console.log(err));
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
        <div className="box-big-bg-new-C">
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

            <form className="form-customer-new-C" onSubmit={handleUpdate}>
              <div className="form-row-new-C">
                <label className="form-label-new-C">รหัสลูกค้า :</label>
                <input
                  style={{ background: "#e5e5e5", border: "none" }}
                  name="id"
                  type="text"
                  className="form-input-new"
                  disabled
                  value={values.id_customer}
                  onChange={(e) =>
                    setValues({ ...values, id_customer: e.target.value })
                  }
                />
              </div>

              <div className="row-customer">
                <div className="form-row-new-C">
                  <label className="form-label-new-C">
                    <p>*</p>ชื่อบริษัท :
                  </label>
                  <input
                    name="name_company"
                    type="text"
                    className="form-input-new"
                    value={values.name_company}
                    onChange={(e) =>
                      setValues({ ...values, name_company: e.target.value })
                    }
                  />
                  {/* {errors.name_company && (
                  <span className="text-danger">{errors.name_company}</span>
                )} */}
                </div>

                <div className="form-row-new-C">
                  <label className="form-label-new-C">
                    <p>*</p>ชื่อลูกค้า :
                  </label>
                  <input
                    name="name_cus"
                    type="text"
                    className="form-input-new"
                    value={values.name_cus}
                    onChange={(e) =>
                      setValues({ ...values, name_cus: e.target.value })
                    }
                  />
                  {/* {errors.name_cus && (
                  <span className="text-danger">{errors.name_cus}</span>
                )} */}
                </div>
              </div>

              <div className="form-row-new-C">
                <label className="form-label-new-C">
                  <p>*</p>รหัสบัตรประชาชน :
                </label>
                <input
                  name="card_ID"
                  type="text"
                  className="form-input-new-C"
                  value={values.card_ID}
                  onChange={(e) =>
                    setValues({ ...values, card_ID: e.target.value })
                  }
                />
                {/* {errors.card_ID && (
                  <span className="text-danger">{errors.card_ID}</span>
                )} */}
              </div>

              <div className="row-customer">
                <div className="form-row-new-C">
                  <label className="form-label-new-C">
                    <p>*</p>อีเมล :
                  </label>
                  <input
                    name="email_cus"
                    type="email"
                    className="form-input-new"
                    value={values.email_cus}
                    onChange={(e) =>
                      setValues({ ...values, email_cus: e.target.value })
                    }
                  />
                  {/* {errors.email_cus && (
                  <span className="text-danger">{errors.email_cus}</span>
                )} */}
                </div>
                <div className="form-row-new-C">
                  <label className="form-label-new-C">
                    <p>*</p>เบอร์โทรศัพท์ :
                  </label>
                  <input
                    name="phone_cus"
                    type="text"
                    className="form-input-new"
                    value={values.phone_cus}
                    onChange={(e) =>
                      setValues({ ...values, phone_cus: e.target.value })
                    }
                  />
                  {/* {errors.phone_cus && (
                  <span className="text-danger">{errors.phone_cus}</span>
                )} */}
                </div>
              </div>

              <div className="form-row-new-C">
                <label className="form-label-new-C">
                  <p>*</p>ที่อยู่ :
                </label>
                <textarea
                  type="text"
                  className="form-input-new2-C"
                  name="address_cus"
                  value={values.address_cus}
                  onChange={(e) =>
                    setValues({ ...values, address_cus: e.target.value })
                  }
                />
              </div>

              <div className="form-row-new-select-C">
                <div className="select-row-C">
                  <select
                    className="form-input-select-C"
                    onChange={(e) => onChangeProvince(e)}
                    name="provinces"
                  >
                    <option>{values.provinces}</option>
                    {province.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name_in_thai}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="select-row-C">
                  <select
                    className="form-input-select-C"
                    onChange={(e) => onChangeDistricts(e)}
                    name="districts"
                  >
                    <option>{values.districts}</option>
                    {districts.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name_in_thai}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="select-row-C">
                  <select
                    className="form-input-select-C"
                    onChange={(e) => onChangeSubdistricts(e)}
                    name="subdistricts"
                  >
                    <option>{values.subdistricts}</option>
                    {subdistricts.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name_in_thai}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="select-row-C">
                  <input
                    style={{ background: "#e5e5e5", border: "none" }}
                    type="text"
                    className="form-input-select-C"
                    name="zip_code"
                    value={values.zip_code}
                    disabled
                  />
                </div>
              </div>
              {/* <div className="form-error-C">
                <span className="text-danger">{errors.address_cus}</span>
              </div> */}
            </form>
          </div>

          {/* <div className="btn-submit-new-C">
            <div className="btn-area-new-C">
              <button
                type="cancle"
                className="cancle-new-C"
                onClick={() => navigate(-1)}
              >
                <FontAwesomeIcon icon={faXmark} />
                <span>ยกเลิก</span>
              </button>
              <button
                type="submit"
                className="submit-new-C"
                onClick={(e) => {
                  handleUpdate(e);
                }}
              >
                <FontAwesomeIcon icon={faFloppyDisk} />
                <span>บันทึก</span>
              </button>
            </div>
          </div> */}
        </div>
      </main>
    </div>
  );
}

export default CustomerUpdatePage;
