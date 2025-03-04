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
export const getAllFaq = createAsyncThunk("faq/getAllFaq", async (_, { rejectWithValue }) => {
  try {
    const response = await api.getAllFaq();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

//  FAQ API
export const createContact = createAsyncThunk("contact/createContact", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.createContact(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});
 
const contactAndFaqSlice = createSlice({
  name: "contactAndFaqSlice",
  initialState: {
    allFaqs: [],
    loading: false,
    contactLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all FAQ
      .addCase(getAllFaq.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllFaq.fulfilled, (state, action) => {
        state.loading = false;
        state.allFaqs = action.payload?.data;

      })
      .addCase(getAllFaq.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch Faq's";
      })

      // Fill a Contact form
      .addCase(createContact.pending, (state) => {
        state.contactLoading = true;
        state.error = null;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.contactLoading = false;
        toast.success(action.payload?.message || "Message sent successfully")
      })
      .addCase(createContact.rejected, (state, action) => {
        state.contactLoading = false;
        state.error = action.payload || "Failed to send Message";
      })

  },
});

export default contactAndFaqSlice.reducer;
