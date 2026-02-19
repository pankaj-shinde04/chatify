import jwt from 'jsonwebtoken';

export const generateToken = (userId,res)=>{
    const {JWT_SECRET} = process.env;
    if(!JWT_SECRET){
        throw new Error("JWT_SECRET is not configured");
    }
    const token = jwt.sign({userId}, JWT_SECRET,{
        expiresIn: "7d",
    });

    res.cookie("jwt",token,{
        maxAge: 7*24*60*60*1000, // 7 days in milliseconds
        httpOnly: true,
        secure: process.env.NODE_ENV === "development"? false:true, // set secure flag in development
        sameSite: "strict", // prevent CSRF
    });

    return token;
}