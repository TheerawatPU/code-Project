function Validation(values) {
  let error = {};
  const regex = /^\S+@\S+\.\S+$/;
  // const regex = /^\d{10}$/;
  // const regexPhone = 10;

  if (values.Name_staple === "") {
    error.Name_staple = "กรุณากรอกข้อมูลName_staple!";
  } else {
    error.Name_staple = "";
  }

  if (values.Name_INCIname === "") {
    error.Name_INCIname = "กรุณากรอกข้อมูลName_INCIname!";
  } else {
    error.Name_INCIname = "";
  }

  if (values.howUsing === "") {
    error.howUsing = "กรุณากรอกข้อมูลhowUsing!";
  } else {
    error.howUsing = "";
  }

  if (values.howMixing === "") {
    error.howMixing = "กรุณากรอกข้อมูลhowMixing!";
  } else {
    error.howMixing = "";
  }

  if (values.saving === "") {
    error.saving = "กรุณากรอกข้อมูลsaving!";
  } else {
    error.saving = "";
  }

  if (values.melting === "") {
    error.melting = "กรุณากรอกข้อมูลmelting!";
  } else {
    error.melting = "";
  }

  if (values.reOrder === "") {
    error.reOrder = "กรุณากรอกข้อมูลreOrder!";
  } else {
    error.reOrder = "";
  }

  //   if (values.card_ID === "") {
  //     error.card_ID = "กรุณากรอกเลขบัตรประชาชน!";
  //   } else if (values.card_ID.length < 13) {
  //     error.card_ID = "รหัสบัตรไม่ถูกต้อง";
  //   } else {
  //     error.card_ID = "";
  //   }

  return error;
}
export default Validation;
