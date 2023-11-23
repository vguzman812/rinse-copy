import { createSlice } from '@reduxjs/toolkit';

// Retrieve user info from local storage
const userInfoFromStorage = localStorage.getItem('userInfo');

// If local storage already has user info then we set our initial state to that, otherwise null.
const initialState = {
  userInfo: userInfoFromStorage ? JSON.parse(userInfoFromStorage) : null,
};

// Slice which sets or removes current user info based on local storage presence.
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Sets current user credentials to both current state/store and local storage
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    // Removes current user credentials from both current state/store and local storage
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

// Exporting the actions generated by createSlice for use in components
export const { setCredentials, logout } = authSlice.actions;

// Export the reducer to be included in the Redux store
export default authSlice.reducer;
