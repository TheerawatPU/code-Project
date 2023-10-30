import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../CSS/Modal.css";

function Model({ open, onClose, id_staple, nameS, grams }) {
  if (!open) return null;

  const [dataFromApi, setDataFromApi] = useState([]);

  useEffect(() => {
    if (open) {
      axios
        .get(`http://localhost:5500/Product_detail/${id_staple}`)
        .then((response) => {
          setDataFromApi(response.data);
        })
        .catch((error) => {
          console.error("เกิดข้อผิดพลาดในการดึงข้อมูลวัตถุดิบ :", error);
        });
    }
  }, [open, id_staple]);

  //! เซ็คหมดอายุ
  // เวลาปัจจุบัน
  const currentDate = new Date();
  // เวลาในระยะ 30 วัน
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(currentDate.getDate() + 30);

  // todo
  // ฟังก์ชั่น การกดปุ่มเพิ่มในตารางเพื่อนำไปตัดสต๊อก
  const [selectedAmount, setSelectedAmount] = useState(0);

  const handleSelectQuantity = (item, quantity) => {
    // อัปเดต item.selectedAmount เมื่อกดปุ่มเพื่อเก็บค่าปริมาณที่เลือก
    item.selectedAmount = quantity;

    // ทำอื่นๆ ที่คุณต้องการในฟังก์ชันนี้
    console.log(`เลือกปริมาณสาร ${quantity} ของรหัส ${item.id_lot}`);

    // คำนวณค่ารวมของปริมาณที่เลือกทั้งหมด
    const totalSelectedAmount = dataFromApi.reduce(
      (total, currentItem) => total + (currentItem.selectedAmount || 0),
      0
    );

    // อัปเดตค่ารวมใน state
    setSelectedAmount(totalSelectedAmount);
  };

  // ทำปุ่มไปหน้าสั่งซื้อวัตถุดิบ
  const navigate = useNavigate();
  const Topage = () => {
    navigate("/EM/StablePage");
  };

  const [remainingAmount, setRemainingAmount] = useState(0);
  useEffect(() => {
    // คำนวณค่าเหลือ
    const remainingAmount = grams - selectedAmount;
    // อัปเดต state ของค่าเหลือ
    setRemainingAmount(remainingAmount);
  }, [selectedAmount, dataFromApi]);

  // คำนวณรวมของคอลัมน์ "ปริมาณคงเหลือ (กรัม)"
  const totalAmountInStock = dataFromApi.reduce(
    (total, item) => total + item.amount_re,
    0
  );

  return (
    <div>
      <div className={`modal ${open ? "active" : ""}`}>
        <div className="modal-content">
          <div className="modal-body">
            <div className="form-new-Unit">
              <div className="title-Name-Modal">
                <div className="title-L-Modal">
                  <h2>ล็อต {nameS}</h2>
                  <p style={{ marginBottom: "10px", fontSize: "15px" }}>
                    *ถ้าปริมาณสารที่มีในล็อตต่ำกว่าปริมาณสารที่ใช้
                    (ตัวหนังสือสีแดง) ให้กดสั่งซื้อวัตถุดิบ
                  </p>
                </div>

                <div className="title-R-Modal">
                  <button
                    style={{ background: "red", color: "white" }}
                    onClick={onClose}
                  >
                    ยกเลิก
                  </button>
                  <button style={{ background: "blue", color: "white" }}>
                    ตกลง
                  </button>
                </div>
              </div>

              <div className="input-Modal">
                <div className="input-Modal1">
                  <div className="form1-1-2">
                    <label className="form-label1-1">ปริมาณสารที่ใช้ :</label>
                    <input
                      type="text"
                      className="form-input1-1-R"
                      disabled
                      value={`${grams} กรัม`}
                    />
                  </div>
                  <div className="form1-1-2">
                    <label className="form-label1-1">รวมปริมาณสาร :</label>
                    <input
                      type="text"
                      className="form-input1-1-R"
                      disabled
                      value={`${selectedAmount} กรัม`}
                    />
                  </div>
                  <div className="form1-1-2">
                    <label className="form-label1-1">ปริมาณสารเหลืออีก :</label>
                    <input
                      type="text"
                      className="form-input1-1-R"
                      disabled
                      value={`${remainingAmount} กรัม`}
                    />
                  </div>
                  <div className="form1-1-2">
                    <label className="form-label1-1">
                      ปริมาณสารที่มีในล็อต :
                    </label>
                    <input
                      type="text"
                      className="form-input1-1-R"
                      disabled
                      value={`${totalAmountInStock} กรัม`}
                      style={{
                        color: totalAmountInStock > grams ? "black" : "red",
                      }}
                    />
                  </div>
                </div>

                <div className="input-Modal2">
                  <div
                    className="form1-1-2"
                    style={{
                      marginRight: "0px",
                    }}
                  >
                    <button
                      style={{
                        background: "#191D88",
                        color: "white",
                        fontSize: "15px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onClick={Topage}
                    >
                      สั่งซื้อวัตถุดิบ
                    </button>
                  </div>
                </div>
              </div>

              <div class="table-body-Unit">
                <div class="table-body-Unit">
                  <table class="styled-table-Unit">
                    <thead>
                      <tr>
                        <th>รหัส</th>
                        <th>วันหมดอายุ</th>
                        <th>ราคา (บาท)</th>
                        <th>ปริมาณคงเหลือในล็อต (กรัม)</th>
                        <th>ใส่ปริมาณที่ต้องการ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataFromApi.map((item) => (
                        <tr
                          key={item.id}
                          className={item.expired ? "expired" : ""}
                        >
                          <td>{item.id_lot}</td>

                          <td>
                            {item.expiration_date > currentDate.toISOString() &&
                            item.expiration_date <=
                              thirtyDaysFromNow.toISOString() ? (
                              <span style={{ color: "blue" }}>
                                {item.expiration_date}
                              </span>
                            ) : item.expiration_date >
                              thirtyDaysFromNow.toISOString() ? (
                              <span style={{ color: "#000" }}>
                                {item.expiration_date}
                              </span>
                            ) : item.expiration_date <
                              currentDate.toISOString() ? (
                              <span style={{ color: "red" }}>
                                {item.expiration_date}
                              </span>
                            ) : (
                              <span style={{ color: "#000" }}>
                                {item.expiration_date}
                              </span>
                            )}
                            {/* #2f14c7 */}
                          </td>
                          <td>{item.cost}</td>
                          {/* <td>{item.amount}</td> */}
                          <td>{item.amount_re}</td>
                          <td>
                            <input
                              type="number"
                              style={{
                                width: "100px",
                                height: "30px",
                                paddingLeft: "5px",
                              }}
                              value={item.selectedAmount || 0}
                              onChange={(e) => {
                                const quantity = parseFloat(e.target.value);
                                handleSelectQuantity(item, quantity);
                              }}
                            />
                            <button
                              style={{
                                background: "blue",
                                color: "white",
                                marginLeft: "5px",
                              }}
                              // value={setTotalAmount}

                              onClick={() =>
                                handleSelectQuantity(
                                  item,
                                  item.selectedAmount || 0
                                )
                              }
                            >
                              เลือก
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Model;
