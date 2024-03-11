import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../assets/Helpers/axiosInstance";
import toast from "react-hot-toast";


const initialState = {
    
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') != 'undefined' ? JSON.parse(localStorage.getItem('data')) : {}

};

export const createAccount = createAsyncThunk("/auth/signup",async (data) => {
    try {
        const response = axiosInstance.post("/user/register",data)
      
        toast.promise(response,{
            loading:"wait! creating your account ",
            success:(data) =>{
                return data?.data?.message;
            },
            error: "Failed to create account"
        });

        

        return (await response).data;

        
        
    } catch (error) {
        toast.error(error?.responce?.data?. message);

        
    }
}) 
export const Login = createAsyncThunk("/auth/login",async (data) => {
    try {
        const response = axiosInstance.post("/user/login",data)
      
        toast.promise(response,{
            loading:"wait! authentication in progress... ",
            success:(data) =>{
                return data?.data?.message;
            },
            error: "Failed to login"
        });
        return (await response).data;

        } catch (error) {
        toast.error(error?.responce?.data?. message);

        
    }
}) 
export const logout =createAsyncThunk('/auth/logout', async()=>{
    try {
        const response = axiosInstance.get("/user/logout")
      
        toast.promise(response,{
            loading:"wait! logout in progress... ",
            success:(data) =>{
                return data?.data?.message;
            },
            error: "Failed to logout"
        });
        return (await response).data;

    } catch (e) {
        toast.error(error?.responce?.data?. message);

    }
})

export const updateProfile =createAsyncThunk('/user/update/profile', async(data)=>{
    try {
        const response = axiosInstance.put(`/user/update/${data[0]}`,data[1])
      
        toast.promise(response,{
            loading:"wait! profile update in progress... ",
            success:(data) =>{
                return data?.data?.message;
            },
            error: "Failed to update profile"
        });
        return (await response).data;

    } catch (e) {
        toast.error(error?.responce?.data?. message);

    }
})

export const getUserData =createAsyncThunk('/user/details', async()=>{
    try {
        const response = axiosInstance.get("/user/me")
      
        return (await response).data;

    } catch (error) {
        toast.error(error.message);

    }
})

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(Login.fulfilled,(state, action)=>{
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn",true);
            localStorage.setItem("role",action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role =action?.payload?.user?.role

        })
        .addCase(logout.fulfilled,(state,) =>{
            localStorage.clear();
            state.data ={};
            state.isLoggedIn = false;
            state.role = "";
        })
        .addCase(getUserData.fulfilled,(state, action) =>{
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn",true);
            localStorage.setItem("role",action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role =action?.payload?.user?.role
 
        })
    }

});

export const {} = authSlice.actions;
export default authSlice.reducer;