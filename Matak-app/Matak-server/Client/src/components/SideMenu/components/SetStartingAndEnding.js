import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectingStartOn,
  setSelectingEndOn,
  editAvailableOff,
  addToStartingPosition,
  addToEndingPosition,
} from "../../../redux/createdRoute";
import { ROUTE_ADDITIONAL_DETAILS } from "../../../constants/pageConstants";

function SetStartingAndEnding({ setPage }) {
  const dispatch = useDispatch();

  const {
    isSelectingStart,
    isSelectingEnd,
    startingPosition,
    endingPosition,
  } = useSelector(state => {
    return state.createdRoute;
  });
  const [startingLngPosition, setStartingLngPosition] = useState("");
  const [startingLatPosition, setStartingLatPosition] = useState("");
  const [endingLngPosition, setEndingLngPosition] = useState("");
  const [endingLatPosition, setEndingLatPosition] = useState("");

  const handleNext = () => {
    dispatch(editAvailableOff());
    setPage({ open: ROUTE_ADDITIONAL_DETAILS });
  };

  return (
    <>
      <h2>Set Starting And Ending Positions</h2>
      <h3>Set On Map</h3>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Button
          color="secondary"
          variant={isSelectingStart ? "contained" : "outlined"}
          style={{ width: "40%" }}
          onClick={() => dispatch(setSelectingStartOn())}
        >
          set start
        </Button>
        <Button
          color="secondary"
          variant={isSelectingEnd ? "contained" : "outlined"}
          style={{ width: "40%" }}
          onClick={() => dispatch(setSelectingEndOn())}
        >
          set end
        </Button>
      </div>
      <div
        style={{
          borderTop: "1px solid rgba(0, 0, 0, 0.15)",
          margin: "1.8rem 0 1rem 0",
        }}
      ></div>
      <h3 style={{ marginBottom: 0 }}>Set Manually</h3>
      <h4>Start Position:</h4>
      <div>
        <TextField
          style={{
            marginRight: "0.5rem",
            backgroundColor: "rgba(0, 0, 0, 0.06)",
          }}
          color="secondary"
          id="outlined-number"
          label="Latitude"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          required
          variant="outlined"
          value={startingLatPosition}
          onChange={e => setStartingLatPosition(e.target.value)}
        />

        <TextField
          style={{
            marginRight: "0.5rem",
            backgroundColor: "rgba(0, 0, 0, 0.06)",
          }}
          color="secondary"
          id="outlined-number"
          label="Longitude"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          required
          variant="outlined"
          value={startingLngPosition}
          onChange={e => setStartingLngPosition(e.target.value)}
        />
        <Button
          variant="contained"
          color="secondary"
          style={{ fontSize: "1.6rem" }}
          disabled={!startingLatPosition || !startingLngPosition}
          onClick={() =>
            dispatch(
              addToStartingPosition([startingLatPosition, startingLngPosition])
            )
          }
        >
          +
        </Button>
      </div>
      <h4>End Position:</h4>
      <div>
        <TextField
          style={{
            marginRight: "0.5rem",
            backgroundColor: "rgba(0, 0, 0, 0.06)",
          }}
          color="secondary"
          id="outlined-number"
          label="Latitude"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          required
          variant="outlined"
          value={endingLatPosition}
          onChange={e => setEndingLatPosition(e.target.value)}
        />

        <TextField
          style={{
            marginRight: "0.5rem",
            backgroundColor: "rgba(0, 0, 0, 0.06)",
          }}
          color="secondary"
          id="outlined-number"
          label="Longitude"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          required
          variant="outlined"
          value={endingLngPosition}
          onChange={e => setEndingLngPosition(e.target.value)}
        />
        <Button
          variant="contained"
          color="secondary"
          style={{ fontSize: "1.6rem" }}
          disabled={!endingLatPosition || !endingLngPosition}
          onClick={() =>
            dispatch(
              addToEndingPosition([endingLatPosition, endingLngPosition])
            )
          }
        >
          +
        </Button>
      </div>

      <Button
        variant="contained"
        color="secondary"
        style={{
          alignSelf: "flex-end",
          padding: "0.5rem 2rem",
          margin: "2rem 0 1rem 0",
        }}
        onClick={handleNext}
        disabled={!startingPosition || !endingPosition}
      >
        Next
      </Button>
    </>
  );
}

export default SetStartingAndEnding;
