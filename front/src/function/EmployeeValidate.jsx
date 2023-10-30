function Validation(values) {
  let error = {};
  const regex = /^\S+@\S+\.\S+$/;
  // const regex = /^\d{10}$/;
  // const regexPhone = 10;

  if (values.department === "") {
    error.department = "กรุณาเลือกตำแหน่ง!";
  } else {
    error.department = "";
  }

  if (values.status === "") {
    error.status = "กรุณาเลือกสถานะ!";
  } else {
    error.status = "";
  }

  if (values.title === "") {
    error.title = "กรุณาเลือกคำนำหน้า!";
  } else {
    error.title = "";
  }

  if (values.name === "") {
    error.name = "กรุณากรอกข้อมูลชื่อ!";
  } else {
    error.name = "";
  }

  if (values.sex === "") {
    error.sex = "กรุณาเลือกเพศ!";
  } else {
    error.sex = "";
  }

  if (values.birthday === "") {
    error.birthday = "กรุณากรอกข้อมูลวันเกิด!";
  } else {
    error.birthday = "";
  }

  if (values.phone === "") {
    error.phone = "กรุณากรอกเบอร์โทรศัพท์!";
  } else if (values.phone.length < 9) {
    error.phone = "หมายเลขไม่ถูกต้อง";
  } else {
    error.phone = "";
  }

  if (values.line_id === "") {
    error.line_id = "กรุณากรอกข้อมูลไอดีไลน์!";
  } else {
    error.line_id = "";
  }

  if (values.facebook_id === "") {
    error.facebook_id = "กรุณากรอกข้อมูลชื่อเฟสบุ๊ค!";
  } else {
    error.facebook_id = "";
  }

  if (values.card_id === "") {
    error.card_id = "กรุณากรอกเลขบัตรประชาชน!";
  } else if (values.card_id.length < 13) {
    error.card_id = "รหัสบัตรไม่ถูกต้อง";
  } else {
    error.card_id = "";
  }

  if (values.username === "") {
    error.username = "กรุณากรอกบัญชีผู้ใช้!";
  } else {
    error.username = "";
  }

  if (values.password === "") {
    error.password = "กรุณากรอกรหัสผ่าน!";
  } else {
    error.password = "";
  }

  if (values.image === "") {
    error.image = "กรุณาใส่รูป!";
  } else {
    error.image = "";
  }

  return error;
}
export default Validation;
