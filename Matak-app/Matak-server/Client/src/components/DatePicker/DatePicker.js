import { makeStyles } from "@material-ui/core";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
// import { useSelector } from "react-redux";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function DatePicker({
  startingDate,
  setStartingDate,
  endingDate,
  setEndingDate,
  isDisabled = true,
}) {
  const classes = useStyles();
  // const { isPermanent } = useSelector(state => {
  //   return state.createdRoute;
  // });

  const handleStartingDate = date => {
    const today = new Date();
    if (date >= today) setStartingDate(date);
    if (date >= endingDate) setEndingDate(date);
  };

  const handleEndingDate = date => {
    if (date >= startingDate) setEndingDate(date);
  };

  const handleStaringHour = e => {
    const [hours, minutes] = e.target.value.split(":");
    const today = new Date();
    const newDate = new Date(startingDate);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    if (newDate >= today) setStartingDate(newDate);
    if (newDate >= endingDate) setEndingDate(newDate);
  };

  const handleEndingHour = e => {
    const [hours, minutes] = e.target.value.split(":");

    const newDate = new Date(endingDate);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);

    if (newDate >= startingDate) setEndingDate(newDate);
  };

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div id={"starting-date-picker"}>
          <KeyboardDatePicker
            color="secondary"
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            label="Pick Starting Date"
            value={startingDate}
            onChange={handleStartingDate}
            disabled={isDisabled}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <TextField
            color="secondary"
            style={{ marginTop: "16px", width: "105px" }}
            label="Starting Hour"
            type="time"
            value={`${
              startingDate.getHours() < 10
                ? "0" + startingDate.getHours()
                : startingDate.getHours()
            }:${
              startingDate.getMinutes() < 10
                ? "0" + startingDate.getMinutes()
                : startingDate.getMinutes()
            }`}
            onChange={handleStaringHour}
            disabled={isDisabled}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 900,
            }}
          />
        </div>
        <div id={"ending-date-picker"} style={{ marginTop: "1rem" }}>
          <KeyboardDatePicker
            color="secondary"
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            label="Pick Ending Date"
            value={endingDate}
            onChange={handleEndingDate}
            disabled={isDisabled}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <TextField
            color="secondary"
            style={{ marginTop: "16px", width: "105px" }}
            label="Ending Hour"
            type="time"
            value={`${
              endingDate.getHours() < 10
                ? "0" + endingDate.getHours()
                : endingDate.getHours()
            }:${
              endingDate.getMinutes() < 10
                ? "0" + endingDate.getMinutes()
                : endingDate.getMinutes()
            }`}
            onChange={handleEndingHour}
            disabled={isDisabled}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 900,
            }}
          />
        </div>
      </MuiPickersUtilsProvider>
    </>
  );
}

export default DatePicker;
