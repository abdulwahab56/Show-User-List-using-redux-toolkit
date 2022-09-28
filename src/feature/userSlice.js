import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { json } from "react-router-dom";

const initialState = {
  users: [],
  logginuser: null,
  user: [
    {
      data: {
        status: "success",
        user: {
          id: 2,
          email: "janet.weaver@reqres.in",
          first_name: "Janet",
          last_name: "Weaver",
          avatar: "https://reqres.in/img/faces/2-image.jpg",
        },
      },
    },
  ],
};

export const signinUser = createAsyncThunk("signinUser", async (body) => {
  const result = await fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await result.json();
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.token = localStorage.getItem("token");
    },
    addUser: (state, action) => {
      state.user = localStorage.getItem("user");
    },
  },
  extraReducers: {
    [signinUser.pending]: (state, action) => {
      state.loadind = true;
    },
    [signinUser.fulfilled]: (
      state,
      { playload: { error, msg, token, user } }
    ) => {
      state.loadind = false;
      if (error) {
        state.error = error;
      } else {
        state.msg = msg;
        state.token = token;
        state.user = user;

        localStorage.getItem("msg", msg);
        localStorage.getItem("user", JSON.stringify(user));
        localStorage.getItem("token", token);
      }
    },
    [signinUser.rejected]: (state, action) => {
      state.loadind = true;
    },
  },
});

export const { addToken, addUser } = userSlice.actions;
export default userSlice.reducer;
