import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../assets/Helpers/axiosInstance"

const initialState ={
    key :"",
    subscription_id:"",
    isPaymentVerified: false,
    allPayment:{},
    finalMonths:{},
    monthlySalesRecord:[]

}
export const getRazorPayId =createAsyncThunk("/razorpay/getId",async() =>{
    try{
        const responce = await axiosInstance.get("/payments/razorpay-key");
        return responce.data;

    }catch(error){
        toast.error("Faild to load data")
    }
})
export const purchaseCourseBundle =createAsyncThunk("/purchaseCourse",async() =>{
    try{
        const responce = await axiosInstance.post("/payments/subscribe");
        return responce.data;

    }catch(error){
        toast.error(error?.responce?.data?.message)
    }
})

export const verifyUserPayment =createAsyncThunk("/payment/verify",async(data) =>{
    try{
        const responce = await axiosInstance.post("/payments/verify",{
            razorpay_payment_id:data.razoorpay_payment_Id,
            razorpay_subscription_id:data.razorpay_subscription_id,
            razorpay_signature:data.razorpay_signature
        });
        return responce.data;

    }catch(error){
        toast.error(error?.responce?.data?.message)
    }
})

export const getPaymentRecord =createAsyncThunk("/payment/record",async() =>{
    try{
        const responce = await axiosInstance.get("/payments?count=100");
        toast.promise(responce,{
            loading:"Getting the payment records",
            success:(data)  =>{
                return data?.data?.message
            },
            error: "Failed to get payment record"
        })
        return (await responce).data;

    }catch(error){
        toast.error("Operation failed")
    }
})

export const cancelCourseBundle =createAsyncThunk("/payment/cancel",async() =>{
    try{
        const responce = await axiosInstance.post("/payment/unsubscribe");
        toast.promise(responce,{
            loading:"unsubscribeing the bundle",
            success:(data)  =>{
                return data?.data?.message
            },
            error: "Failed to unsubscribe"
        })
        return (await responce).data;

    }catch(error){
        toast.error(error?.responce?.data?.message)
    }
})


const razorpaySlice = createSlice({
    name:"razorpay",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(getRazorPayId.fulfilled,(state, action) =>{
            state.key = action?.payload?.key;
        })
        .addCase(purchaseCourseBundle.fulfilled,(state,action) =>{
            state.subscription_id = action?.payload?.subscription_id;
        })
        .addCase(verifyUserPayment.fulfilled,(state,action) =>{
            toast.success(action?.payload?.message);
            state.isPaymentVerified = action?.payload.success
        })

        .addCase(verifyUserPayment.rejected,(state,action) =>{
            toast.success(action?.payload?.message);
            state.isPaymentVerified = action?.payload.success
        })
        .addCase(getPaymentRecord.rejected,(state,action) =>{
            state.allPayment = action ?.payload?.allPayments;
            state.finalMonths = action?.payload?.finalMonths;
            state.monthlySalesRecord = action?.payload?.monthlySalesRecord;

            
        })


    }
})

export default razorpaySlice.reducer