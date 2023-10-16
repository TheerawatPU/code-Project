import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import Topnav from "../../../component/Topnav";
import Menu from "../../../component/Menu";
import "../../../CSS/Stable.css";

import { FaArrowLeftLong } from "react-icons/fa6";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

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

function Stabledetel() {
  // ! การนำทางข้าม component และ ดึง ID จาก URL
  const navigate = useNavigate();
  const { id } = useParams();
  // ! ........................

  // ! นำข้อมูลใน api มาแสดง
  const [Data, setdata] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5500/stableID/" + id)
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err));
  }, []);
  console.log("data", Data);
  // ! ........................

  // ! สไตล์ในตาราง
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
      marginRight: 10,
      paddingRight: 15,
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
  // ! .........................

  // ! นำฟ้อนมาใช้ PDF
  Font.register({ family: "FontTH", src: FontTH });
  Font.register({ family: "FontTHBold", src: FontTHBold });

  //! -------------------------

  return (
    <div className="all-page-new">
      <header className="header-new">
        <Topnav />
      </header>
      <section className="aside-new">
        <Menu />
      </section>
      <main className="main-new">
        <div className="title-Text">
          <div className="top-text-stable-read">
            <div className="text-new-EM-Unit">
              <div
                className="titleText"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(-1)}
              >
                <FaArrowLeftLong />
              </div>
              <div className="titleText">รายละเอียดวัตถุดิบ</div>
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
                    <Text style={styles.title}>วัตถุดิบ</Text>
                    {Data.map((item, index) => (
                      <View>
                        <View style={styles.body}>
                          <Text style={styles.Textpad}>
                            รหัสวัตถุดิบ : {item.id_staple}
                          </Text>
                        </View>

                        <View style={styles.body}>
                          <Text style={styles.Textpad}>
                            ชื่อวัตถุดิบ : {item.Name_staple}
                          </Text>
                        </View>

                        <View style={styles.body}>
                          <Text style={styles.Textpad}>
                            INCI Name : {item.Name_INCIname}
                          </Text>
                        </View>

                        <View style={styles.body}>
                          <Text style={styles.Textpad}>
                            การใช้ : {item.howUsing}
                          </Text>
                        </View>

                        <View style={styles.body}>
                          <Text style={styles.Textpad}>
                            การผสม : {item.howMixing}
                          </Text>
                        </View>

                        <View style={styles.body}>
                          <Text style={styles.Textpad}>
                            การรักษา : {item.saving}
                          </Text>
                        </View>

                        <View style={styles.body}>
                          <Text style={styles.Textpad}>
                            จุดสั่งซื้อ : {item.reOrder}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </Page>
                </Document>
              }
              fileName="ข้อมูลวัตถุดิบ.pdf"
            >
              <button
                className="btn01"
                type="submit"
                style={{
                  background: "#000",
                  color: "white",
                  width: "auto",
                  height: "auto",
                  marginRight: "250px",
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

        {Data.map((d, index) => (
          <div className="box-big-bg-new" key={index}>
            <div className="box-BG-area-new">
              <form className="form-stable-new">
                <div className="form-row-new">
                  <label className="form-label-new">รหัสวัตถุดิบ :</label>
                  <input
                    type="text"
                    className="stable_input1-read"
                    name="id_staple"
                    value={d.id_staple}
                    disabled
                  />
                </div>
                <div className="form-row-new">
                  <label className="form-label-new">ชื่อวัตถุดิบ :</label>
                  <input
                    type="text"
                    className="form-input-new-read"
                    name="Name_staple"
                    value={d.Name_staple}
                    disabled
                  />
                </div>
                <div className="form-row-new">
                  <label className="form-label-new">INCI Name :</label>
                  <input
                    type="text"
                    className="form-input-new-read"
                    name="Name_INCIname"
                    value={d.Name_INCIname}
                    disabled
                  />
                </div>
                <div className="form-row-new">
                  <label className="form-label-new">การใช้ :</label>
                  <input
                    type="text"
                    className="stable_input2-read"
                    name="howUsing"
                    value={d.howUsing}
                    disabled
                  />
                </div>
                <div className="form-row-new">
                  <label className="form-label-new">การผสม :</label>
                  <input
                    type="text"
                    className="stable_input2-read"
                    name="howMixing"
                    value={d.howMixing}
                    disabled
                  />
                </div>

                <div className="form-row-new">
                  <label className="form-label-new">การรักษา :</label>
                  <input
                    type="text"
                    className="stable_input2-read"
                    name="saving"
                    value={d.saving}
                    disabled
                  />
                </div>

                <div className="form-row-new">
                  <label className="form-label-new">การละลาย :</label>
                  <input
                    type="text"
                    className="stable_input2-read"
                    name="melting"
                    value={d.melting}
                    disabled
                  />
                </div>

                <div className="form-row-new" style={{ marginBottom: "20px" }}>
                  <label className="form-label-new">จุดสั่งซื้อ :</label>
                  <input
                    type="text"
                    className="stable_input1-read"
                    name="reOrder"
                    value={d.reOrder}
                    disabled
                  />
                </div>
              </form>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default Stabledetel;
