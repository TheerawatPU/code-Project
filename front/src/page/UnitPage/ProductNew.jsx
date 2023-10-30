import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../CSS/Ptoduct.css";
import Menu from "../../component/Menu";
import Topnav from "../../component/Topnav";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFloppyDisk,
  faXmark,
  faBoxArchive,
} from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import { FaPen, FaEye } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { FaArrowLeftLong } from "react-icons/fa6";

import Model from "../../component/Model";

function ProductNew() {
  // เรียกใช้ navigate เพื่อใช้สำหรับ การกดข้ามคอมโพเน้น
  const navigate = useNavigate();

  const [unitOptions, setUnitOptions] = useState([]);

  const [selectedRecipe, setSelectedRecipe] = useState("");

  const [ingredients, setIngredients] = useState([]);

  // console.log("ingredients", ingredients);

  // คำนวณ
  const [productionQuantity, setProductionQuantity] = useState(null);

  const handleProductionQuantityChange = (event) => {
    const quantity = parseFloat(event.target.value);
    setProductionQuantity(isNaN(quantity) ? 0 : quantity);
  };

  // คำนวณผลรวมของปริมาณสาร (กรัม)
  const totalGrams = ingredients.reduce((total, ingredient) => {
    return total + parseFloat(ingredient.grams || 0);
  }, 0);

  // คำนวณผลรวมของปริมาณสาร (%)
  const totalAmountP = ingredients.reduce((total, ingredient) => {
    return total + parseFloat(ingredient.AmountP || 0);
  }, 0);

  const [oldestIdUnit, setOldestIdUnit] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5500/unitRead")
      .then((response) => {
        // ตั้งค่าข้อมูลอายุให้กับ customerOptions state
        setUnitOptions(response.data);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลลูกค้า:", error);
      });
  }, []);

  useEffect(() => {
    // ดึงวัตถุดิบของสูตรที่เลือก
    if (selectedRecipe) {
      axios
        .get(`http://localhost:5500/Unit_staple/${selectedRecipe}`)
        .then((response) => {
          const updatedIngredients = response.data.map((ingredient) => {
            const { Name_staple, AmountP, reOrder, id_staple } = ingredient;
            const grams = (AmountP * productionQuantity) / 100; // คำนวณปริมาณสาร (กรัม)
            return { Name_staple, AmountP, grams, reOrder, id_staple };
          });
          setIngredients(updatedIngredients);
          calculateTotalCost(); // เรียกใช้ฟังก์ชันคำนวณราคาต้นทุนทั้งหมด
        })
        .catch((error) => {
          console.error("เกิดข้อผิดพลาดในการดึงข้อมูลวัตถุดิบ:", error);
        });
    } else {
      // ถ้าไม่มีสูตรที่เลือก ให้ล้างข้อมูลวัตถุดิบ
      // setIngredients([]);
    }
  }, [selectedRecipe, productionQuantity, ingredients]);

  // คำนวณสารบาท
  const [totalCost, setTotalCost] = useState(0);

  // เริ่มต้นโดยการสร้าง state สำหรับแต่ละ input
  const [packagingCost, setPackagingCost] = useState(null);
  const [shippingCost, setShippingCost] = useState(null);
  const [otherCost, setOtherCost] = useState(null);

  const handlePackagingCostChange = (event) => {
    const cost = parseFloat(event.target.value);
    setPackagingCost(isNaN(cost) ? 0 : cost);
  };

  const handleShippingCostChange = (event) => {
    const cost = parseFloat(event.target.value);
    setShippingCost(isNaN(cost) ? 0 : cost);
  };

  const handleOtherCostChange = (event) => {
    const cost = parseFloat(event.target.value);
    setOtherCost(isNaN(cost) ? 0 : cost);
  };

  // คำนวณราคาต้นทุนรวม
  const calculateTotalCost = () => {
    const packagingCost =
      parseFloat(document.getElementById("packagingCost").value) || 0;
    const shippingCost =
      parseFloat(document.getElementById("shippingCost").value) || 0;
    const otherCost =
      parseFloat(document.getElementById("otherCost").value) || 0;

    // คำนวณราคารวมของรายการวัตถุดิบ
    const ingredientsTotalCost = ingredients.reduce((total, ingredient) => {
      return (
        total +
        parseFloat(ingredient.reOrder || 0) * parseFloat(ingredient.grams || 0)
      );
    }, 0);

    // รวมค่าแพ็คเกจ, ค่าขนส่ง, ค่าใช้จ่ายอื่น ๆ และราคารวมของรายการวัตถุดิบเพื่อคำนวณค่ารวมทั้งหมด
    const totalCost =
      packagingCost + shippingCost + otherCost + ingredientsTotalCost;

    setTotalCost(totalCost.toFixed(2));
    // toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  };

  // ฟังก์ชันสำหรับเพิ่มคอมม่าคั่นตัวเลข
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // สำหรับทำ Modal
  const [openModal, setOpenModal] = useState(false);

  // สร้างตัวแปร state ชื่อ selectedIdStaple เพื่อเก็บ id_staple ของแถวที่ถูกเลือก โดยกำหนดค่าเริ่มต้นเป็น null.
  const [selectedIdStaple, setSelectedIdStaple] = useState(null);

  const [selectedNameStaple, setSelectedNameStaple] = useState(null);

  // เพื่อสส่งค่าไปหน้า Modal
  const [selectedGrams, setSelectedGrams] = useState(0);

  return (
    <div className="all-page">
      <header className="header">
        <Topnav />
      </header>
      <section className="aside">
        <Menu />
      </section>
      <main className="main">
        <div className="title-Text">
          <div className="top-text-new-EM">
            <div className="text-new-EM-Unit">
              <div
                className="titleText"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(-1)}
              >
                <FaArrowLeftLong />
              </div>
              <div className="titleText">เพิ่มข้อมูลการผลิต</div>
            </div>
          </div>
          <div className="all-btn-0">
            <button
              className="btn01"
              type="submit"
              onClick={() => navigate(-1)}
              style={{
                background: "rgb(221 62 62)",
                color: "white",
                width: "auto",
                height: "auto",
                marginRight: "20px",
                marginBottom: "10px",
              }}
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
                marginRight: "50px",
                marginBottom: "10px",
              }}
            >
              <div className="btn-save01">
                <FontAwesomeIcon icon={faFloppyDisk} />
                <label style={{ paddingLeft: "5px" }}>บันทึก</label>
              </div>
            </button>
          </div>

          {/* <div className="text-new-lg-Unit">
            กรุณากรอกข้อมูลใน * ให้ครบทุกช่อง ถ้าไม่มีให้ใส่เครื่องหมาย - ไว้
          </div> */}
        </div>

        <div className="backZERO">
          <div className="box0">
            {/* //!ฟอร์มที่1 ข้อมูลสูตร */}
            <div className="box1-1">
              <div className="form0">
                <h2 style={{ marginBottom: "25px" }}>ข้อมูลการผลิต</h2>

                <div className="form1">
                  <div className="form1-1">
                    <label className="form-label1-1">รหัสการผลิต :</label>
                    <input
                      className="form-input1-1"
                      type="text"
                      disabled
                      style={{
                        background: "#e5e5e5",
                        border: "none",
                        border: "#cfcfcf",
                      }}
                      value={1}
                    />
                  </div>
                </div>

                <div className="form1-3">
                  <div className="form1-1">
                    <label className="form-label1-1">วันที่ผลิต :</label>
                    <input className="form-input1-1" type="date" />
                  </div>

                  <div className="form1-1-2">
                    <label className="form-label1-1">วันที่ส่งมอบ :</label>
                    <input className="form-input1-1" type="date" />
                  </div>
                </div>

                <div className="form1">
                  <div className="form1-1">
                    <label className="form-label1-1">สูตรผลิต :</label>
                    <select
                      name=""
                      id=""
                      className="form-input1-2"
                      value={selectedRecipe}
                      onChange={(e) => setSelectedRecipe(e.target.value)}
                    >
                      <option value="">เลือกสูตรผลิต</option>

                      {unitOptions.map((cusOption) => (
                        <option key={cusOption.id} value={cusOption.id_unit}>
                          {cusOption.unit_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form1">
                  <div className="form1-1">
                    <label className="form-label1-1">วันหมดอายุ :</label>
                    <input className="form-input1-1" type="date" />
                  </div>
                </div>

                <div className="form1">
                  <div className="form1-1">
                    <label className="form-label1-1">ปริมาณที่ผลิต :</label>
                    <div className="form1-1-1">
                      <input
                        className="form-input1-1"
                        type="number"
                        value={productionQuantity}
                        onChange={handleProductionQuantityChange}
                      />
                      <label
                        className="form-label1-1"
                        style={{ marginLeft: "10px" }}
                      >
                        กรัม
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form1">
                  <div className="form1-1">
                    <label className="form-label1-1">ค่าแพ็คเกจ :</label>
                    <div className="form1-1-1">
                      <input
                        className="form-input1-1"
                        type="number"
                        value={packagingCost}
                        onChange={handlePackagingCostChange}
                        id="packagingCost" // รีแบรนด์อันนี้และกำหนด ID ตามที่คุณต้องการ
                      />
                      <label style={{ marginLeft: "5px" }}>
                        <b>บาท</b>
                      </label>
                    </div>
                  </div>

                  <div className="form1-1">
                    <label className="form-label1-1">ค่าขนส่ง :</label>
                    <div className="form1-1-1">
                      <input
                        className="form-input1-1"
                        type="number"
                        value={shippingCost}
                        onChange={handleShippingCostChange}
                        id="shippingCost" // รีแบรนด์อันนี้และกำหนด ID ตามที่คุณต้องการ
                      />
                      <label
                        // className="form-label1-1"
                        style={{ marginLeft: "5px" }}
                      >
                        <b>บาท</b>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form1">
                  <div className="form1-1">
                    <label className="form-label1-1">ค่าใช้จ่ายอื่นๆ :</label>
                    <div className="form1-1-1">
                      <input
                        className="form-input1-1"
                        type="number"
                        value={otherCost}
                        onChange={handleOtherCostChange}
                        id="otherCost" // รีแบรนด์อันนี้และกำหนด ID ตามที่คุณต้องการ
                      />
                      <label
                        // className="form-label1-1"
                        style={{ marginLeft: "5px" }}
                      >
                        <b>บาท</b>
                      </label>
                    </div>
                  </div>

                  <div className="form1-1">
                    <label className="form-label1-1" style={{ color: "red" }}>
                      ยอดรวมทั้งหมด :
                    </label>
                    <div className="form1-1-1">
                      <input
                        className="form-input1-1"
                        type="text"
                        disabled
                        style={{
                          background: "#e5e5e5",
                          border: "none",
                          border: "#cfcfcf",
                          fontWeight: "bold",
                        }}
                        
                        
                        value={
                          totalCost !== null ? numberWithCommas(totalCost) : ""
                        }
                      />
                      <label style={{ marginLeft: "5px" }}>
                        <b>บาท</b>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form1-3">
                  <div className="form1-1">
                    <label className="form-label1-1">วันที่ชำระ :</label>
                    <div className="form1-1-1">
                      <input className="form-input1-1" type="date" />
                    </div>
                  </div>
                  <div className="form1-1-2">
                    <label className="form-label1-1">หลักฐานการชำระ :</label>
                    <div className="form1-1-1">
                      <input
                        className="form-input1-1"
                        type="text"
                        value={"แนบไฟล์"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* //!ฟอร์มที่2 รายละเอียดสูตร */}
            <div className="box1-2">
              <div className="form0-2">
                <h2 style={{ marginBottom: "20px" }}>ตารางสูตร</h2>

                <div className="form1">
                  <div class="table-body-Unit">
                    <table class="styled-table-Unit">
                      <thead>
                        <tr>
                          <th>รหัส</th>
                          <th>ชื่อวัตถุดิบ</th>
                          <th>ปริมาณสาร {totalAmountP.toFixed(4)} %</th>
                          <th>ปริมาณสาร {totalGrams.toFixed(2)} กรัม</th>
                          <th>ราคาต้นทุน บาท</th>
                          <th>รวม บาท</th>

                          <th
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              marginTop: "10px",
                            }}
                          >
                            ล็อต
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {ingredients.map((detail, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>

                            {/* <td>{detail.id_staple}</td> */}
                            <td>{detail.Name_staple}</td>
                            <td style={{ textAlign: "center" }}>
                              {detail.AmountP} %
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {detail.grams.toFixed(4)}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {detail.reOrder}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {(
                                parseFloat(detail.reOrder || 0) *
                                parseFloat(detail.grams || 0)
                              ).toFixed(2)}
                            </td>
                            <td className="TDStable">
                              <button
                                name="id_staple"
                                className="dalete-Unit"
                                style={{ background: "blue" }}
                                // onClick={() => setOpenModal(true)}
                                onClick={() => {
                                  // setSelectedIdStaple(detail.id_staple);
                                  setOpenModal(true);
                                  setSelectedIdStaple(detail.id_staple);
                                  setSelectedNameStaple(detail.Name_staple);
                                  setSelectedGrams(detail.grams.toFixed(2)); // ตั้งค่าปริมาณสาร (กรัม)
                                }}
                              >
                                <h3>
                                  <FontAwesomeIcon icon={faBoxArchive} />
                                </h3>
                              </button>

                              <Model
                                open={openModal}
                                onClose={() => {
                                  setOpenModal(false);
                                }}
                                nameS={selectedNameStaple}
                                id_staple={selectedIdStaple} // Use the selectedIdStaple here
                                grams={selectedGrams} // ส่งค่าปริมาณสาร (กรัม) ไปยัง Modal
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* <div className="form-new-Unit">
              <h2 style={{ marginBottom: "20px" }}>ข้อมูลสูตร</h2>

              <div class="table-body-Unit">
                <table class="styled-table-Unit">
                  <thead>
                    <tr>
                      <th>รหัส</th>
                      <th>ชื่อวัตถุดิบ</th>
                      <th>ปริมาณสาร (กรัม)</th>
                      <th>ราคาต้นทุน (บาท)</th>

                      <th
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "10px",
                        }}
                      >
                        ล็อต
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Zinc PCA</td>
                      <td>500</td>
                      <td>5000</td>
                      <td className="TDStable">
                        <button className="btnstableLot">
                          <h3>
                            <FontAwesomeIcon icon={faBoxArchive} />
                          </h3>
                        </button>
                      </td>
                    </tr>

                    <tr>
                      <td>2</td>
                      <td>Alpha Arbutin (Switzerland)</td>
                      <td>30</td>
                      <td>3000</td>
                      <td className="TDStable">
                        <button className="btnstableLot">
                          <h3>
                            <FontAwesomeIcon icon={faBoxArchive} />
                          </h3>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div> */}
            </div>
          </div>
        </div>

        {/* <div className="btn-submit-new">
          <div className="btn-area-new-Unit">
            <button
              type="cancle"
              className="cancle-new"
              onClick={() => navigate(-1)}
            >
              <FontAwesomeIcon icon={faXmark} />
              <span>ยกเลิก</span>
            </button>
            <button type="submit" className="submit-new">
              <FontAwesomeIcon icon={faFloppyDisk} />
              <span>บันทึก</span>
            </button>
          </div>
        </div> */}
      </main>
    </div>
  );
}

export default ProductNew;
