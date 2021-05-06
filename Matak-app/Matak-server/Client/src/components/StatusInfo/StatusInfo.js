import { Fab, Tooltip } from "@material-ui/core";
import React, { useState } from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { makeStyles } from "@material-ui/core/styles";
import "./StatusInfo.css";
import { STATUSES } from "../../constants/statusConstants";
import StatusElement from "./components/StatusElement";

const useStyles = makeStyles((theme) => ({
  info: {
    zIndex: "5000",
    position: "fixed",
    bottom: "20px",
    right: "70px",
  },
}));

function StatusInfo() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip title="Status Colors" arrow>
        <Fab className={classes.info}>
          <BsFillInfoCircleFill
            id="status-info-icon"
            onClick={() => setOpen((stat) => !stat)}
          />
        </Fab>
      </Tooltip>

      <div className="statuses">
        {Object.keys(STATUSES).map((key) => (
          <StatusElement
            color={STATUSES[key].color}
            name={STATUSES[key].name}
            key={STATUSES[key].color + STATUSES[key].name}
            open={open}
          />
        ))}
      </div>
    </>
  );
}

export default StatusInfo;
