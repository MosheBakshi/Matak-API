import { createSlice } from "@reduxjs/toolkit";
import { CURRENT_USER, USERS } from "../api";
import axiosConfig from "../config/axiosConfig";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    currentUser: null,
    users: [],
    loading: "idle",
    error: null,
    results: null,
  },
  reducers: {
    currentUserReceived: (state, action) => {
      state.currentUser = action.payload;
      state.loading = "idle";
    },
    usersReceived: (state, action) => {
      state.users = action.payload;
      state.loading = "idle";
      state.results = null;
    },
    userLoading: (state, action) => {
      state.loading = "pending";
    },
    userUpdateRecieved: (state, action) => {
      state.loading = "idle";
      state.results = action.payload;
    },
    userNotificationsRecieved: (state, action) => {
      state.loading = "idle";
      state.results = action.payload;
    },
    userCreateRecieved: (state, action) => {
      state.loading = "idle";
      state.results = action.payload;
      state.error = null;
    },
    userDeleteRecieved: (state, action) => {
      state.loading = "idle";
      state.results = action.payload;
      state.error = null;
    },
    userError: (state, action) => {
      state.loading = "idle";
      state.results = null;
      state.error = action.payload;
    },
    logoutUser: (state, action) => {
      state.currentUser = null;
    },
    clear: state => {
      state.results = null;
      state.error = null;
    },
  },
});

export const {
  currentUserReceived,
  usersReceived,
  userLoading,
  userUpdateRecieved,
  userNotificationsRecieved,
  userCreateRecieved,
  userDeleteRecieved,
  userError,
  logoutUser,
  clear,
} = usersSlice.actions;

export default usersSlice.reducer;

export const fetchCurrentUser = (id, goHome) => async dispatch => {
  dispatch(userLoading());
  try {
    const { data } = await axiosConfig.post("/users/get", { _id: id });
    const isAdminOrMatakUser =
      data.data[0].User_Type === "Admin" || data.data[0].User_Type === "Matak";
    dispatch(currentUserReceived({ ...data.data[0], isAdminOrMatakUser }));
    goHome();
  } catch (error) {
    console.log("oops", error);
    dispatch(userError({ error: "some api error" }));
  }
};

export const fetchUsers = () => async dispatch => {
  dispatch(userLoading());
  try {
    const res = await axiosConfig.post("/users/get", {});
    dispatch(usersReceived(res.data.data));
  } catch (error) {
    dispatch(userError({ error: error.response.data.error }));
  }
};

export const createUser = user => async dispatch => {
  dispatch(userLoading());
  try {
    const res = await axiosConfig.post("/users/", user);
    dispatch(userCreateRecieved(res.data.data));
  } catch (error) {
    dispatch(userError("Failed to create a new user"));
  }
};

export const editUser = user => async dispatch => {
  dispatch(userLoading());
  try {
    const res = await axiosConfig.put("/users", user);
    dispatch(userUpdateRecieved(res.data.data));
  } catch (error) {
    dispatch(userError("Failed to edit the user"));
  }
};

export const deleteUser = userId => async dispatch => {
  dispatch(userLoading());
  try {
    // WILL BE API CALL
    const res = await axiosConfig.delete("/users", { data: { _id: userId } });
    dispatch(userDeleteRecieved(res.data));
  } catch (error) {
    dispatch(userError("Failed to delete the user"));
  }
};
// export const fetchUserNotification = userId => async dispatch => {
//   dispatch(userLoading());
//   try {
//     // WILL BE API CALL
//     const res = await axiosConfig.post();
//     dispatch(userNotificationsRecieved(res.data));
//   } catch (error) {
//     dispatch(userError("Failed to delete the user"));
//   }
// };

export const UpdateUser = (id, email, phone) => async dispatch => {
  dispatch(userLoading());
  try {
    const { data } = await axiosConfig.put("/users", {
      _id: id,
      Email: email,
      Mobile: phone,
    });
    if (data.success) alert(data.message);
    setTimeout(() => dispatch(userUpdateRecieved(data)), 2000);
  } catch (error) {
    dispatch(userError({ error: "some api error" }));
  }
};
