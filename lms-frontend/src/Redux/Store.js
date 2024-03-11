import {configureStore} from '@reduxjs/toolkit';

import AuthSliceReducer from './Slices/AuthSlice'
import CourseSliceReducer from './Slices/CourseSlice';
import razorpaySliceReducer from './Slices/RazorpaySlice'
import lectureSliceReducer from './Slices/lectureSlice';
import statSliceReducer  from './Slices/StarSlice'


const store = configureStore({
    reducer: {
        auth: AuthSliceReducer,
        course:CourseSliceReducer,
        razorpay:razorpaySliceReducer,
        lecture:lectureSliceReducer,
        stat:statSliceReducer
    },
    devTools: true
});

export default store;