import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../Api.js";
import { toast } from "react-toastify";


// // For Unauthenticated User
// function logouterror() {
//   toast.error("Token Expired")
//   localStorage.removeItem("nfc-admin");
//   setTimeout(() => {
//     window.location.href = "/";
//   }, 1000);
// }
// // ------------------------ Contact us and FAQ APi ------------------------------------------------


//  FAQ API
export const getAboutTagis = createAsyncThunk("tagis/getAboutTagis", async (_, { rejectWithValue }) => {
  try {
    const response = await api.getAboutTagis();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

//  FAQ API
export const getAboutServices = createAsyncThunk("services/getAboutServices", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.getAboutServices(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});
 
const aboutTagisAndServicesSlice = createSlice({
  name: "aboutTagisAndServicesSlice",
  initialState: {
    tagisData: null,
    servicesData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all FAQ
      .addCase(getAboutTagis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAboutTagis.fulfilled, (state, action) => {
        state.loading = false;
        state.tagisData = action.payload?.data;
      })
      .addCase(getAboutTagis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch about tagis data";
      })

      // Fill a Contact form
      .addCase(getAboutServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAboutServices.fulfilled, (state, action) => {
        state.loading = false;
        state.servicesData = action.payload?.data;
      })
      .addCase(getAboutServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch about services";
      })

  },
});

export default aboutTagisAndServicesSlice.reducer;
