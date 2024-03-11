import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from 'crypto';


const userSchema = new Schema({
    fullName:{
        type: 'String',
        required:[true, 'Name is required'],
        minLenght:[5, 'Name must be least then t charecters'],
        maxLenght:[50, 'Name should be less then 50 characters'],
        lowercase:true,
        trim: true,

    },
    email:{
        type:'String',
        required:[true, 'Email is required' ],
        lowercase:true,
        trim:true,
        unique:true,
        match:[/^\S+@\S+\.\S+$/, 
        'Please fill in a valid email address'],
    },
    password:{
        type:'String',
        required:[true, 'Password is required'],
        minLenght:[8, 'Password mast be at least 8 characters'],
        select:false,

        


    },

    // avater:{
    //     public_id:{
    //         type:'String'
    //     },

    //     secure_url:{
    //         type:'String'
    //     },
       


    // },
    role:{
        type:'String',
        enum:['USER','ADMIN'],
        default:'USER'


    },
    forgotPasswordToken: String,
    forgotPasswordExpiry:Date,
    subscription:{
        id: String,
        status: String

    }

},{
    timestamps:true

});
userSchema.pre('save', async function(next){
    if(!this.isModified("password")){
        return next();

    }
    this.password =await bcrypt.hash(this.password, 10);
})
userSchema.methods ={
    generateJWTToken:async function(){
        return await jwt.sign(
           {id:this.id, email: this.email,subscription: this.subscription, role: this.role} ,
           process.env.JWT_SECRET,
           {
            expiresIn:process.env.JWT_EXPIRY,
            
           }
        )
    },

    comparePassword: async function(plainTextPassword){
        return  await bcrypt.compare(plainTextPassword, this.password)

    },

    generatePasswordResetToken:async function () {
        const resetToken = crypto.randomBytes(20).toString('hex');

        this.forgotPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
         .digest('hex');
        this.forgotPasswordExpiry = Date.now() + 15 * 16 * 1000 ; // 15 mint from now



        return resetToken


    }
}

const User = model('User', userSchema);

export default User;