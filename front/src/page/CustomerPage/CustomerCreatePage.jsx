import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Validation from "../../function/CusValidate";
import "../../CSS/Customer.css";

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


  // แก้ตรงนี้------------------------------------

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
          navigate("/CustomerReadPage");
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
    <div>
      <div className="box">
        <h2>เพิ่มข้อมูลลูกค้า</h2>
        <div className="g-btn">
          <button className="cancle-btn" onClick={() => navigate(-1)}>
            ยกเลิก
          </button>
          <button
            type="submit"
            className="save-btn"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            บันทึก
          </button>
        </div>

        {/* //! todo เริ่มจากต้นนี้----------------------------------------------------// */}

        <div className="con">
          {/* <pre>{JSON.stringify(formValues, undefined, 2)}</pre> */}
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <label className="form-label">
                <p>*</p>ชื่อบริษัท :
              </label>
              <input
                type="text"
                name="name_company"
                className="form-input"
                onChange={handleInput}
              />
              {errors.name_company && (
                <span className="text-danger">{errors.name_company}</span>
              )}
            </div>
            <div className="form-row">
              <label className="form-label">
                <p>*</p>ชื่อลูกค้า :
              </label>
              <input
                type="text"
                className="form-input"
                name="name_cus"
                onChange={handleInput}
              />
              {errors.name_cus && (
                <span className="text-danger">{errors.name_cus}</span>
              )}
            </div>
            <div className="form-row">
              <label className="form-label">
                <p>*</p>รหัสบัตรประชาชน :
              </label>
              <input
                type="text"
                className="form-input"
                name="card_ID"
                value={cradID}
                onChange={handleInput}
                maxLength={17}
                required
              />
              {errors.card_ID && (
                <span className="text-danger">{errors.card_ID}</span>
              )}
            </div>
            <div className="form-row">
              <label className="form-label">
                <p>*</p>อีเมล :
              </label>
              <input
                type="email"
                className="form-input"
                name="email_cus"
                onChange={handleInput}
              />
              {errors.email_cus && (
                <span className="text-danger">{errors.email_cus}</span>
              )}
            </div>

            <div className="form-row">
              <label className="form-label">
                <p>*</p>เบอร์โทรศัพท์ :
              </label>
              <input
                type="text"
                className="form-input"
                name="phone_cus"
                // onChange={handleInput}
                value={phoneNumber}
                onChange={handleInput}
                maxLength={12}
                required
              />

              {errors.phone_cus && (
                <span className="text-danger">{errors.phone_cus}</span>
              )}
            </div>
            <div className="form-row2">
              <label className="form-label">
                <p>*</p>ที่อยู่ :
              </label>
              <input
                type="text"
                className="form-input"
                name="address_cus"
                onChange={handleInput}
              />
              {/* {errors.address_cus && (
                <span className="text-danger">{errors.address_cus}</span>
              )} */}
            </div>
            <div className="form-row1">
              <div className="select-row">
                <select
                  className="form-input1"
                  // value={formValues.provinces}
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

              <div className="select-row">
                <select
                  className="form-input1"
                  // value={formValues.districts}
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

              <div className="select-row">
                <select
                  className="form-input1"
                  // value={formValues.subdistricts}
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

              <div className="select-row">
                <input
                  style={{ width: "140px", height: "30px" }}
                  type="text"
                  className="form-input"
                  name="zip_code"
                  value={values.zip_code}
                  disabled

                  // onChange={handleInput}
                />
              </div>
            </div>
            <div className="form-row5">
              <span className="text-danger">{errors.address_cus}</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CustomerCreatePage;
