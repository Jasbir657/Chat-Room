import { createSlice } from "@reduxjs/toolkit";
import { logInUser } from "./AuthAction";

const AuthSlice = createSlice({
    name : "auth",
    initialState : {
        user : null,
        receiverId : null,
        isAuthenticated : false,
        AccessToken : null,
        isLoading : false 
    },
      reducers : {
        addUser : (state , action)=>{
            state.user = action.payload.user
            state.receiverId = action.payload.receiverId
            state.isAuthenticated = true
            state.AccessToken = action.payload.AccessToken
            state.isLoading = false
        },
        removeUser : (state)=>{
            state.user = null
            state.receiverId = null
            state.isAuthenticated = false
            state.isLoading = false
            state.AccessToken = null
        }
      },
      extraReducers : (builder)=>{
        builder.addCase(logInUser.pending, (state)=>{
            state.user = null
            state.receiverId = null
            state.isLoading = true
            state.Accesstoken = null
            state.isAuthenticated = false
        }).addCase(logInUser.fulfilled, (state , action)=>{
            state.user = action.payload.user
            state.receiverId = action.payload.receiverId
            state.isLoading = false
            state.Accesstoken = action.payload
            state.isAuthenticated = true
        }).addCase(logInUser.rejected , (state)=>{
            state.user = null
            state.receiverId = null
            state.isLoading = false
            state.isAuthenticated = false
            state.Accesstoken = null
      })
      }
})

export const {addUser , removeUser} = AuthSlice.actions

export default AuthSlice.reducer