import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@material-ui/core";
import { FaLock } from "react-icons/fa";
import React, { useMemo, useState } from "react";
import { STATUSES } from "../../../constants/statusConstants";
import axiosConfig from "../../../config/axiosConfig";
import useDispatchRoutes from "../../../customHooks/useDispatchRoutes";
import DatePicker from "../../DatePicker";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleIsHidden,
  showfilteredRoutes,
  turnOffIsHidden,
} from "../../../redux/userRoutes";
import { resetStartAndEnd } from "../../../redux/createdRoute";
import RoutesInfoDetails from "../../RoutesInfoDetails/RoutesInfoDetails";
import { FiDownload } from "react-icons/fi";
import download from "js-file-download";
import axios from "axios";

function ViewAndChange({ selectedRoute, setSideMenu }) {
  const {
    Remarks,
    Reason_Text,
    Is_Permanent,
    Status_Name,
    Path_Name,
    _id,
    Start_Date,
    End_Date,
    Driver_Name,
    Car_Liecene_Number,
    Terms_Text,
    Driver_Cellphone,
    Files_Path_Array,
  } = selectedRoute;

  const dispatch = useDispatch();

  const {
    currentUser: { isAdminOrMatakUser },
  } = useSelector(state => state.users);

  const { isHidden } = useSelector(state => {
    return state.userRoutes;
  });
  const { fetchRoutesData } = useDispatchRoutes();
  const [status, setStatus] = useState(Status_Name);

  const [terms, setTerms] = useState(Terms_Text);
  const [reason, setReason] = useState(Reason_Text);
  const [driversName, setDriversName] = useState(Driver_Name);
  const [vehicleID, setVehicle] = useState(Car_Liecene_Number);
  const [phonePrefix, setPhonePrefix] = useState(
    Driver_Cellphone.split("-")[0]
  );
  const [phonePostfix, setPhonePostfix] = useState(
    Driver_Cellphone.split("-")[1]
  );
  const [remarks, setRemarks] = useState(Remarks);

  const [startingDate, setStartingDate] = useState(
    new Date(Start_Date ? Start_Date : null)
  );
  const [endingDate, setEndingDate] = useState(
    new Date(End_Date ? End_Date : null)
  );

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const statusesArray = useMemo(() => {
    return Object.values(STATUSES).filter(status => {
      if (
        status.name !== STATUSES.BeingCreated.name &&
        status.name !== STATUSES.Permanent.name
      ) {
        return status;
      }
    });
  }, [STATUSES]);

  const handleSubmitRoute = async () => {
    const send = {
      _id,
      Terms_Text: terms,
      Start_Date: startingDate,
      End_Date: endingDate,
      Reason_Text: reason,
      Driver_Name: driversName,
      Driver_Cellphone: `${phonePrefix}-${phonePostfix}`,
      Car_Liecene_Number: vehicleID,
      // Remarks: Re+remarks,
      Status_Name: Status_Name === "Changes-Required" ? "Submitted" : status,
    };
    try {
      await axiosConfig.put("/path", send);

      fetchRoutesData();
      setSideMenu(false);
      dispatch(turnOffIsHidden());
      dispatch(resetStartAndEnd());
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteRoute = async () => {
    const send = {
      data: { _id },
    };
    try {
      await axiosConfig.delete("/path", send);
      setOpen(false);
      fetchRoutesData();
      dispatch(turnOffIsHidden());
      dispatch(resetStartAndEnd());

      setSideMenu(false);
    } catch (error) {
      console.log(error);
    }
  };

  const dateController = {
    endingDate,
    setEndingDate,
    startingDate,
    setStartingDate,
  };

  const RouteInfoDetailsController = {
    reason,
    setReason,
    driversName,
    setDriversName,
    vehicleID,
    setVehicle,
    phonePrefix,
    setPhonePrefix,
    phonePostfix,
    setPhonePostfix,
    remarks,
    setRemarks,
  };

  const handleHideOtherRoutes = () => {
    dispatch(toggleIsHidden());
    dispatch(showfilteredRoutes(selectedRoute));
  };

  const permissions = useMemo(
    () => ({
      isDisabled: Status_Name !== "Changes-Required",
    }),
    []
  );

  const handleDownload = () => {
    // axios
    //   .post("https://www.hitprojectscenter.com/matakapinew/api/path/download", {
    //     fileName: Files_Path_Array[0],
    //     "Content-Type": "application/pdf",
    //   })
    //   .then(response => {
    //     const url = window.URL.createObjectURL(new Blob([response.data]));
    //     const link = document.createElement("a");
    //     link.href = url;
    //     link.setAttribute("download", "file.pdf");
    //     document.body.appendChild(link);
    //     link.click();
    //   });
  };
  return (
    <>
      <h1>View Route Details</h1>
      <span
        style={{
          fontSize: "22px",
          alignSelf: "center",
          textTransform: "capitalize",
        }}
      >
        {Path_Name}
        {Is_Permanent ? (
          <>
            <span
              style={{
                fontWeight: "bold",
                marginRight: "10px",
              }}
            >
              {" "}
              - Permanent Route
            </span>
            <FaLock />
          </>
        ) : (
          ""
        )}
      </span>
      <FormControlLabel
        control={
          <Switch
            checked={isHidden}
            onChange={handleHideOtherRoutes}
            name="hide-routes"
            color="secondary"
          />
        }
        label="Hide Routes"
      />

      <DatePicker {...dateController} isDisabled={permissions.isDisabled} />

      {!Is_Permanent && (
        <FormControl style={{ margin: "0.8rem 0" }} color="secondary">
          <InputLabel id="route-status">Route Status</InputLabel>
          <Select
            labelId="route-status"
            value={status}
            onChange={e => setStatus(e.target.value)}
            disabled={!isAdminOrMatakUser}
          >
            {statusesArray.map(status => (
              <MenuItem
                disabled={status.name === STATUSES.Submitted.name}
                key={status.name}
                value={status.name}
              >
                {status.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      <TextField
        disabled={!isAdminOrMatakUser}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.06)", margin: "0.8rem 0" }}
        color="secondary"
        label="Terms"
        multiline
        rows={2}
        variant="outlined"
        value={terms}
        onChange={e => setTerms(e.target.value)}
      />

      {!Is_Permanent && (
        <RoutesInfoDetails
          {...RouteInfoDetailsController}
          isDisabled={permissions.isDisabled}
        />
      )}
      <div>
        {isAdminOrMatakUser && (
          <>
            <Button
              variant="contained"
              color="secondary"
              style={{
                margin: "0.8rem 0",
                width: "100%",
              }}
              onClick={handleClickOpen}
            >
              Delete
            </Button>

            <Dialog
              style={{ zIndex: 10000 }}
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Delete Route</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete this route?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                  Cancel
                </Button>
                <Button
                  onClick={handleDeleteRoute}
                  color="primary"
                  variant="contained"
                  disableElevation
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </div>

      <Button
        variant="contained"
        color="secondary"
        style={{
          padding: "0.7rem 0rem",
        }}
        onClick={handleDownload}
      >
        <FiDownload />
      </Button>
      {((isAdminOrMatakUser && !Is_Permanent) ||
        (!isAdminOrMatakUser && !permissions.isDisabled)) && (
        <Button
          variant="contained"
          color="secondary"
          style={{
            alignSelf: "flex-end",
            padding: "0.5rem 2rem",
            margin: "0.8rem 0",
          }}
          onClick={handleSubmitRoute}
          disabled={!vehicleID || !phonePostfix || !driversName}
        >
          Send
        </Button>
      )}
    </>
  );
}

export default ViewAndChange;
