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

//  User API
export const getClientInfo = createAsyncThunk("client/getClientInfo", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.getClientInfo(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const getAllLoyalityCards = createAsyncThunk("client/getAllLoyalityCards", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.getAllLoyalityCards(formData);
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
 
const clientSlice = createSlice({
  name: "clientSlice",
  initialState: {
    clientData: null,
    loyalityCards: [],
    loyalityReward: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Sign-up user
      .addCase(getClientInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClientInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.clientData = action.payload?.data;
      })
      .addCase(getClientInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch client information";
      }) 
      // Get all loyality cards
      .addCase(getAllLoyalityCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllLoyalityCards.fulfilled, (state, action) => {
        state.loading = false;
        state.loyalityCards = action.payload?.data;
      })
      .addCase(getAllLoyalityCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch loyality cards";
      })  // Delete user

      // reedem loyality cards
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
        state.error = action.payload?.message || "Failed to fetch loyality cards";
      })  // Delete user
  },
});

export default clientSlice.reducer;
