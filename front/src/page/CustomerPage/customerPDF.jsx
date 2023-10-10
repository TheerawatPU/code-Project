import React from "react";

function customerPDF(props) {
  const { idPage } = props;
  console.log("หน้า",idPage);


  return (
    <div>
      <h1>{idPage}</h1>
    </div>
  );
}

export default customerPDF;
