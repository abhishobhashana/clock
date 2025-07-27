import { createSlice } from "@reduxjs/toolkit";
import { updateLocation } from "./main";

const initialState = {
  loading: false,
  data: [],
  addLocationData: null,
  error: null,
};

const clockSlice = createSlice({
  name: "clock",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    setAddLocationData: (state, action) => {
      state.loading = false;
      state.addLocationData = action.payload;
    },
    fetchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const { actions, reducer } = clockSlice;

export const { fetchStart, fetchSuccess, setAddLocationData, fetchFailure } =
  actions;

export const fetchBoundry = (osm_id, osm_type) => async (dispatch) => {
  dispatch(fetchStart());

  try {
    const typePrefix = osm_type?.charAt(0).toUpperCase();
    const url = `https://nominatim.openstreetmap.org/lookup?osm_ids=${typePrefix}${osm_id}&format=jsonv2&polygon_geojson=1`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const osmData = await response.json();
    dispatch(fetchSuccess(osmData));
  } catch (err) {
    dispatch(fetchFailure(err?.message || "Failed to fetch boundary"));
  }
};

export default reducer;
