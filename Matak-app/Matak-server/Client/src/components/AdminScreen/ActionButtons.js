import React from "react";
import Button from "@material-ui/core/Button";

function ActionButtons({ onOk, onCancel }) {
  return (
    <div className="action-buttons">
      <Button variant="contained" color="secondary" onClick={() => onCancel()}>
        Cancel
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => onOk()}
        style={{
          marginLeft: "3px",
        }}
      >
        Confirm
      </Button>
    </div>
  );
}

export default ActionButtons;
