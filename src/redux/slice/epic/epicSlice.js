import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ================= CREATE EPIC =================
export const createEpicAction = createAsyncThunk(
  "epics/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/epics",
        data
      );

      return res.data.data; // 👈 match backend
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ================= FETCH EPICS =================
export const fetchEpicsAction = createAsyncThunk(
  "epics/fetch",
  async (projectId, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/epics/${projectId}`
      );

      return res.data.data; // 👈 match backend
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ================= SLICE =================
const epicSlice = createSlice({
  name: "epics",
  initialState: {
    epics: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createEpicAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEpicAction.fulfilled, (state, action) => {
        state.loading = false;
        state.epics.push(action.payload);
      })
      .addCase(createEpicAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH
      .addCase(fetchEpicsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEpicsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.epics = action.payload;
      })
      .addCase(fetchEpicsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default epicSlice.reducer;