import React, { useState } from "react";

const ViewOpinionTextForm = ({ text }) => {
  return (
    <div>
      <h2>Заключение эксперта</h2>
      <textarea disabled maxLength={512} value={text} />
    </div>
  );
};

export default ViewOpinionTextForm;