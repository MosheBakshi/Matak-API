import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

import React from "react";

import { reasonsArray, phonePrefixes } from "../../constants/infoConstants";

function RoutesInfoDetails({
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
  isDisabled = false,
}) {
  function handlePhoneNumber(e) {
    const re = /^[0-9\b]+$/;

    // if value is not blank, then test the regex

    if (e.target.value === "" || re.test(e.target.value)) {
      setPhonePostfix(e.target.value);
    }
  }

  return (
    <>
      <FormControl
        style={{ margin: "1rem 0" }}
        color="secondary"
        disabled={isDisabled}
      >
        <InputLabel id="reason-for-coordination">
          Reason For Coordination
        </InputLabel>
        <Select
          labelId="reason-for-coordination"
          value={reason}
          onChange={e => setReason(e.target.value)}
        >
          {reasonsArray.map(reason => (
            <MenuItem key={reason} value={reason}>
              {reason}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        disabled={isDisabled}
        color="secondary"
        style={{ margin: "1rem 0", backgroundColor: "rgba(0, 0, 0, 0.06)" }}
        label="Car's Liecene Number"
        variant="outlined"
        value={vehicleID}
        onChange={e => setVehicle(e.target.value)}
      />

      <TextField
        disabled={isDisabled}
        color="secondary"
        style={{ margin: "1rem 0", backgroundColor: "rgba(0, 0, 0, 0.06)" }}
        label="Driver's Full Name"
        variant="outlined"
        value={driversName}
        onChange={e => setDriversName(e.target.value)}
      />
      <InputLabel style={{ margin: "1rem 0 0.5rem 0" }}>
        Driver's Phone Number
      </InputLabel>
      <div style={{ display: "flex", marginBottom: "1rem" }}>
        <FormControl
          disabled={isDisabled}
          variant="outlined"
          color="secondary"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.06)",
            marginRight: "0.5rem",
          }}
        >
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={phonePrefix}
            onChange={e => setPhonePrefix(e.target.value)}
          >
            {phonePrefixes.map((prefix, i) => (
              <MenuItem key={prefix + i} value={prefix}>
                {prefix}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          disabled={isDisabled}
          color="secondary"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.06)", flexGrow: "1" }}
          variant="outlined"
          value={phonePostfix}
          onChange={handlePhoneNumber}
          inputProps={{ maxLength: 7 }}
        />
      </div>

      <TextField
        disabled={isDisabled}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.06)", margin: "1rem 0" }}
        color="secondary"
        label="Remarks"
        multiline
        rows={3}
        variant="outlined"
        value={remarks}
        onChange={e => setRemarks(e.target.value)}
      />
    </>
  );
}

export default RoutesInfoDetails;
