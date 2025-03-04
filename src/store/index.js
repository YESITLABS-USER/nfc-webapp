import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import clientSlice from "./slices/clientSlice";
import TermsAndPrivacySlice from "./slices/TermsAndPrivacySlice";
import contactAndFaqSlice from "./slices/contactAndFaqSlice";
import aboutTagisAndServicesSlice from "./slices/aboutTagisAndServicesSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    client: clientSlice,
    termsPrivacy: TermsAndPrivacySlice,
    contactAndFaq : contactAndFaqSlice,
    aboutTagisAndServices : aboutTagisAndServicesSlice
  },
});

export default store;
