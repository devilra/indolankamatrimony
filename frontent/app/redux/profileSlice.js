import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";

export const registerProfile = createAsyncThunk(
  "profile/registerProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await API.post("/profile/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Server error" }
      );
    }
  }
);

// ✅ Get all profiles
export const getAllProfiles = createAsyncThunk(
  "profile/getAllProfiles",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/profile/all");
      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Server error" }
      );
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    loading: false,
    success: false,
    error: null,
    data: null,
    profiles: [], // for all profiles
  },
  reducers: {
    resetProfileState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerProfile.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(registerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })
      .addCase(registerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // 🟦 Get All Profiles
      .addCase(getAllProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.profiles = action.payload.data; // ✅ only profiles array
        state.success = true;
      })
      .addCase(getAllProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { resetProfileState } = profileSlice.actions;
export default profileSlice.reducer;
