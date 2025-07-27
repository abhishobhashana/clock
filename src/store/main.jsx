import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSideMenuOpen: true,
  isSearchPanelOpen: false,
  searchValue: "",
  searchResultValue: [],
  location: {},
  timezone: "",
  showAddBtn: false,
  clockListByLocations: [],
  activeClock: 0,
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setSideMenuOpen: (state, action) => {
      state.isSideMenuOpen = action.payload;
    },
    setSearchPanelOpen: (state, action) => {
      state.isSearchPanelOpen = action.payload;
    },
    setSearchValueState: (state, action) => {
      state.searchValue = action.payload;
    },
    setSearchResultState: (state, action) => {
      state.searchResultValue = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setTimezone: (state, action) => {
      state.timezone = action.payload;
    },
    setAddBtn: (state, action) => {
      state.showAddBtn = action.payload;
    },
    setClockListByLocations: (state, action) => {
      const index = state.clockListByLocations.findIndex(
        (item) => item.name === action.payload.name
      );
      if (!(index > -1)) {
        const len = state.clockListByLocations.length;
        state.clockListByLocations.push({
          id: state.clockListByLocations.length >= 1 ? len + 1 : 1,
          ...action.payload,
        });
      }
    },
    updateLocation: (state, action) => {
      const index = state.clockListByLocations.findIndex(
        (item) => item.name === action.payload.name
      );
      if (index > -1) {
        state.clockListByLocations.splice(index, 1, action.payload);
      }
    },
    deleteLocation: (state, action) => {
      const index = state.clockListByLocations.findIndex(
        (item) => item.id === action.payload
      );
      if (index > -1) {
        state.clockListByLocations.splice(index, 1);
      }
    },
    setActiveClock: (state, action) => {
      state.activeClock = action.payload;
    },
  },
});

const { actions, reducer } = mainSlice;

export const {
  setSideMenuOpen,
  setSearchPanelOpen,
  setSearchValueState,
  setSearchResultState,
  setLocation,
  setTimezone,
  setAddBtn,
  setClockListByLocations,
  deleteLocation,
  updateLocation,
  setActiveClock,
} = actions;

export default reducer;
