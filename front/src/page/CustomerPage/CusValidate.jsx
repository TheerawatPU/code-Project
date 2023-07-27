function Validation(values) {
  let error = {};
  const regex = /^\S+@\S+\.\S+$/;
  // const regex = /^\d{10}$/;
  // const regexPhone = 10;

  if (values.name_company === "") {
    error.name_company = "กรุณากรอกข้อมูลชื่อบริษัท!";
  } else {
    error.name_company = "";
  }

  if (values.name_cus === "") {
    error.name_cus = "กรุณากรอกข้อมูลชื่อลูกค้า!";
  } else {
    error.name_cus = "";
  }

  if (values.card_ID === "") {
    error.card_ID = "กรุณากรอกเลขบัตรประชาชน!";
  } else if (values.card_ID.length < 13) {
    error.card_ID = "รหัสบัตรไม่ถูกต้อง";
  } else {
    error.card_ID = "";
  }

  if (values.email_cus === "") {
    error.email_cus = "กรุณากรอกข้อมูลอีเมล!";
  } else if (!regex.test(values.email_cus)) {
    error.email_cus = "อีเมลไม่ถูกต้อง!";
  } else {
    error.email_cus = "";
  }

  if (values.phone_cus === "") {
    error.phone_cus = "กรุณากรอกเบอร์โทรศัพท์!";
  } else if (values.phone_cus.length < 9 ) {
    error.phone_cus = "หมายเลขไม่ถูกต้อง";
  } else {
    error.phone_cus = "";
  }

  if (values.address_cus === "") {
    error.address_cus = "กรุณากรอกข้อมูลที่อยู่!";
  } else {
    error.address_cus = "";
  }

  return error;
}

export default Validation;
