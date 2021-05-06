import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPermanent: false,
  isEditAvailable: false,
  isDoneMainRoute: true,
  currentCreatedRoute: [],
  isSelectingStart: false,
  isSelectingEnd: false,
  startingPosition: null,
  endingPosition: null,
};
export const createdRouteSlice = createSlice({
  name: "createdRoute",
  initialState,
  reducers: {
    editAvailableOn: state => {
      state.isEditAvailable = true;
    },
    editAvailableOff: state => {
      state.isEditAvailable = false;
    },
    createRoute: (state, { payload }) => {
      state.currentCreatedRoute.unshift(payload);
    },
    togglePermanentRoute: state => {
      state.isPermanent = !state.isPermanent;
    },
    addPosition: (state, { payload }) => {
      const latestRoute = state.currentCreatedRoute[0];
      if (
        latestRoute.routeType === "Polygon" ||
        latestRoute.routeType === "LineString"
      ) {
        latestRoute.positions.push(payload);
      } else {
        latestRoute.positions = [payload];
      }
    },
    removeLastRoute: state => {
      state.currentCreatedRoute.shift();
    },
    removeLastPoint: state => {
      state.currentCreatedRoute[0].positions.pop();
    },
    resetRoute: state => initialState,
    resetStartAndEnd: state => {
      state.startingPosition = null;
      state.endingPosition = null;
    },
    setSelectingStartOn: state => {
      state.isSelectingStart = true;
      state.isSelectingEnd = false;
    },
    setSelectingEndOn: state => {
      state.isSelectingStart = false;
      state.isSelectingEnd = true;
    },
    setStartingPosition: (state, { payload }) => {
      state.startingPosition = payload;
    },
    setEndingPosition: (state, { payload }) => {
      state.endingPosition = payload;
    },
    setStartAndEnd: (state, { payload }) => {
      state.startingPosition = payload.start;
      state.endingPosition = payload.end;
    },
    setIsDoneMainRouteOff: state => {
      state.isDoneMainRoute = false;
    },
    setIsDoneMainRouteOn: state => {
      state.isDoneMainRoute = true;
    },
  },
});

export const {
  createRoute,
  togglePermanentRoute,
  addPosition,
  removeLastRoute,
  editAvailableOn,
  editAvailableOff,
  removeLastPoint,
  resetRoute,
  setSelectingStartOn,
  setSelectingEndOn,
  setStartingPosition,
  setEndingPosition,
  setStartAndEnd,
  resetStartAndEnd,
  setIsDoneMainRouteOff,
  setIsDoneMainRouteOn,
} = createdRouteSlice.actions;

export default createdRouteSlice.reducer;

export const createNewRoute = type => dispatch => {
  dispatch(createRoute({ routeType: type, positions: [] }));
};

export const addPositionToCurrent = position => dispatch => {
  dispatch(addPosition(position));
};

export const addToStartingPosition = position => dispatch => {
  dispatch(setStartingPosition(position));
};

export const addToEndingPosition = position => dispatch => {
  dispatch(setEndingPosition(position));
};

export const displayStartAndEnding = (start, end) => dispatch => {
  dispatch(setStartAndEnd({ start, end }));
};
