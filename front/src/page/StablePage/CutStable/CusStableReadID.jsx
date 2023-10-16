import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import Menu from "../../../component/Menu";
import Topnav from "../../../component/Topnav";
import "../../../CSS/CutStable.css";

// font
import FontTH from "../../../PDF/THSarabun.ttf";
import FontTHBold from "../../../PDF/THSarabun Bold.ttf";

// PDF
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Font,
  Image,
} from "@react-pdf/renderer";

// PDF
import logo from "../../../PDF/logo.jpg";
// PDF
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";

function CusStableReadID() {
  // นำทางข้าม component
  const navigate = useNavigate();

  // ไอดีจาก URL
  const { id } = useParams();

  // ! ฟังก์ชั่นการแสดงวัตถุดิบ
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5500/cutStock_ID_read/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  // ! -----------------------------------

  // สไตล์ใน PDF
  const styles = StyleSheet.create({
    page: {
      fontFamily: "FontTH",
      padding: 10,
    },
    section: {
      margin: 15,
      padding: 10,
      flexGrow: 1,
      fontFamily: "FontTH",
      fontSize: 15,
      // border: 1,
    },
    section5: {
      marginTop: 15,
      paddingTop: 10,
      flexGrow: 1,
      fontFamily: "FontTH",
      fontSize: 15,
      // border: 1,
    },

    texts: {
      fontSize: 18,
      fontFamily: "FontTHBold",
    },
    title: {
      marginTop: 0,
      fontSize: 25,
      fontFamily: "FontTHBold",
      textAlign: "center",
    },
    body: {
      flexDirection: "row",
      fontFamily: "FontTH",
      paddingLeft: 15,
      marginLeft: 10,
      // border: 1,
      fontSize: 15,
    },
    body3: {
      fontFamily: "FontTH",
      margin: 15,
      padding: 10,
      fontSize: 15,
      // border: 1,
    },
    tableHeader: {
      textAlign: "center",
      backgroundColor: "#22a699",
      fontFamily: "FontTHBold",
      color: "#ffffff",
      paddingTop: 3,
      paddingBottom: 3,
    },
    tableHeader2: {
      paddingTop: 3,
      paddingBottom: 3,
      paddingLeft: 10,
    },
    body2: {
      textAlign: "right",
    },
    imgLogo: {
      width: 100,
      height: 100,
    },
    Textpad: {
      paddingBottom: 10,
    },
  });

  // นำฟ้อนมาใช้ PDF
  Font.register({ family: "FontTH", src: FontTH });
  Font.register({ family: "FontTHBold", src: FontTHBold });

  // -------------------------

  return (
    <div>
      <div className="all-page">
        <header className="header">
          <Topnav />
        </header>
        <section className="aside">
          <Menu />
        </section>
        <main className="main">
          <div className="title-Text-new">
            <div className="top-text-new-EM">
              <div className="text-new-EM-Unit">
                <div
                  className="titleText"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(-1)}
                >
                  <FaArrowLeftLong />
                </div>
                <div className="titleText">รายละเอียดการปรับสต๊อก</div>
              </div>
            </div>

            <div className="all-btn-0">
              <PDFDownloadLink
                document={
                  <Document>
                    <Page size="A4" style={styles.page}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                      >
                        <Image style={styles.imgLogo} src={logo} />
                      </View>
                      <Text style={styles.title}>การปรับสต๊อก</Text>
                      {/*  */}

                      <View style={styles.body}>
                        {data.map((d, index) => (
                          <View style={styles.section5}>
                            <Text style={styles.Textpad}>
                              รหัสการปรับ : {d.id_cutStock}
                            </Text>
                            <Text style={styles.Textpad}>
                              วัตถุดิบ : {d.Name_staple}
                            </Text>
                            <Text style={styles.Textpad}>
                              ปริมาณคงเหลือ : {d.amount_old} กรัม
                            </Text>
                          </View>
                        ))}

                        {data.map((d, index) => (
                          <View style={styles.section5}>
                            <Text style={styles.Textpad}>
                              วันที่ทำรายการ : {d.date_cutStock}
                            </Text>
                            <Text style={styles.Textpad}>
                              ล็อตวัตถุดิบ : {d.id_lot}
                            </Text>
                            <Text style={styles.Textpad}>
                              ปริมาณที่ปรับ : {d.amount_total} กรัม
                            </Text>
                          </View>
                        ))}
                      </View>
                      {data.map((d, index) => (
                        <View style={styles.body}>
                          <Text style={styles.Textpad}>
                            สาเหตุการปรับ : {d.cause}
                          </Text>
                        </View>
                      ))}

                      {data.map((d, index) => (
                        <View style={styles.body}>
                          <Text>
                            รายละเอียดเพิ่มเติม : {d.details_cutStock}
                          </Text>
                        </View>
                      ))}

                      <View style={styles.body2}>
                        {data.map((d, index) => (
                          <View style={styles.section}>
                            <Text style={styles.texts}>ผู้บันทึก</Text>
                            <Text>{d.name}</Text>
                            <Text>(พนักงานฝ่ายผลิต)</Text>
                          </View>
                        ))}
                      </View>

                      {/*  */}
                    </Page>
                  </Document>
                }
                fileName="การปรับสต๊อก.pdf"
              >
                <button
                  className="btn01"
                  type="submit"
                  style={{
                    background: "#000",
                    color: "white",
                    width: "auto",
                    height: "auto",
                    marginRight: "50px",
                    marginBottom: "10px",
                  }}
                >
                  <div className="btn-save01">
                    <FontAwesomeIcon icon={faPrint} />
                    <label style={{ paddingLeft: "5px" }}>พิมพ์</label>
                  </div>
                </button>
              </PDFDownloadLink>
            </div>
          </div>

          {data.map((d, index) => (
            <div className="box-big-bg-new">
              <div className="box-BG-area-new">
                <form className="form-stable-new" key={index}>
                  <div className="row2-new">
                    <div className="form-row-new">
                      <label className="form-label-new">รหัสการปรับ :</label>
                      <input
                        type="text"
                        className="input-read_cut"
                        value={d.id_cutStock}
                        disabled
                      />
                    </div>
                    <div className="form-row-new">
                      <label className="form-label-new">วันที่ทำรายการ :</label>
                      <input
                        name="date_cutStock"
                        type="text"
                        className="input-read_cut"
                        value={d.date_cutStock}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="row2-new">
                    <div className="form-row-new">
                      <label className="form-label-new">วัตถุดิบ :</label>
                      <input
                        name="id_staple"
                        type="text"
                        className="input-read_cut"
                        value={d.Name_staple}
                        disabled
                      />
                    </div>
                    <div className="form-row-new">
                      <label className="form-label-new">ล็อตวัตถุดิบ :</label>
                      <input
                        name="id_lot"
                        type="text"
                        className="input-read_cut"
                        value={d.id_lot}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="row2-new">
                    <div className="form-row-new">
                      <label className="form-label-new">ปริมาณคงเหลือ :</label>
                      <input
                        name="amount_old"
                        type="text"
                        className="input-read_cut"
                        value={d.amount_old}
                        disabled
                      />
                    </div>
                    <div className="form-row-new">
                      <label className="form-label-new">ปริมาณที่ปรับ :</label>
                      <input
                        name="amount_total"
                        type="text"
                        className="input-read_cut"
                        value={d.amount_total}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="form-row-new">
                    <label className="form-label-new">สาเหตุการปรับ :</label>

                    <input
                      name="cause"
                      className="input-read_cut"
                      style={{ width: "1010px" }}
                      value={d.cause}
                      disabled
                    />
                  </div>
                  <div className="form-row-new">
                    <label className="form-label-new">
                      รายละเอียดเพิ่มเติม :
                    </label>
                    <textarea
                      name="details_cutStock"
                      type="text"
                      className="form-input-new2"
                      value={d.details_cutStock}
                      disabled
                    />
                  </div>
                </form>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}

export default CusStableReadID;
