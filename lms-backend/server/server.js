import app from './app.js';
import connectionToDB from './config/db.Connection.js';
import cloudinary from 'cloudinary';
// import Razorpay from 'razorpay'
const PORT = process.env.PORT || 5000;

//testing

cloudinary.v2.config({
       cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
       api_key: process.env.APT_KEY,
       api_secret:process.env.CLOUDINARY_APL_SECRET,
});

// export const razorpay = new Razorpay({  
//        key_id:process.env.RAZORPAY_KEY_ID,
//        key_secret:RAZORPAY_SECRET
// })


app.listen(PORT, async () =>{
       await connectionToDB();

       console.log(`App is running at http:localhost: ${PORT}`)
});
