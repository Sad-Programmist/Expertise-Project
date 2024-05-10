import React, { useState } from "react";

const ViewOpinionConclusionForm = ({ conclusion }) => {
  return (
    <div>
      <h2>Выводы</h2>
      <div className="radio">
        <input disabled type="radio" name="support" value="true" checked={conclusion === true} />
        <label className="light"> проект заслуживает безусловной поддержки, допустить к финальной презентационной сессии</label>
      </div>
      <div className="radio">
        <input disabled type="radio" name="support" value="false" checked={conclusion === false} />
        <label className="light"> проект не заслуживает поддержки</label>
      </div>
    </div>
  );
};

export default ViewOpinionConclusionForm;