import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";
import cloudinary from "cloudinary";
import fs from 'fs/promises';



const cookieOptions ={
    maxAge: 7*24*60*60*1000,// 7days
    httpOnly:true,
    secure:true
}

const register = async (req, res, next ) =>{
    const {fullName , email, password} =req.body;
    



    if(!fullName || !email || !password){
        return next (new AppError('All field are required', 400));
    }

    const userExists = await User.findOne({email});

    if(userExists){
        return next(new AppError('Email already exists', 400));

    }

    const user = await User.create({
        fullName,
        email,
        password,
         avatar:{
            public_id:email,
            secure_url:"https://955975174591238:6PXfiTBeHtJpps8QSdXV8CHq7Vo@drhstbwdf"
        }
       
    }); 
    if(!user){
        return next(new AppError('User registration failed, please try again', 400))
    }


    if(req.file){
        try {
            const result =await cloudinary.v2.uploader.upload(req.file.path,{
                folder:'lms',
                width:250,
                height:250,
                gravity:'faces',
                crop:'fill'
            }); 

            if (result) {
                user.avatar.public_id = result.public_id;  
                user.avatar.secure_url = result.secure_url;

                //Remove file from server


                fs.rm( `uploads/${req.file.filename}`)
            }
        } catch (e) {
            return next(new AppError( e || 'File not uploaded, Please try again',500))
        }
    }

    await user.save();

    user.password = undefined;


    const token = await user.generateJWTToken();

    res.cookie('token', token , cookieOptions)


    res.status(201).json({
        success:true,
        message:'User registered sucessfully',
        user,

    })



    

};
const login = async (req, res,next) =>{
    try {
        const {email , password} =req.body;

    if(!email || !password){
       
    }

    const user = await User.findOne({
        email
    }).select('+password');

    if(!user || !user.comparePassword(password)){
        return next(new AppError('Email or password does not match'))
    }

    const token = await user.generateJWTToken();
    user.password = undefined;

    res.cookie('token', token, cookieOptions);

    res.status(200).json({
        success: true,
        message:'User loggedin successfully',
        user,
})


    } catch (e) {
        return next(new AppError(e.message, 500))
    }

};   
    
const logout =(req, res,next) =>{
    res.cookie('token',null,{
        secure: true,
        maxAge:0,
        httpOnly:true

    });

    res.status(200).json({
        success:true,
        message:'User logged out successfully'
    })

};
const getProfile = async (req, res,next) =>{

    try {
        const userId = req.user.id;
    const user = await User.findById(userId);
    res.status(200).json({
        success:true,
        message:"User details",
        user
    });
    } catch (e) {
        return next(new AppError('Faild to fetch profile details'))

        
    }
    


};

const forgotPassword = async(req, res,next) =>{
    const {email} = req.body;

    if(!email){
        return next(new AppError('Email is required', 400));

    }
    const user = await User.findOne({email})

    if(!user){
        return next(new AppError('Email not registred', 400));

    }

    const resetToken = await user.generatePasswordResetToken();

    await user.save();

    const resetPasswordURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  const message = `${resetPasswordURL}`;
    try {
        await sendEmail(email, subject, message, next);

        res.status(200).json({
            success:true,
            message:`Reset password token has been send to ${email} successfully`
        })
    } catch (e) {
         
        user.forgotPasswordExpiry = undefined;
        user.forgotPasswordToken= undefined;

        await user.save();
        return next(new AppError(e.message, 500));
        
    }




}


const resetPassword = async (req, res) => {

    const {resetToken} = req.params;
    const {password} = req.body;

    const forgotPasswordToken = crypto
    .create('sha256')
    .upload(resetToken)
    .digest('hex');

    const user = await User.findOne({
        forgotPasswordToken,
        forgotPasswordExpiry:{$gt: Date.now()}

    });

    if(!user){
        return next(new AppError('Token is invailid or expire, please try again', 400))

    }
    user.password = password;
    user.forgotPasswordToken=undefined;
    user.forgotPasswordExpiry=undefined;
    user.save()
    res.status(200).json({
        success:true,
        message:'Password changed succefully!'
    })



}

const changePassword = async (req, res) =>{
    const {oldPassword, newPassword} = req.body;
    const {id} = req.user;


    if(!oldPassword || newPassword){
        return next(new AppError('All field are mandatory', 400))
    }

    const user = await user.findOne(id).select("+password");

    if(!user){
        return  next(new AppError('User does not exist', 400))
    }

    const isPasswordValid = await user.comparePassword(oldPassword);

    if(!isPasswordValid){
        return  next(new AppError('Invalid old password', 400))
    }

    user.password = newPassword;

    await user.save();

    user.password = undefined;
    res.status(200).json({
        success:true,
        message:'Password changed successfully!'
    })



}

const updatedUser= async ()=>{
     const {fullName} =req.body;
     const {id} = req.user.id;


 const user = await User.findById(id);


 if(!user){
     return next(new AppError('User does not exist', 400))
 }

 if(req.fullName){
    user.fullName = fullName;
 }

 if(req.file){
    await cloudinary.v2.uploader.destroy(user.avater.public_id)
    try {
        const result =await cloudinary.v2.uploader.upload(req.file.path,{
            folder:'lms',
            width:250,
            height:250,
            gravity:'faces',
            crop:'fill'
        }); 

        if(result) {
            user.avater.public_id= result.public_id;
            user.avater.secure_url = result.secure_url;


            


            fs.rm( `uploads/${req.file.filename}`)
        }
    } catch (e) {
        return next(new AppError(error || 'File not uploaded, Please try again',500))
    }
 }
 await user.save();
 
 res.status(200).json({
    success:true ,
    message:'User details updated successfully!'
 })


}

export {
    register,
    login,
    logout,
    getProfile,
    forgotPassword,
    resetPassword,
    changePassword,
    updatedUser, 


}