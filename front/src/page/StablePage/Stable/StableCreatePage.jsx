import React, { useEffect, useState } from "react";
import axios from "axios";
import Topnav from "../../../component/Topnav";
import Menu from "../../../component/Menu";

function StableCreatePage() {
  const [staple, setStaple] = useState([]);

  useEffect(() => {
    // ทำการดึงข้อมูลจาก API และอัปเดต state ของ options
    axios
      .get("http://localhost:5500/stapleRead_lot")
      .then((response) => {
        setStaple(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const onChangeSubdistricts = (e) => {
    // let index = e.nativeEvent.target.selectedIndex;
    // let label = e.nativeEvent.target[index].text;
    const filterDistrict = staple.filter((item) => {
      return e.target.value == item.id_staple;
    });
    console.log(filterDistrict[0].Name_INCIname);
    console.log(filterDistrict[0].howUsing);
    

    setValues({
      ...values,
      [e.target.name]: filterDistrict[0].Name_staple,
      id_staple: filterDistrict[0].id_staple,
      Name_INCIname: filterDistrict[0].Name_INCIname,
      howUsing: filterDistrict[0].howUsing,
      melting: filterDistrict[0].melting,
      howMixing: filterDistrict[0].howMixing,
      saving: filterDistrict[0].saving,
      reOrder: filterDistrict[0].reOrder,
    });
    console.log(e.target.value);
  };

  const [values, setValues] = useState({
    id_staple: "",
    Name_staple: "",
    Name_INCIname: "",
    howUsing: "",
    howMixing: "",
    saving: "",
    melting: "",
    reOrder: "",
  });

  console.log(staple);

  return (
    <div className="all-page">
      <header className="header-stable ">
        <Topnav />
      </header>
      <section className="aside-stable ">
        <Menu />
      </section>
      <main className="main-stable ">
        <div className="stable-bg-back"></div>
        <div className="stable-bg">
          <div className="fonth2">
            เพิ่มข้อมูลวัตถุดิบ
            <div className="btn-stable">
              <button className="btn-add-stable">ADD</button>
              <button className="btn-back-stable">Back</button>
            </div>
          </div>
          <div className="stable-bg-in">
            <div className="all-box-input">
              <form action="">
                <div class="parent">
                  <div class="div3">
                    <div className="div3-3">
                      <label className="input-stable">รหัสวัตถุดิบ</label>
                      <input
                        type="text"
                        readOnly
                        className="stable-input-L"
                        value={values.id_staple}
                        name="id_staple"
                        disabled
                      ></input>
                    </div>
                    <div className="div3-3">
                      <label className="input-stable">ชื่อวัตถุดิบ</label>
                      <select
                        className="stable-input-L-select"
                        onChange={(e) => onChangeSubdistricts(e)}
                        name="Name_staple"
                      >
                        <option>เลือกวัตถุดิบ</option>
                        {staple.map((item, index) => (
                          <option key={index} value={item.id_staple}>
                            {item.Name_staple}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="div3-3">
                      <label className="input-stable">INACI Name</label>
                      <input
                        type="text"
                        className="stable-input-L"
                        value={values.Name_INCIname}
                        name="Name_INCIname"
                        onChange={(e) => onChangeSubdistricts(e)}
                      ></input>
                    </div>
                    <div className="div3-3">
                      <label className="input-stable">การละลาย</label>
                      <input
                        className="stable-input-L"
                        value={values.melting}
                        name="melting"
                      ></input>
                    </div>
                    <div className="div3-3">
                      <label className="input-stable">การใช้</label>
                      <input
                        className="stable-input-L"
                        value={values.howUsing}
                        name="howUsing"
                      ></input>
                    </div>
                    <div className="div3-3">
                      <label className="input-stable">การผสม</label>
                      <input
                        className="stable-input-L"
                        value={values.howMixing}
                        name="howMixing"
                      ></input>
                    </div>
                    <div className="div3-3">
                      <label className="input-stable">การรักษา</label>
                      <input
                        className="stable-input-L"
                        value={values.saving}
                        name="saving"
                      ></input>
                    </div>
                    <div className="div3-3">
                      <label className="input-stable">จุดสั่งซื้อ</label>
                      <input
                        className="stable-input-L"
                        value={values.reOrder}
                        name="reOrder"
                        type="number"
                      ></input>
                    </div>
                    <div className="addstable">
                      <a href="/EM/StablePage/StableAddNewPage">
                        + เพิ่มรายการวัตถุดิบใหม่
                      </a>
                    </div>
                  </div>

                  <div class="div4">
                    <div className="box4">
                      <div className="minibox4">
                        <div className="div4-4">
                          <label className="input-stable">รหัสล็อต</label>
                          <input className="stable-input-R"></input>
                        </div>

                        <div className="div4-4">
                          <label className="input-stable">ราคา</label>
                          <div className="input-stable-labal-1">
                            <input className="stable-input-R-1"></input>
                            <label className="input-stable">บาท</label>
                          </div>
                        </div>
                        <div className="div4-4">
                          <label className="input-stable">COA</label>
                          <input className="stable-input-R"></input>
                          {/* <label className="input-stable">กรัม</label> */}
                        </div>
                      </div>

                      <div className="minibox4">
                        <div className="div4-4">
                          <label className="input-stable">ปริมาณ</label>
                          <div className="input-stable-labal-1">
                            <input className="stable-input-R-1"></input>
                            <label className="input-stable">กรัม</label>
                          </div>

                          {/* <label className="input-stable">กรัม</label> */}
                        </div>

                        <div className="div4-4">
                          <label className="input-stable">วันหมดอายุ</label>

                          <input className="stable-input-R"></input>
                        </div>
                        <div className="div4-4">
                          <label className="input-stable">MSDS</label>
                          <input className="stable-input-R"></input>
                          {/* <label className="input-stable">กรัม</label> */}
                        </div>
                      </div>
                    </div>
                    <div className="text-table-stable">
                      <div className="text-table">ประวัติรายการล็อต</div>
                    </div>

                    <div className="scrollbox">
                      <table className="table-stable">
                        <thead>
                          <tr>
                            <th>รหัสล็อต</th>
                            <th>วันหมดอายุ</th>
                            <th>ปริมาณ(กรัม)</th>
                            <th>ปริมาณคงเหลือ</th>
                            <th>ราคา(บาท)</th>
                            <th>COA</th>
                            <th>MSDS</th>
                          </tr>
                        </thead>
                        <tbody className="scrollbox">
                          <tr>
                            <td>1111</td>
                            <td>1111</td>
                            <td>1111</td>
                            <td>1111</td>
                            <td>1111</td>
                            <td>
                              <button className="ttt">1</button>
                            </td>
                            <td>
                              <button className="ttt">1</button>
                            </td>
                          </tr>
                          <tr>
                            <td>2222</td>
                            <td>2222</td>
                            <td>2222</td>
                            <td>2222</td>
                            <td>2222</td>

                            <td>
                              <button className="ttt">2</button>
                            </td>
                            <td>
                              <button className="ttt">2</button>
                            </td>
                          </tr>
                          <tr>
                            <td>3333</td>
                            <td>3333</td>
                            <td>3333</td>
                            <td>3333</td>
                            <td>3333</td>

                            <td>
                              <button className="ttt">3</button>
                            </td>
                            <td>
                              <button className="ttt">3</button>
                            </td>
                          </tr>
                          <tr>
                            <td>4444</td>
                            <td>4444</td>
                            <td>4444</td>
                            <td>4444</td>
                            <td>4444</td>

                            <td>
                              <button className="ttt">4</button>
                            </td>
                            <td>
                              <button className="ttt">4</button>
                            </td>
                          </tr>
                          <tr>
                            <td>4444</td>
                            <td>4444</td>
                            <td>4444</td>
                            <td>4444</td>
                            <td>4444</td>

                            <td>
                              <button className="ttt">4</button>
                            </td>
                            <td>
                              <button className="ttt">4</button>
                            </td>
                          </tr>
                          <tr>
                            <td>4444</td>
                            <td>4444</td>
                            <td>4444</td>
                            <td>4444</td>
                            <td>4444</td>

                            <td>
                              <button className="ttt">4</button>
                            </td>
                            <td>
                              <button className="ttt">4</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default StableCreatePage;
