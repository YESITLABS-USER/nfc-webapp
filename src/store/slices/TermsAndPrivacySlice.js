import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../Api";
import { toast } from "react-toastify";


// // For Unauthenticated User
// function logouterror() {
//   toast.error("Token Expired")
//   localStorage.removeItem("nfc-admin");
//   setTimeout(() => {
//     window.location.href = "/";
//   }, 1000);
// }


export const getTermsCondition = createAsyncThunk("TermsAndPrivacy/getTermsCondition", async (_, { rejectWithValue }) => {
  try {
    const response = await api.getTermsCondition();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});
export const getPrivacyPolicy = createAsyncThunk("TermsAndPrivacy/getPrivacyPolicy", async (_, { rejectWithValue }) => {
  try {
    const response = await api.getPrivacyPolicy();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

const TermsAndPrivacySlice = createSlice({
  name: "TermsAndPrivacySlice",
  initialState: {
    termsData: null,
    privacyData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all Terms and Conditions
      .addCase(getTermsCondition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTermsCondition.fulfilled, (state, action) => {
        state.loading = false;
        state.termsData = action.payload?.data?.[0];
      })
      .addCase(getTermsCondition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch Terms and Conditions";
      })

      // Get all Privacy policy
      .addCase(getPrivacyPolicy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPrivacyPolicy.fulfilled, (state, action) => {
        state.loading = false;
        state.privacyData = action.payload?.data?.[0];
      })
      .addCase(getPrivacyPolicy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch Privacy Policy";
      })
    
  },
});

export default TermsAndPrivacySlice.reducer;
