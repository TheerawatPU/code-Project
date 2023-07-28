import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../../CSS/Customer.css";

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
    let index = e.nativeEvent.target.selectedIndex;
    let label = e.nativeEvent.target[index].text;
    setValues({ ...values, [e.target.name]: label });

    console.log(e.target.value);
  };
  const onchangeData = (e) => {
    setValues({ ...values });
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
          name_company: res.data[0].name_company,
          name_cus: res.data[0].name_cus,
          card_ID: res.data[0].card_ID,
          email_cus: res.data[0].email_cus,
          phone_cus: res.data[0].phone_cus,
          address_cus: res.data[0].address_cus,
          provinces: res.data[0].provinces,
          districts: res.data[0].districts,
          subdistricts: res.data[0].subdistricts,
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
  });

  const handleUpdate = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:5500/customerUp/" + id, values)
      .then((res) => {
        console.log(res);
        navigate("/CustomerReadPage");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="box">
        <h2>แก้ไขข้อมูลลูกค้า</h2>
        <div className="g-btn">
          <button className="cancle-btn" onClick={() => navigate(-1)}>
            ยกเลิก
          </button>
          <button type="submit" className="save-btn" onClick={handleUpdate}>
            บันทึก
          </button>
        </div>

        {/* //! todo เริ่มจากต้นนี้----------------------------------------------------// */}
        <div className="con">
          <form onSubmit={handleUpdate}>
            <div className="form-row">
              <label className="form-label">
                <p>*</p>ชื่อบริษัท :
              </label>
              <input
                type="text"
                name="name_company"
                className="form-input"
                value={values.name_company}
                onChange={(e) =>
                  setValues({ ...values, name_company: e.target.value })
                }
              />
            </div>

            <div className="form-row">
              <label className="form-label">
                <p>*</p>ชื่อลูกค้า :
              </label>
              <input
                type="text"
                className="form-input"
                name="name_cus"
                value={values.name_cus}
                onChange={(e) =>
                  setValues({ ...values, name_cus: e.target.value })
                }
              />
            </div>

            <div className="form-row">
              <label className="form-label">
                <p>*</p>รหัสบัตรประชาชน :
              </label>
              <input
                type="text"
                className="form-input"
                name="card_ID"
                value={values.card_ID}
                onChange={(e) =>
                  setValues({ ...values, card_ID: e.target.value })
                }
              />
            </div>

            <div className="form-row">
              <label className="form-label">
                <p>*</p>อีเมล :
              </label>
              <input
                type="email"
                className="form-input"
                name="email_cus"
                value={values.email_cus}
                onChange={(e) =>
                  setValues({ ...values, email_cus: e.target.value })
                }
              />
            </div>

            <div className="form-row">
              <label className="form-label">
                <p>*</p>เบอร์โทรศัพท์ :
              </label>
              <input
                type="text"
                className="form-input"
                name="phone_cus"
                value={values.phone_cus}
                onChange={(e) =>
                  setValues({ ...values, phone_cus: e.target.value })
                }
              />
            </div>

            <div className="form-row2">
              <label className="form-label">
                <p>*</p>ที่อยู่ :
              </label>
              <input
                type="text"
                className="form-input"
                name="address_cus"
                value={values.address_cus}
                onChange={(e) =>
                  setValues({ ...values, address_cus: e.target.value })
                }
              />
            </div>

            <div className="form-row1">
              <div className="select-row">
                <select
                  className="form-input1"
                  value={values.provinces}
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
            </div>
          </form>
        </div>
        {/* ))} */}
      </div>
    </div>
  );
}

export default CustomerUpdatePage;
