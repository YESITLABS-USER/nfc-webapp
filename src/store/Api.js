import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("nfc-app"))?.token}`,
    'lang': localStorage.getItem("language") || "eng",
    'Accept' : 'application/json'
  },
});

export const login = (formData) => API.post("/api/v1/login", formData);

export const logout = (id) => API.post('/api/v1/logout', id, {
  // headers: {
  //   'Authorization': `Bearer ${JSON.parse(localStorage.getItem("nfc-app"))?.token}`,
  // }
});

// ------------------------------ User Slice APi -----------------------------------------------


export const locationChange = (formData) => API.post(`/api/v1/change-lang`, formData);

export const signUp = (formData) => API.post(`/api/v1/send-otp`, formData);

export const signIn = (formData) => API.post(`/api/v1/send-otp-login`, formData);
// export const signIn = (formData) => API.post(`/api/v1/user-login`, formData);

export const verifyOtp = (formData) => API.post(`/api/v1/verify-otp-signup`, formData);

export const loginVerifyOtp = (formData) => API.post(`/api/v1/verify-otp-login`, formData);
// export const loginVerifyOtp = (formData) => API.post(`/api/v1/verify-otp`, formData);

export const resendOtp = (formData) => API.post(`/api/v1/resend-otp`, formData);

export const getUser = (formData) => API.post(`/api/v1/my-profile-get`, formData);
export const updateUser = (formData) => API.post(`/api/v1/my-profile-update`, formData);
export const deleteUser = (formData) => API.post(`/api/v1/delete-account`, formData);


// ---------------------------------- Client Api --------------------------------
export const getClientInfoWithoutLogin = (formData) => API.post(`/api/v1/get-client-detail-with-out-login`,formData);


export const getClientInfo = (formData) => API.post(`/api/v1/get-client-detail`,formData);

// export const getAllLoyalityCards = (formData) => API.post(`/api/v1/get-all-loyality-cards`,formData);
export const getAllLoyalityCards = (formData) => API.post(`/api/v2/get-all-loyality-cards`,formData);


export const getAllCoupans = (formData) => API.post(`/api/v2/show-all-coupon-of-particular-client-on-particular-location`,formData);

export const getAllActivatedCoupans = (formData) => API.post(`/api/v2/activated-15-min-coupon`,formData);

export const addClientInUser = (formData) => API.post(`/api/v1/add-client-in-user`,formData);

export const activateCoupan = (formData) => API.post(`/api/v1/activate-coupon-of-user`,formData);

export const removeCoupan = (formData) => API.post(`/api/v1/remove-coupan`,formData);


// ---------------------------------- Loyality Reedem Api --------------------------------
export const reedemLoyalityCard = (formData) => API.post(`/api/v1/loyality-card-change-stamp`,formData);

export const deleteLoyalityCard = (formData) => API.post(`/api/v1/remove-loyality-card`,formData);


// ---------------------------------- Get All client (my Page) --------------------------------

export const getAllClients = (formData) => API.post(`/api/v1/all-visited-clients-by-user`,formData);

export const unfollowClient = (formData) => API.post(`/api/v1/follow-client`,formData);


// ---------------------------------- About Tagis Api -----------------------------------------------

export const getAboutTagis = () => API.get(`/api/v1/get-about-us`,);

// ---------------------------------- About Services Api -----------------------------------------------

export const getAboutServices = () => API.get(`/api/v1/get-about-services`,);

// ---------------------------------- Terms and Condition and Privacy Api --------------------------------

export const getTermsCondition = () => API.get(`/api/v1/term-condition`,);

export const getPrivacyPolicy = () => API.get(`/api/v1/privacy-policy`,);


// ---------------------------------- Contact Api --------------------------------

export const createContact = (formData) => API.post(`/api/v1/save-contact`, formData);

// ---------------------------------- FAQ Api --------------------------------

export const getAllFaq = () => API.get(`/api/v1/view-faq`,);
