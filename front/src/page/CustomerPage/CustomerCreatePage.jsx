import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Validation from "../../function/CusValidate";

import Topnav from "../../component/Topnav";
import Menu from "../../component/Menu";
import "../../CSS/CustomerNew.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";

function CustomerCreatePage() {
  const [province, setProvince] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subdistricts, setSubdistricts] = useState([]);

  const navigate = useNavigate();
  //! จังหวัด อำเภอ ตำบล
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
  //! สิ้นสุดจังหวัด อำเภอ ตำบล

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

  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    // ตรวจสอบและลบขีดคั่นออกจากเบอร์โทรศัพท์
    const formattedPhone = values.phone_cus.replace(/-/g, "");

    const err = Validation({ ...values, phone_cus: formattedPhone });
    setErrors(err);

    if (
      err.name_company === "" &&
      err.name_cus === "" &&
      err.card_ID === "" &&
      err.email_cus === "" &&
      err.phone_cus === "" &&
      err.address_cus === ""
    ) {
      axios
        .post("http://localhost:5500/cuscreate", {
          ...values,
          phone_cus: formattedPhone,
        })
        .then((res) => {
          console.log(res);
          navigate("/EM/CustomerReadPage");
        })
        .catch((err) => console.log(err));
    }

    // ถึงตรงนี้------------------------------------

    console.log(phoneNumber);
  };

  const [phoneNumber, setPhoneNumber] = useState("");
  const [cradID, setCradID] = useState("");

  const handleInput = (event) => {
    const { name, value } = event.target;

    if (name === "card_ID") {
      const formattedCardID = value.replace(/-/g, "");
      const formattedText1 = formattedCardID
        .replace(/\D/g, "")
        .slice(0, 13)
        .replace(/(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})/, "$1-$2-$3-$4-$5");

      setCradID(formattedText1);
      setValues((prev) => ({ ...prev, [name]: formattedText1 }));
    }
    if (name === "phone_cus") {
      const formattedPhoneNumber = value.replace(/-/g, "");
      const formattedText = formattedPhoneNumber.replace(/\D/g, "");

      // ตรวจสอบเงื่อนไขเพื่อให้ตัวเลขในเบอร์โทรศัพท์เป็นเฉพาะตัวเลขและตัดจำนวนให้เหลือเพียง 10 หรือ 9 ตัว
      let formattedPhoneNumberFinal;
      if (formattedText.length === 9) {
        formattedPhoneNumberFinal = formattedText.replace(
          /(\d{2})(\d{3})(\d{4})/,
          "$1-$2-$3"
        );
      } else {
        formattedPhoneNumberFinal = formattedText
          .slice(0, 10)
          .replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
      }

      setPhoneNumber(formattedPhoneNumberFinal);
      setValues((prev) => ({ ...prev, [name]: formattedPhoneNumberFinal }));
    } else {
      setValues((prev) => ({ ...prev, [name]: value }));
    }
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
        <div className="top-text-new-C">
          <div className="text-new-C">เพิ่มข้อมูลข้อมูลลูกค้า</div>
        </div>

        <div className="text-new-lg-C">
          กรุณากรอกข้อมูลให้ครบทุกช่อง ถ้าไม่มีให้ใส่เครื่องหมาย - ไว้
        </div>

        <div className="box-big-bg-new-C">
          <div className="box-BG-area-new-C">
            <form className="form-stable-new-C" onSubmit={handleSubmit}>
              <div className="form-row-new-C">
                <label className="form-label-new-C">
                  <p>*</p>ชื่อบริษัท :
                </label>
                <input
                  name="name_company"
                  type="text"
                  className="form-input-new"
                  onChange={handleInput}
                />
                {errors.name_company && (
                  <p className="text-danger">{errors.name_company}</p>
                )}
              </div>
              <div className="form-row-new-C">
                <label className="form-label-new-C">
                  <p>*</p>ชื่อลูกค้า :
                </label>
                <input
                  name="name_cus"
                  type="text"
                  className="form-input-new-C"
                  onChange={handleInput}
                />
                {errors.name_cus && <p>{errors.name_cus}</p>}
              </div>
              <div className="form-row-new-C">
                <label className="form-label-new-C">
                  <p>*</p>รหัสบัตรประชาชน :
                </label>
                <input
                  name="card_ID"
                  type="text"
                  className="form-input-new-C"
                  onChange={handleInput}
                  value={cradID}
                  maxLength={17}
                  required
                />
                {errors.card_ID && <p>{errors.card_ID}</p>}
              </div>
              <div className="form-row-new-C">
                <label className="form-label-new-C">
                  <p>*</p>อีเมล :
                </label>
                <input
                  name="email_cus"
                  type="email"
                  className="form-input-new-C"
                  onChange={handleInput}
                />
                {errors.email_cus && <p>{errors.email_cus}</p>}
              </div>
              <div className="form-row-new-C">
                <label className="form-label-new-C">
                  <p>*</p>เบอร์โทรศัพท์ :
                </label>
                <input
                  name="phone_cus"
                  type="text"
                  className="form-input-new-C"
                  onChange={handleInput}
                  value={phoneNumber}
                  maxLength={12}
                  required
                />
                {errors.phone_cus && <p>{errors.phone_cus}</p>}
              </div>

              <div className="form-row-new-C">
                <label className="form-label-new-C">
                  <p>*</p>ที่อยู่ :
                </label>
                <textarea
                  type="text"
                  className="form-input-new2-C"
                  name="address_cus"
                  onChange={handleInput}
                />
              </div>

              <div className="form-row-new-select-C">
                <div className="select-row-C">
                  <select
                    className="form-input-select-C"
                    onChange={(e) => onChangeProvince(e)}
                    name="provinces"
                  >
                    <option>เลือกจังหวัด</option>
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
                    <option>เลือกอำเภอ</option>
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
                    <option>เลือกตำบล</option>
                    {subdistricts.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name_in_thai}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="select-row-C">
                  <input
                    type="text"
                    className="form-input-select-C"
                    name="zip_code"
                    value={values.zip_code}
                    disabled
                  />
                </div>
              </div>
              <div className="form-error-C">
                <p>{errors.address_cus}</p>
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
                <FontAwesomeIcon icon={faXmark} />
                <span>ยกเลิก</span>
              </button>
              <button
                type="submit"
                className="submit-new-C"
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

export default CustomerCreatePage;
