import React, { useEffect, useState } from "react";
import MenuAD from "./ComponentAD/MenuAD";
import TopNavAD from "./ComponentAD/TopNavAD";
import { FaPen, FaEye } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";

function EmployeeUpdatePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      //อัพเดตข้อมูล
      .get("http://localhost:5500/employeeUpdateID/" + id)
      .then((res) => {
        console.log(res);
        setValues({
          ...values,
          id_employee: res.data[0].id_employee,
          department: res.data[0].department,
          status: res.data[0].status,
          title: res.data[0].title,
          name: res.data[0].name,
          sex: res.data[0].sex,
          birthday: res.data[0].birthday,
          phone: res.data[0].phone,
          line_id: res.data[0].line_id,
          facebook_id: res.data[0].facebook_id,
          username: res.data[0].username,
          password: res.data[0].password,
          image: res.data[0].image,
          card_id: res.data[0].card_id,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const [values, setValues] = useState({
    department: "",
    status: "",
    title: "",
    name: "",
    sex: "",
    birthday: "",
    phone: "",
    line_id: "",
    facebook_id: "",
    username: "",
    password: "",
    image: "",
    card_id: "",
  });

  console.log(values);

  const handleUpdate = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:5500/employeeUpdate/" + id, values)
      .then((res) => {
        console.log(res);
        navigate("/AD/EmployeeReadPage");
      })
      .catch((err) => console.log(err));
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const handleInput = (event) => {
    const { name, value } = event.target;

    if (name === "image") {
      const selectedFile = event.target.files[0]; // Get the selected image file
      if (selectedFile) {
        setSelectedImage(selectedFile); // Set the selected image to the state

        const reader = new FileReader();
        reader.onload = (event) => {
          const base64Image = event.target.result;

          // นำรูปภาพมาเพิ่มใน values
          setValues({
            ...values,
            image: base64Image,
          });

          // นำ base64 ของรูปภาพไปเก็บลงในโฟลเดอร์ (ถ้าต้องการ)
          // saveBase64ImageToFile(base64Image);
        };

        reader.readAsDataURL(selectedFile);
      }
    }

    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="all-page-new">
      <header className="header-new">
        <TopNavAD />
      </header>
      <section className="aside-new">
        <MenuAD />
      </section>
      <main className="main-new">
        <div className="top-text-new">
          <div className="text-new" style={{ marginLeft: "80px" }}>
            แก้ไขข้อมูลพนักงาน
          </div>
        </div>

        <div className="text-new-lg" style={{ marginLeft: "80px" }}>
          กรุณากรอกข้อมูลให้ครบทุกช่อง ถ้าไม่มีให้ใส่เครื่องหมาย - ไว้
        </div>

        <div className="box-big-bg-new-EM">
          {/* //!ฟอร์มที่1 รูป */}
          <div className="box-BG-area-new-EM">
            <form className="form-EM-new" onSubmit={handleUpdate}>
              <div className="form-row-img-AD">
                <img src={values.image} alt="" className="img-AD" />
              </div>
              <div className="form-row-new">
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleInput}
                  // onChange={onImageChange}
                />
              </div>
            </form>
          </div>
          {/* //!ฟอร์มที่2 ข้อมูลส่วนตัว */}
          <div className="box-BG-area-new-EM">
            <form className="form-EM-new" onSubmit={handleUpdate}>
              {/* เลือกตำแหน่ง และสถานะ */}
              <h2 style={{ marginBottom: "20px" }}>ข้อมูลส่วนตัว</h2>
              <div className="form-row-new-select-EM">
                <div className="select-row-C">
                  <label className="form-label-new-EM">
                    <p>*</p>ตำแหน่ง :
                  </label>
                  <select
                    className="form-input-select-EM"
                    name="department"
                    // value={values.department}
                    onChange={(e) =>
                      setValues({ ...values, department: e.target.value })
                    }
                  >
                    <option>{values.department}</option>
                    <option value="พนักงานฝ่ายขาย">พนักงานฝ่ายขาย</option>
                    <option value="พนักงานฝ่ายผลิต">พนักงานฝ่ายผลิต</option>
                    <option value="ผู้ดูแลระบบ">ผู้ดูแลระบบ</option>
                  </select>
                </div>

                <div className="select-row-C">
                  <label className="form-label-new-EM">
                    <p>*</p>สถานะการทำงาน :
                  </label>
                  <select
                    className="form-input-select-EM"
                    name="status"
                    // value={values.status}
                    onChange={(e) =>
                      setValues({ ...values, status: e.target.value })
                    }
                  >
                    <option>{values.status}</option>
                    <option value="กำลังทำงาน">กำลังทำงาน</option>
                    <option value="พ้นสภาพการทำงาน">พ้นสภาพการทำงาน</option>
                  </select>
                </div>
              </div>

              {/*คำนำหน้า ชื่อ-นามสกุล */}
              <div className="form-row-new-select-EM">
                <div className="select-row-C">
                  <label className="form-label-new-EM">
                    <p>*</p>คำนำหน้า :
                  </label>
                  <select
                    className="form-input-select-title-EM"
                    name="title"
                    onChange={(e) =>
                      setValues({ ...values, title: e.target.value })
                    }
                    // value={values.title}
                  >
                    <option>{values.title}</option>
                    <option value="นาย">นาย</option>
                    <option value="นาง">นาง</option>
                    <option value="นางสาว">นางสาว</option>
                  </select>
                </div>

                <div className="select-row-C">
                  <label className="form-label-new-EM">
                    <p>*</p>ชื่อ-นามสกุล :
                  </label>
                  <input
                    name="name"
                    type="text"
                    className="form-input-new-title-EM"
                    value={values.name}
                    onChange={(e) =>
                      setValues({ ...values, name: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* เพศ วันเกิด */}
              <div className="form-row-new-select-EM-Radio">
                <div className="select-row-Radio">
                  <div className="btn-Radio">
                    <label className="form-label-new-EM">
                      <p>*</p>เพศ :
                    </label>
                    <div className="radio-EM">
                      <input
                        name="sex"
                        value="ชาย"
                        type="radio"
                        className="form-input-new-title-Radio-EM"
                        onChange={(e) =>
                          setValues({ ...values, sex: e.target.value })
                        }
                      />
                      <span>ชาย</span>
                      <input
                        name="sex"
                        value="หญิง"
                        type="radio"
                        className="form-input-new-title-Radio-EM"
                        onChange={(e) =>
                          setValues({ ...values, sex: e.target.value })
                        }
                      />
                      <span>หญิง</span>
                    </div>
                  </div>
                </div>

                <div className="select-row-C">
                  <label className="form-label-new-EM">
                    <p>*</p>วันเดือนปีเกิด :
                  </label>
                  <input
                    name="birthday"
                    type="date"
                    className="form-input-new-title-EM"
                    value={values.birthday}
                    onChange={(e) =>
                      setValues({ ...values, birthday: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* เบอร์โทร IDLine Facebook */}

              <div className="form-row-new-select-EM">
                <div className="select-row-C">
                  <label className="form-label-new-EM">
                    <p>*</p>เบอร์โทรศัพท์ :
                  </label>
                  <input
                    name="phone"
                    type="text"
                    className="form-input-new-3-EM"
                    value={values.phone}
                    onChange={(e) =>
                      setValues({ ...values, phone: e.target.value })
                    }
                  />
                </div>
                <div className="select-row-C">
                  <label className="form-label-new-EM">
                    <p>*</p>ไอดีไลน์ :
                  </label>
                  <input
                    name="line_id"
                    type="text"
                    className="form-input-new-3-EM"
                    value={values.line_id}
                    onChange={(e) =>
                      setValues({ ...values, line_id: e.target.value })
                    }
                  />
                </div>
                <div className="select-row-C">
                  <label className="form-label-new-EM">
                    <p>*</p>เฟสบุ๊ค :
                  </label>
                  <input
                    name="facebook_id"
                    type="text"
                    className="form-input-new-3-EM"
                    value={values.facebook_id}
                    onChange={(e) =>
                      setValues({ ...values, facebook_id: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-row-new">
                <label className="form-label-new">
                  <p>*</p>รหัสบัตรประชาชน :
                </label>
                <input
                  name="card_id"
                  type="text"
                  className="form-input-new-EM"
                  value={values.card_id}
                  onChange={(e) =>
                    setValues({ ...values, card_id: e.target.value })
                  }
                />
              </div>
            </form>
          </div>
          {/* //!ฟอร์มที่3 บัญชีผู้ใช้ */}
          <div className="box-BG-area-new-EM">
            <form className="form-EM-new" onSubmit={handleUpdate}>
              <h2 style={{ marginBottom: "20px" }}>บัญชีผู้ใช้</h2>
              <div className="form-row-new">
                <label className="form-label-new">
                  <p>*</p>อีเมล :
                </label>
                <input
                  name="username"
                  type="text"
                  className="form-input-new-EM"
                  value={values.username}
                  onChange={(e) =>
                    setValues({ ...values, username: e.target.value })
                  }
                />
              </div>
              <div className="form-row-new">
                <label className="form-label-new">
                  <p>*</p>รหัสผ่าน :
                </label>
                <input
                  name="password"
                  type="password"
                  className="form-input-new-EM"
                  value={values.password}
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                />
              </div>
              {/* <div className="form-row-new">
                <label className="form-label-new">
                  <p>*</p>ยืนยันรหัสผ่าน :
                </label>
                <input type="text" className="form-input-new-EM" />
              </div> */}
            </form>
          </div>
          {/* //!ปุ่ม */}
          <div className="btn-submit-new">
            <div className="btn-area-new" style={{ width: "60%" }}>
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

export default EmployeeUpdatePage;
