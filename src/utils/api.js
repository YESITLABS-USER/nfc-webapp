// import axios from "axios";
// import { KEYS, baseURL } from "../config/constant";
// import { clearUser } from "../store/slices/userSlice";
// import store from "../store";

// const guestApi = axios.create({
//   baseURL: baseURL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// const api = axios.create({
//   baseURL: baseURL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
// guestApi.interceptors.request.use(
//   async (config) => {
//     try {
//       const { userInfo } = store.getState().user;

//       let token = userInfo?.token;

//       const storedUserString = JSON.parse(
//         await localStorage.getItem(KEYS.USER_INFO)
//       );
//       token = storedUserString.access_token || token;

//       if (token) {
//         config.headers["Authorization"] = token ? `Bearer ${token}` : "";
//       } else {
//         console.log("No token found");
//       }

//       return config;
//     } catch (error) {
//       console.error("Error in interceptor", error);
//       return Promise.reject(error);
//     }
//   },
//   (error) => {
//     return Promise.reject(error); // Handle request errors
//   }
// );

// // Request interceptor for api
// api.interceptors.request.use(
//   async (config) => {
//     try {
//       return config;
//     } catch (error) {
//       console.error("Error in api request interceptor:", error);
//       return Promise.reject(error);
//     }
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor for api
// api.interceptors.response.use(
//   (response) => {
//     if (response) {
//       return response;
//     } else {
//       return Promise.reject(
//         new Error("Server not responding. Please try again.")
//       );
//     }
//   },
//   (err) => {
//     const errorResponse = {
//       message: "Something went wrong. Please try again later.",
//       status: null,
//       details: null,
//     };

//     if (err.response) {
//       // If the API responded with an error status

//       errorResponse.status = err.response.status;
//       errorResponse.message = err.response.data?.data?.message;
//     }

//     // Special handling for unauthorized access
//     if (err.response?.status === 401) {
//       store.dispatch(clearUser());
//     }

//     return Promise.reject(errorResponse);
//   }
// );

// export { api, guestApi };
