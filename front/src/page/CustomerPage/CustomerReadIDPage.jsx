import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import Topnav from "../../component/Topnav";
import Menu from "../../component/Menu";
import "../../CSS/CustomerNew.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FaArrowLeftLong } from "react-icons/fa6";

// font
import FontTH from "../../PDF/THSarabun.ttf";
import FontTHBold from "../../PDF/THSarabun Bold.ttf";

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
import logo from "../../PDF/logo.jpg";

// PDF
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";

function CustomerReadIDPage() {
  // นำทางข้าม component
  const navigate = useNavigate();

  // ไอดีจาก URL
  const { id } = useParams();

  const [Data, setdata] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5500/customerID/" + id)
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err));
  }, []);

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
    <div className="all-page">
      <header className="header">
        <Topnav />
      </header>
      <section className="aside">
        <Menu />
      </section>
      <main className="main">
        {Data.map((d, index) => (
          <div className="box-big-bg-new-C" key={index}>
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
                    <div className="titleText">ดูข้อมูลลูกค้า</div>
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
                          <Text style={styles.title}>ลูกค้า</Text>
                          {/*  */}

                          <View style={styles.body}>
                            <Text style={styles.Textpad}>
                              รหัสลูกค้า : {d.id_customer}
                            </Text>
                          </View>

                          <View style={styles.body}>
                            <Text style={styles.Textpad}>
                              ชื่อบริษัท : {d.name_company}
                            </Text>
                          </View>

                          <View style={styles.body}>
                            <Text style={styles.Textpad}>
                              ชื่อลูกค้า : {d.name_cus}
                            </Text>
                          </View>

                          <View style={styles.body}>
                            <Text style={styles.Textpad}>
                              รหัสบัตรประชาชน : {d.card_ID}
                            </Text>
                          </View>

                          <View style={styles.body}>
                            <Text style={styles.Textpad}>
                              อีเมล : {d.email_cus}
                            </Text>
                          </View>

                          <View style={styles.body}>
                            <Text style={styles.Textpad}>
                              เบอร์โทรศัพท์ : {d.phone_cus}
                            </Text>
                          </View>

                          <View style={styles.body}>
                            <Text style={styles.Textpad}>
                              ที่อยู่ : {d.address}
                            </Text>
                          </View>

                          {/*  */}
                        </Page>
                      </Document>
                    }
                    fileName="ลูกค้า.pdf"
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

              <form className="form-stable-new-C">
                <div className="form-row-new-C">
                  <label className="form-label-new-C">รหัสลูกค้า :</label>
                  <input
                    name="name_company"
                    type="text"
                    className="form-input-new-read-C"
                    value={d.id_customer}
                    readOnly
                    disabled
                  />
                </div>
                <div className="form-row-new-C">
                  <label className="form-label-new-C">ชื่อบริษัท :</label>
                  <input
                    name="name_company"
                    type="text"
                    className="form-input-new-read-C"
                    value={d.name_company}
                    readOnly
                    disabled
                  />
                </div>
                <div className="form-row-new-C">
                  <label className="form-label-new-C">ชื่อลูกค้า :</label>
                  <input
                    name="name_cus"
                    type="text"
                    className="form-input-new-read-C"
                    value={d.name_cus}
                    readOnly
                    disabled
                  />
                </div>
                <div className="form-row-new-C">
                  <label className="form-label-new-C">รหัสบัตรประชาชน :</label>
                  <input
                    name="card_ID"
                    type="text"
                    className="form-input-new-read-C"
                    value={d.card_ID}
                    readOnly
                    disabled
                  />
                </div>
                <div className="form-row-new-C">
                  <label className="form-label-new-C">อีเมล :</label>
                  <input
                    name="email_cus"
                    type="email"
                    className="form-input-new-read-C"
                    value={d.email_cus}
                    readOnly
                    disabled
                  />
                </div>
                <div className="form-row-new-C">
                  <label className="form-label-new-C">เบอร์โทรศัพท์ :</label>
                  <input
                    name="phone_cus"
                    type="text"
                    className="form-input-new-read-C"
                    value={d.phone_cus}
                    readOnly
                    disabled
                  />
                </div>

                <div className="form-row-new-C">
                  <label className="form-label-new-C">ที่อยู่ :</label>
                  <input
                    type="text"
                    className="form-input-new-read-C"
                    name="address_cus"
                    value={d.address}
                    readOnly
                    disabled
                  />
                </div>
              </form>
            </div>

            {/* <div className="btn-submit-new-C">
              <div className="btn-area-new-C">
                <button
                  type="cancle"
                  className="cancle-new-C"
                  onClick={() => navigate(-1)}
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                  <span>ย้อนกลับ</span>
                </button>
                <button
                  type="submit"
                  className="submit-new-C"
                  onClick={() =>
                    navigate(
                      `/EM/CustomerReadPage/CustomerUpdatePage/${d.id_customer}`
                    )
                  }
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                  <span>แก้ไข</span>
                </button>
              </div>
            </div> */}
          </div>
        ))}
      </main>
    </div>
  );
}

export default CustomerReadIDPage;
