import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import Menu from "../../component/Menu";
import Topnav from "../../component/Topnav";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FaArrowLeftLong } from "react-icons/fa6";

import "../../CSS/Unit.css";

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

function Utest() {
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
      .get(`http://localhost:5500/UreadID1/${id}`)
      .then((response) => {
        setUnit(response.data.unitResults);
        setDetail_unit(response.data.detail_unit);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // รวมปริมาณสารในตารางวัตถุดิบ
  const totalPercentage = detail_unit.reduce((sum, detail) => {
    return sum + parseFloat(detail.AmountP);
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
                <div className="titleText">รายละเอียดสูตร</div>
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
                      <Text style={styles.title}>สูตรผลิตภัณฑ์</Text>
                      <View style={styles.body}>
                        <View style={styles.section}>
                          <Text style={styles.texts}>ข้อมูลสูตรผลิต</Text>
                          <Text>รหัสสูตร : {id}</Text>
                          <Text>ชื่อสูตร : {unit.unit_name}</Text>
                          <Text>วันที่รับรายการ : {unit.day_admit_list}</Text>
                          <Text>เลขจดแจ้ง : {unit.notification_num}</Text>
                          <Text>
                            วันสิ้นสุดเลขจดแจ้ง : {unit.date_notification_num}
                          </Text>
                        </View>

                        <View style={styles.section}>
                          <Text style={styles.texts}>รายละเอียดลูกค้า</Text>
                          <Text>บริษัท : {unit.name_company}</Text>
                          <Text>ชื่อลูกค้า : {unit.name_cus}</Text>
                          <Text>ติดต่อ : {unit.phone_cus}</Text>
                          <Text>ที่อยู่ : {unit.address_customer}</Text>
                        </View>
                      </View>

                      <Text>ตารางวัตถุดิบ </Text>
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
                              getContent={(detail) => detail.AmountP}
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
                fileName="รายละเอียดสูตร.pdf"
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
                <h2 style={{ marginBottom: "25px" }}>ข้อมูลสูตรผลิต</h2>

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
                  <label className="form-label1-1">ชื่อสูตร :</label>
                  <input
                    type="text"
                    className="Uinput1Read"
                    name="unit_name"
                    value={unit.unit_name}
                    disabled
                  />
                </div>

                <div className="Ubox1-1-1D">
                  <div className="doubleU">
                    <label className="form-label1-1">วันที่รับรายการ :</label>
                    <input
                      className="form-dateRead"
                      type="text"
                      name="day_admit_list"
                      value={unit.day_admit_list}
                      disabled
                    />
                  </div>
                  <div className="doubleU">
                    <label className="form-label1-1">
                      วันที่เลขจดแจ้งสิ้นสุด :
                    </label>
                    <input
                      className="form-dateRead"
                      name="date_notification_num"
                      type="text"
                      value={unit.date_notification_num}
                      disabled
                    />
                  </div>
                </div>

                <div className="Ubox1-1-1">
                  <label className="form-label1-1">เลขที่จดแจ้ง :</label>
                  <input
                    type="text"
                    className="Uinput1Read"
                    name="notification_num"
                    value={unit.notification_num}
                    disabled
                  />
                </div>

                <div className="Ubox1-1-1">
                  <label className="form-label1-1">ลูกค้า :</label>
                  <input
                    type="text"
                    className="Uinput1Read"
                    name="notification_num"
                    value={unit.name_cus}
                    disabled
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
                          <th>รวมปริมาณสาร {totalPercentage} %</th>
                        </tr>
                      </thead>
                      {detail_unit.map((detail, index) => (
                        <tbody key={index}>
                          <tr>
                            <td>{index + 1}</td>
                            <td>{detail.Name_staple}</td>
                            <td>{detail.Name_INCIname}</td>
                            <td>{detail.AmountP}</td>
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

export default Utest;
