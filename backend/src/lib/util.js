import jwt from 'jsonwebtoken';
import { ENV } from './env.js';

export const generateToken = (userId,res)=>{
    const {JWT_SECRET} = ENV;

    const token = jwt.sign({userId}, JWT_SECRET,{
        expiresIn: "7d",
    });

    res.cookie("jwt",token,{
        maxAge: 7*24*60*60*1000,
        httpOnly: true,
        secure: ENV.NODE_ENV === "production", // better way
        sameSite: "lax",  // ✅ CHANGE THIS
    });

    return token;
}