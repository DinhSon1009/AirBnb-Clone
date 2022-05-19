import { createSlice } from "@reduxjs/toolkit";
import localStorageServ from "../services/localStorage.service";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: localStorageServ.userInfor.get(),
  },
  reducers: {
    setUserToStorage: (state, action) => {
      state.user = action.payload;
      localStorageServ.userInfor.set(action.payload);
    },
    removeUserFromStorage: (state, action) => {
      state.user = null;
      localStorageServ.userInfor.remove();
      localStorageServ.accessToken.remove();
    },
  },
});

const { reducer, actions } = userSlice;
export const { setUserToStorage, removeUserFromStorage } = actions;

export default reducer;
