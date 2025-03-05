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

export const reedemLoyalityCard = createAsyncThunk("client/reedemLoyalityCard", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.reedemLoyalityCard(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const deleteLoyalityCard = createAsyncThunk("client/deleteLoyalityCard", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.deleteLoyalityCard(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});
 
const coupanSlice = createSlice({
  name: "coupanSlice",
  initialState: {
    coupansData: [],
    loyalityReward: null,
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
        state.error = action.payload?.message || "Failed to fetch Coupans";
      }) 

      // reedem Coupans
      .addCase(reedemLoyalityCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reedemLoyalityCard.fulfilled, (state, action) => {
        state.loading = false;
        state.loyalityReward = action.payload?.data;
      })
      .addCase(reedemLoyalityCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch Coupans";
      }) 
      // reedem Coupans
      .addCase(deleteLoyalityCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLoyalityCard.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Loyalty card deleted successfully!");
      })
      .addCase(deleteLoyalityCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch Coupans";
        toast.error("Failed to delete loyalty card!");
      }) 
      
  },
});

export default coupanSlice.reducer;
