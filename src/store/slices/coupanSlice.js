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


export const getAllCoupans = createAsyncThunk("client/getAllCoupans", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.getAllCoupans(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});


export const getAllActivatedCoupans = createAsyncThunk("client/getAllActivatedCoupans", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.getAllActivatedCoupans(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const activateCoupan = createAsyncThunk("client/activateCoupan", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.activateCoupan(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const removeCoupan = createAsyncThunk("client/removeCoupan", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.removeCoupan(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});
 
const coupanSlice = createSlice({
  name: "coupanSlice",
  initialState: {
    coupansData: [],
    activatedCoupanData: [],
    coupanReward: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all Coupans
      .addCase(getAllCoupans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCoupans.fulfilled, (state, action) => {
        state.loading = false;
        state.coupansData = action.payload?.data;
      })
      .addCase(getAllCoupans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch Coupons";
      }) 

      // Get all Coupans
      .addCase(getAllActivatedCoupans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllActivatedCoupans.fulfilled, (state, action) => {
        state.loading = false;
        state.activatedCoupanData = action.payload?.data;
      })
      .addCase(getAllActivatedCoupans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch Coupons";
      }) 

      // reedem Coupans
      .addCase(activateCoupan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(activateCoupan.fulfilled, (state, action) => {
        state.loading = false;
        state.coupanReward = action.payload?.data;
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1000);
      })
      .addCase(activateCoupan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch Coupons";
      }) 
      // reedem Coupans
      .addCase(removeCoupan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCoupan.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Coupon card deleted successfully!");
      })
      .addCase(removeCoupan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch Coupons";
        toast.error("Failed to delete coupon card!");
      }) 
      
  },
});

export default coupanSlice.reducer;
