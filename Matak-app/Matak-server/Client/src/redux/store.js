import { configureStore } from "@reduxjs/toolkit";
import { reducer as formReducer } from "redux-form";
import usersReducer from "./users";
import createdRouteReducer from "./createdRoute";
import userRoutesReducer from "./userRoutes";
// import startingAndEndingReducer from "./startingAndEnding";

export default configureStore({
  reducer: {
    users: usersReducer,
    createdRoute: createdRouteReducer,
    userRoutes: userRoutesReducer,
    // startingAndEnding: startingAndEndingReducer,
    form: formReducer,
  },
});
