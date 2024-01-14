import axios from "axios";

const BASE_URL = "http://localhost:3000/api/";
const BASE_API = axios.create({ baseURL: BASE_URL });

export const getCaloriesPublicApi = (inputData) =>
  BASE_API.post("/", inputData);

export const registerApi = (newUser) => BASE_API.post("/signup", newUser);
export const loginApi = (user) => BASE_API.post("/login", user);
export const logoutApi = (token) =>
  BASE_API.get("/logout", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const getCurrentUserApi = (token) =>
  BASE_API.get("/current-user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const updateCurrentUserApi = (token, name) =>
  BASE_API.patch(
    "/current-user/update",
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getCaloriesAndSaveApi = (token, userInput) =>
  BASE_API.post("/homepage", userInput, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const searchProductsApi = (token, searchQuery) =>
  BASE_API.get(`/homepage/search?q=${searchQuery}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const addProductsToDiaryApi = (token, userSelection) =>
  BASE_API.put("/homepage/diary/add-product", userSelection, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const deleteProductApi = (token, id, selectedDate) =>
  BASE_API.delete(`/homepage/diary/remove/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      selectedDate: selectedDate,
    },
  });
export const getDiariesApi = (token) =>
  BASE_API.get("/homepage/diary", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const verifyAccountApi = (verificationId) =>
  BASE_API.get(`/verify/${verificationId}`);

export const resendVerificationCodeApi = (email) =>
  BASE_API.post("/user/verify", email);
