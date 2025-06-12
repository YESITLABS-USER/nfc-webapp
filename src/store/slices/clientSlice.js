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

//  Client Get without Login API
export const getClientInfoWithoutLogin = createAsyncThunk("client/getClientInfoWithoutLogin", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.getClientInfoWithoutLogin(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});
//  Client API
export const getClientInfo = createAsyncThunk("client/getClientInfo", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.getClientInfo(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const getAllClients = createAsyncThunk("client/getAllClients", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.getAllClients(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const unfollowClient = createAsyncThunk("client/unfollowClient", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.unfollowClient(formData);
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

export const getAllActivatedLoyalityCards = createAsyncThunk("client/getAllActivatedLoyalityCards", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.getAllActivatedLoyalityCards(formData);
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
export const addClientInUser = createAsyncThunk("client/addClientInUser", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.addClientInUser(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});
 
const clientSlice = createSlice({
  name: "clientSlice",
  initialState: {
    clientData: null,
    allClientsData: null,
    loyalityCards: [],
    activatedLoyalityCard: [],
    loyalityReward: null,
    couponLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Single Client Info user
      .addCase(getClientInfoWithoutLogin.pending, (state) => {
        state.couponLoading = true;
        state.error = null;
      })
      .addCase(getClientInfoWithoutLogin.fulfilled, (state, action) => {
        state.couponLoading = false;
        state.clientData = action.payload?.data;
      })
      .addCase(getClientInfoWithoutLogin.rejected, (state, action) => {
        state.couponLoading = false;
        state.error = action.payload?.message || "Failed to fetch client information";
      }) 

      // Single Client Info user
      .addCase(getClientInfo.pending, (state) => {
        state.couponLoading = true;
        state.error = null;
      })
      .addCase(getClientInfo.fulfilled, (state, action) => {
        state.couponLoading = false;
        state.clientData = action.payload?.data;
      })
      .addCase(getClientInfo.rejected, (state, action) => {
        state.couponLoading = false;
        state.error = action.payload?.message || "Failed to fetch client information";
      }) 

      // Sign-up user
      .addCase(unfollowClient.pending, (state) => {
        state.couponLoading = true;
        state.error = null;
      })
      .addCase(unfollowClient.fulfilled, (state, action) => {
        state.couponLoading = false;
        toast.success(action.payload?.message || "Client unfollowed successfully")
      })
      .addCase(unfollowClient.rejected, (state, action) => {
        state.couponLoading = false;
        state.error = action.payload?.message || "Failed to fetch client information";
      }) 

      // Sign-up user
      .addCase(getAllClients.pending, (state) => {
        state.couponLoading = true;
        state.error = null;
      })
      .addCase(getAllClients.fulfilled, (state, action) => {
        state.couponLoading = false;
        state.allClientsData = action.payload?.data;
      })
      .addCase(getAllClients.rejected, (state, action) => {
        state.couponLoading = false;
        state.error = action.payload?.message || "Failed to fetch client information";
      }) 

      // Get all loyality cards
      .addCase(getAllLoyalityCards.pending, (state) => {
        state.couponLoading = true;
        state.error = null;
      })
      .addCase(getAllLoyalityCards.fulfilled, (state, action) => {
        state.couponLoading = false;
        state.loyalityCards = action.payload?.data;
      })
      .addCase(getAllLoyalityCards.rejected, (state, action) => {
        state.couponLoading = false;
        state.error = action.payload?.message || "Failed to fetch loyality cards";
      }) 

      // Get all loyality cards
      .addCase(getAllActivatedLoyalityCards.pending, (state) => {
        state.couponLoading = true;
        state.error = null;
      })
      .addCase(getAllActivatedLoyalityCards.fulfilled, (state, action) => {
        state.couponLoading = false;
        state.activatedLoyalityCard = action.payload?.data;
      })
      .addCase(getAllActivatedLoyalityCards.rejected, (state, action) => {
        state.couponLoading = false;
        state.error = action.payload?.message || "Failed to fetch loyality cards";
      }) 

      // reedem loyality cards
      .addCase(reedemLoyalityCard.pending, (state) => {
        state.couponLoading = true;
        state.error = null;
      })
      .addCase(reedemLoyalityCard.fulfilled, (state, action) => {
        state.couponLoading = false;
        state.loyalityReward = action.payload?.data;
      })
      .addCase(reedemLoyalityCard.rejected, (state, action) => {
        state.couponLoading = false;
        state.error = action.payload?.message || "Failed to fetch loyality cards";
      }) 
      // reedem loyality cards
      .addCase(deleteLoyalityCard.pending, (state) => {
        state.couponLoading = true;
        state.error = null;
      })
      .addCase(deleteLoyalityCard.fulfilled, (state, action) => {
        state.couponLoading = false;
        toast.success("Loyalty card deleted successfully!");
      })
      .addCase(deleteLoyalityCard.rejected, (state, action) => {
        state.couponLoading = false;
        state.error = action.payload?.message || "Failed to fetch loyality cards";
        toast.error("Failed to delete loyalty card!");
      }) 
      // Add Client in User
      .addCase(addClientInUser.pending, (state) => {
        state.couponLoading = true;
        state.error = null;
      })
      .addCase(addClientInUser.fulfilled, (state, action) => {
        state.couponLoading = false;
        state.message = action.payload?.message;
        localStorage.setItem('url', ("/home/"+action.payload?.slug));
        window.location.href = ("/home/"+action.payload?.slug)
      })
      .addCase(addClientInUser.rejected, (state, action) => {
        state.couponLoading = false;
        state.error = action.payload?.message;
        localStorage.setItem('url', ("/home/invalid-page"));
        window.location.href = ("/home/invalid-page")
      }) 
  },
});

export default clientSlice.reducer;
