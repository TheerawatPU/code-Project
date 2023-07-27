function Validation(values) {
  let errors = {};
  const regex = /^\S+@\S+\.\S+$/;
  const idcard = 13

  if (values.name_company === "") {
    errors.name_company = "กรุณากรอกข้อมูลชื่อบริษัท!";
  }else {
    error.name_company = "";
  }

  if (values.name_cus === "") {
    errors.name_cus = "กรุณากรอกข้อมูลชื่อลูกค้า!";
  }

  if (values.card_ID === "") {
    errors.card_ID = "กรุณากรอกข้อมูลรหัสบัตรประชาชน!";
  } else if (values.card_ID.length !== idcard ) {
    errors.card_ID = "น้อยกว่า 13";
  } else {
    errors.card_ID = "yes  13";
  }

  if (values.email_cus === "") {
    errors.email_cus = "กรุณากรอกข้อมูลอีเมล!";
  } else if (!regex.test(values.email_cus)) {
    errors.email_cus = "อีเมลไม่ถูกต้อง!";
  }

  if (values.phone_cus === "") {
    errors.phone_cus = "กรุณากรอกข้อมูลเบอร์โทรศัพท์!";
  } else if (values.phone_cus < 10) {
    errors.phone_cus = "กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10!";
  } else if (values.phone_cus > 10) {
    errors.phone_cus = "กรุณากรอกเบอร์โทรศัพท์น้อยกว่า 10!";
  }

  if (values.address_cus === "") {
    errors.address_cus = "กรุณากรอกข้อมูลที่อยู่!";
  }

  return errors;
}

// export default Validation;
