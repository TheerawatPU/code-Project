import React, { useEffect, useState } from "react";
import axios from "axios";

import Topnav from "../../../component/Topnav";
import Menu from "../../../component/Menu";
import "../../../CSS/Stable.css";

import { useNavigate, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FaArrowLeftLong } from "react-icons/fa6";

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

import logo from "../../../PDF/logo.jpg";

// PDF
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";

function BuyStableRead() {
  // นำทางข้าม component
  const navigate = useNavigate();

  // ไอดีจาก URL
  const { id } = useParams();

  // ข้อมูลสูตร
  const [unit, setUnit] = useState({});

  // ข้อมูลรายละเอียดวัตถุดิบในสูตรนั้น
  const [detail_unit, setDetail_unit] = useState([]);

  // ดึง api มาใช้งาน
  useEffect(() => {
    axios
      .get(`http://localhost:5500/buystableID/${id}`)
      .then((response) => {
        setUnit(response.data.unitResults);
        setDetail_unit(response.data.detail_unit);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // รวมปริมาณสารในตารางวัตถุดิบ
  const totalPercentage = detail_unit.reduce((sum, detail) => {
    return sum + parseFloat(detail.amount_staple);
  }, 0);

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
    },
    textsection: {
      paddingBottom: 20,
      marginTop: 20,
      paddingTop: 20,
      marginBottom: 20,
      fontFamily: "FontTH",
      fontSize: 15,
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
  });

  // นำฟ้อนมาใช้ PDF
  Font.register({ family: "FontTH", src: FontTH });
  Font.register({ family: "FontTHBold", src: FontTHBold });

  // -------------------------
  return (
    <>
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
                <div className="titleText">รายละเอียดการสั่งซื้อวัตถุดิบ</div>
              </div>
            </div>
            {/* ---------------------------------- */}

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
                      <Text style={styles.title}>สั่งซื้อวัตถุดิบ</Text>
                      <View style={styles.body}>
                        <View style={styles.section}>
                          <Text style={styles.texts}></Text>
                          <Text>รหัสรายการสั่งซื้อ : {id}</Text>
                          <Text>ร้านที่สั่งซื้อ : {unit.store}</Text>
                          <Text>วันที่สั่งซื้อ : {unit.day_buy}</Text>
                          <Text>
                            วันที่รับวัตถุดิบ : {unit.day_admit_staple}
                          </Text>
                          <Text>รหัสอ้างอิง : {unit.refer_id}</Text>
                          <Text>หมายเหตุ : {unit.note}</Text>
                        </View>
                      </View>

                      <Text>วัตถุดิบที่ต้องการสั่งซื้อ </Text>
                      <Table data={detail_unit}>
                        <TableHeader textAlign={"center"}>
                          <TableCell style={styles.tableHeader}>
                            ชื่อวัตถุดิบ
                          </TableCell>
                          <TableCell style={styles.tableHeader}>
                            INCIname
                          </TableCell>
                          <TableCell style={styles.tableHeader}>
                            รวมปริมาณสาร
                          </TableCell>
                        </TableHeader>
                        {detail_unit.map((detail, index) => (
                          <TableBody key={index}>
                            <DataTableCell
                              style={styles.tableHeader2}
                              getContent={(detail) => detail.Name_staple}
                            />
                            <DataTableCell
                              style={styles.tableHeader2}
                              getContent={(detail) => detail.Name_INCIname}
                            />
                            <DataTableCell
                              style={styles.tableHeader2}
                              getContent={(detail) => detail.amount_staple}
                            />
                          </TableBody>
                        ))}
                      </Table>

                      <View style={styles.body2}>
                        <View style={styles.section}>
                          <Text style={styles.texts}>ผู้บันทึก</Text>
                          <Text>{unit.name}</Text>
                          <Text>(พนักงานฝ่ายผลิต)</Text>
                        </View>
                      </View>
                    </Page>
                  </Document>
                }
                fileName="ใบสั่งซื้อวัตถุดิบ.pdf"
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

            {/* ---------------------------------- */}
          </div>

          <div className="Ubox0">
            <div className="Ubox1">
              <div className="Ubox1-1">
                <h2 style={{ marginBottom: "25px" }}>
                  ข้อมูลการสั่งซื้อวัตถุดิบ
                </h2>

                <div className="Ubox1-1-1">
                  <label className="form-label1-1">รหัสสูตร :</label>
                  <input
                    type="text"
                    className="Uinput1Read"
                    name="unit_id"
                    value={id}
                    disabled
                  />
                </div>

                <div className="Ubox1-1-1">
                  <label className="form-label1-1">ร้านที่สั่งซื้อ :</label>
                  <input
                    type="text"
                    className="Uinput1Read"
                    name="unit_name"
                    disabled
                    value={unit.store}
                  />
                </div>

                <div className="Ubox1-1-1D">
                  <div className="doubleU">
                    <label className="form-label1-1">วันที่สั่งซื้อ :</label>
                    <input
                      className="form-dateRead"
                      type="text"
                      name="day_admit_list"
                      value={unit.day_buy}
                      disabled
                    />
                  </div>
                  <div className="doubleU">
                    <label className="form-label1-1">วันที่รับวัตถุดิบ :</label>
                    <input
                      className="form-dateRead"
                      name="date_notification_num"
                      type="text"
                      value={unit.day_admit_staple}
                      disabled
                    />
                  </div>
                </div>

                <div className="Ubox1-1-1">
                  <label className="form-label1-1">เลขที่อ้างอิง :</label>
                  <input
                    type="text"
                    className="Uinput1Read"
                    name="notification_num"
                    disabled
                    value={unit.refer_id}
                  />
                </div>

                <div className="Ubox1-1-1">
                  <label className="form-label1-1">หมายเหตุ :</label>
                  <input
                    type="text"
                    className="Uinput1Read"
                    name="notification_num"
                    disabled
                    value={unit.note}
                  />
                </div>
              </div>
            </div>

            <div className="Ubox2">
              <div className="Ubox2-1">
                <h2 style={{ marginBottom: "25px" }}>ตารางวัตถุดิบที่ใช้</h2>

                <div className="Ubox2-1-1">
                  <div class="table-body-Unit">
                    <table class="styled-table-Unit">
                      <thead>
                        <tr>
                          <th>รหัส</th>
                          <th>ชื่อวัตถุดิบ</th>
                          <th>INCIname</th>
                          <th>จำนวนวัตถุดิบ {totalPercentage} กรัม</th>
                        </tr>
                      </thead>
                      {detail_unit.map((detail, index) => (
                        <tbody key={index}>
                          <tr>
                            <td>{index + 1}</td>
                            <td>{detail.Name_staple}</td>
                            <td>{detail.Name_INCIname}</td>
                            <td>{detail.amount_staple}</td>
                          </tr>
                        </tbody>
                      ))}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default BuyStableRead;
