import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpServ from "../services/http.service";

export const getRoomListAction = createAsyncThunk(
  "location/getRoomList",
  async () => {
    const response = await httpServ.layDanhSachPhongChoThueTheoViTri();
    return response.data;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    roomList: [],
    suggestion: false,
    button: false,
    locationID: null,
    addressData: null,
  },
  reducers: {
    setSuggestion: (state, action) => {
      state.suggestion = action.payload;
    },
    setRoomList: (state, action) => {
      state.roomList = action.payload;
    },
    setLocationID: (state, action) => {
      state.locationID = action.payload;
    },
    setAddressData: (state, action) => {
      state.addressData = action.payload;
    },
  },
  extraReducers: {
    [getRoomListAction.fulfilled]: (state, action) => {
      state.roomList = action.payload;
    },
  },
});
const { reducer, actions } = searchSlice;
export const { setSuggestion, setRoomList, setLocationID, setAddressData } =
  actions;
export default reducer;
