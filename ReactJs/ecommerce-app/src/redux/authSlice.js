import { createSlice } from "@reduxjs/toolkit";

const getLoggedInUser = () => {
  try {
    const user = localStorage.getItem("loggedInUser");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    return null;
  }
};

const getAllUsers = () => {
  try {
    const users = localStorage.getItem("allUsers");
    return users ? JSON.parse(users) : [];
  } catch (error) {
    return [];
  }
};

const initialState = {
  user: getLoggedInUser(),
  allUsers: getAllUsers(),
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup: (state, action) => {
      const { name, email, password, confirmPassword } = action.payload;
      const existingUser = state.allUsers.find((user) => user.email === email);

      if (existingUser) {
        state.error = "An account with this email already exists.";
        return;
      }
      if (password.length <= 6) {
        state.error = "Password must be more than 6 characters long.";
        return;
      }
      if (password !== confirmPassword) {
        state.error = "Passwords do not match.";
        return;
      }

      const newUser = { name, email, password };
      state.allUsers.push(newUser);
      state.user = { name, email };
      state.error = null;

      localStorage.setItem("allUsers", JSON.stringify(state.allUsers));
      localStorage.setItem("loggedInUser", JSON.stringify({ name, email }));
    },
    login: (state, action) => {
      const { email, password } = action.payload;
      const userToLogin = state.allUsers.find((user) => user.email === email);

      if (!userToLogin) {
        state.error = "No account found with this email.";
        return;
      }
      if (userToLogin.password !== password) {
        state.error = "Incorrect password.";
        return;
      }

      const { name } = userToLogin;
      state.user = { name, email };
      state.error = null;
      localStorage.setItem("loggedInUser", JSON.stringify({ name, email }));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("loggedInUser");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { signup, login, logout, clearError } = authSlice.actions;

export default authSlice.reducer;
