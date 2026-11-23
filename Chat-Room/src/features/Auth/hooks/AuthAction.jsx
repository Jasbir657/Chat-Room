import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../Config/Api.jsx";

export const logInUser = createAsyncThunk(
  "/login",
  async (Credential, thunkApi) => {
    try {
      const res = await api.post("/login", Credential);
      console.log(res);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || error.message,
        console.log(error)
      );
    }
  }
);