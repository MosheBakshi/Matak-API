import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";

function Reporting() {
  const statusList = [
    "Check All",
    "Approved",
    "Denied",
    "Submitted",
    "Suspended",
    "Received",
    "Canceled",
    "Completed",
    "Deleted",
  ];
  const organizationList = [
    "Check All",
    "Matak",
    "UN",
    "RC",
    "UNRWA",
    "OCHA",
    "ACU",
    "ARBEL",
  ];

  const reasonsList = [
    "Check All",
    "Infrastructure",
    "Repair",
    "Assessment",
    "Sanitation/Waste disposal",
    "Facilities supply",
    "Staff movment",
    "Damage assessment",
    "Needs assessment",
    "Commodities loading",
    "Food distribution",
    "Emergency response",
    "Ambulance",
    "Fire truck",
    "Civil defence",
    "UXO",
  ];
  const escortsList = [
    "Check All",
    "Matak",
    "UN",
    "RC",
    "UNRWA",
    "OCHA",
    "ACU",
    "ARBEL",
  ];

  const useStyles = makeStyles(theme => ({
    ulStyle: {
      border: "1px solid rgba(0, 0, 0, 0.1)",
      borderRadius: "5px",
      height: "150px",
      overflowY: "scroll",
      flexWrap: "nowrap",
      padding: "0 0.5rem",
      backgroundColor: "rgba(0, 0, 0, 0.06)",
    },
  }));
  const classes = useStyles();
  const [reasons, setReasons] = useState({
    CheckAll: false,
    Infrastructure: false,
    Repair: false,
    Assessment: false,
    Sanitation: false,
    FacilitiesSupply: false,
    StaffMovment: false,
    DamageAssessment: false,
    NeedsAssessment: false,
    CommoditiesLoading: false,
    FoodDistribution: false,
    EmergencyResponse: false,
    Ambulance: false,
    FireTruck: false,
    CivilDefence: false,
    UXO: false,
  });
  const [organization, setOrganization] = useState({
    CheckAll: false,
    Matak: false,
    UN: false,
    RC: false,
    UNRWA: false,
    OCHA: false,
    ACU: false,
    ARBEL: false,
  });
  const [status, setStatus] = useState({
    CheckAll: false,
    Approved: false,
    Denied: false,
    Submitted: false,
    Suspended: false,
    Received: false,
    Canceled: false,
    Completed: false,
    Deleted: false,
  });
  const [escort, setEscort] = useState({
    CheckAll: false,
    Matak: false,
    UN: false,
    RC: false,
    UNRWA: false,
    OCHA: false,
    ACU: false,
    ARBEL: false,
  });

  const handleChangeStatus = event => {
    setStatus({ ...status, [event.target.name]: event.target.checked });
  };
  const handleChangeOrg = event => {
    setOrganization({
      ...organization,
      [event.target.name]: event.target.checked,
    });
  };
  const handleChangeReas = event => {
    setReasons({ ...reasons, [event.target.name]: event.target.checked });
  };
  const handleChangeEsc = event => {
    setEscort({ ...escort, [event.target.name]: event.target.checked });
  };

  const [startingDate, setStartingDate] = useState(new Date());
  const [endingDate, setEndingDate] = useState(new Date());

  const handleStartingDate = date => {
    setStartingDate(date);
    if (date >= endingDate) setEndingDate(date);
  };

  const handleEndingDate = date => {
    if (date >= startingDate) setEndingDate(date);
  };

  return (
    <>
      <h1>Find Routes</h1>
      <Grid container spacing={3}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid item md={6} xs={12}>
            <KeyboardDatePicker
              style={{ marginRight: "1rem" }}
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              label="Pick Starting Date"
              value={startingDate}
              onChange={handleStartingDate}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              label="Pick Ending Date"
              value={endingDate}
              onChange={handleEndingDate}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>

        <Grid item md={6} xs={12}>
          <label>Status</label>
          <FormGroup className={classes.ulStyle}>
            {statusList.map((stat, index) => {
              return (
                <FormControlLabel
                  key={stat + index}
                  control={
                    <Checkbox
                      size="small"
                      checked={status[stat]}
                      onChange={handleChangeStatus}
                      name={stat}
                      color="secondary"
                    />
                  }
                  label={stat}
                />
              );
            })}
          </FormGroup>
        </Grid>

        <Grid item md={6} xs={12}>
          <label>Involved Organizations</label>
          <FormGroup className={classes.ulStyle}>
            {organizationList.map((org, index) => {
              return (
                <FormControlLabel
                  key={org + index}
                  control={
                    <Checkbox
                      size="small"
                      checked={organization[org]}
                      onChange={handleChangeOrg}
                      name={org}
                      color="secondary"
                    />
                  }
                  label={org}
                />
              );
            })}
          </FormGroup>
        </Grid>

        <Grid item md={6} xs={12}>
          <label>Reason For Coordination</label>
          <FormGroup className={classes.ulStyle}>
            {reasonsList.map((reas, index) => {
              return (
                <FormControlLabel
                  key={reas + index}
                  control={
                    <Checkbox
                      size="small"
                      checked={reasons[reas]}
                      onChange={handleChangeReas}
                      name={reas}
                      color="secondary"
                    />
                  }
                  label={reas}
                />
              );
            })}
          </FormGroup>
        </Grid>
        <Grid item md={6} xs={12}>
          <label>Escorting Organization</label>
          <FormGroup className={classes.ulStyle}>
            {escortsList.map((esc, index) => {
              return (
                <FormControlLabel
                  key={esc + index}
                  control={
                    <Checkbox
                      size="small"
                      checked={escort[esc]}
                      onChange={handleChangeEsc}
                      name={esc}
                      color="secondary"
                    />
                  }
                  label={esc}
                />
              );
            })}
          </FormGroup>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="secondary"
        style={{
          alignSelf: "flex-end",
          padding: "0.5rem 2rem",
          margin: "2rem 0",
        }}
      >
        Find
      </Button>
    </>
  );
}

export default Reporting;
