import { createSlice } from "@reduxjs/toolkit";
import axiosConfig from "../config/axiosConfig";

export const userRoutesSlice = createSlice({
  name: "userRoutes",
  initialState: {
    isHidden: false,
    loading: false,
    routes: [],
    filteredRoutes: [],
  },
  reducers: {
    setRoutes: (state, { payload }) => {
      state.routes = [...payload];
      state.loading = false;
      state.filteredRoutes = [];
    },

    setFilteredRoutes: (state, { payload }) => {
      state.filteredRoutes = [...payload];
    },
    toggleIsHidden: state => {
      state.isHidden = !state.isHidden;
    },
    turnOffIsHidden: state => {
      state.isHidden = false;
      state.filteredRoutes = [];
    },
    loadingOn: state => {
      state.loading = true;
    },
  },
});

export const {
  setRoutes,
  toggleIsHidden,
  turnOffIsHidden,
  loadingOn,
  setFilteredRoutes,
} = userRoutesSlice.actions;

export default userRoutesSlice.reducer;

export const fetchRoutes = () => async dispatch => {
  dispatch(loadingOn());
  try {
    const { data } = await axiosConfig.get("/path");
    let routesDetailsArray = data.data;

    const result = routesDetailsArray.map(route => {
      const arrayOfPoints = route["Array_Of_Points"]["features"].map(
        feature => {
          const _id = route["_id"];
          const routeName = route["Path_Name"];
          return { ...feature, properties: { _id, routeName } };
        }
      );

      return { ...route, Array_Of_Points: arrayOfPoints };
    });

    dispatch(setRoutes(result));
  } catch (error) {
    console.log(error);
  }
};

export const showfilteredRoutes = routes => dispatch => {
  dispatch(setFilteredRoutes([routes]));
};
