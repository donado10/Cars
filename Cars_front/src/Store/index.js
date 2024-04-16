import { createSlice, configureStore } from "@reduxjs/toolkit";
import { calculRemainingTime } from "../helpers/MyLib";

const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");
const expires = localStorage.getItem("expires");

const initialAuthState = {
  token: token,
  userId: userId,
  expires: expires,
  isAuth: calculRemainingTime(expires) ? true : false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    setAuthStatus(state, action) {
      state.token = action.payload.token;
      state.isAuth = action.payload.isAuth;
      state.userId = action.payload.userId;
      state.expires = action.payload.expires;

      localStorage.setItem("token", state.token);
      localStorage.setItem("userId", state.userId);
      localStorage.setItem("expires", state.expires);
    },
  },
});

const store = configureStore({
  reducer: { auth: authSlice.reducer },
});

setTimeout(() => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expires");
  localStorage.removeItem("isAuth");
  store.dispatch(
    authActions.setAuthStatus({
      token: "",
      userId: "",
      expires: 0,
      isAuth: false,
    })
  );
}, calculRemainingTime(expires));

export const authActions = authSlice.actions;

export default store;
