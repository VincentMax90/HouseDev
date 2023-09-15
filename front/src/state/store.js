import { configureStore } from "@reduxjs/toolkit";

import reducerUser from "./user";


const persistenceState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};

const store = configureStore({
  reducer: {
    user: reducerUser,
    
  },
  preloadedState: persistenceState,
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("reduxState", JSON.stringify(state));
});

export default store;
