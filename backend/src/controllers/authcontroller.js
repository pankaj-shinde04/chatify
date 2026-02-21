import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/util.js";


export const signup = async (req, res)=>{
   const {fullName, email, password} = req.body;

   try {
    if(!fullName  || !email || !password){
        return res.status(400).json({message: "Please provide all required fields"});
    }

    if(password.length < 6){
        return res.status(400).json({message: "Password must be at least 6 characters long"});
    }

   // check if emails valid: regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        return res.status(400).json({message: "Please provide a valid email address"});
    }
    
    const user = await User.findOne({email: email});
     if(user) return res.status(400).json({message: "User with this email already exists"});
     
     // for hashing password we use bcryptjs library
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);

     const newUser = new User({
        fullName,
        email,
        password: hashedPassword,
     });
     if(newUser){
     // before saving the user to database we generate a token for the user and send it in response, so that user can be logged in immediately after signup   
    //    generateToken(newUser._id, res);
    //    await newUser.save()
    // after saving the user to database we generate a token for the user and send it in response, so that user can be logged in immediately after signup
       const savedUser = await newUser.save();
       generateToken(savedUser._id, res); 

       res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
       })
       // todo:send a welcome email to user
     } else{
     res.status(400).json({message: "Error creating user"});
     }
   } catch (error) {
    
    console.log("Error in signup controller:", error);
    res.status(500).json({message: "Server error"});
    
   }
};

export const login = async (req,res)=>{
    const {email, password} = req.body;

    try {
       const user = await User.findOne({email: email});
         if(!user) return res.status(400).json({message: "Invalid Credentials"});
         
         const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if(!isPasswordCorrect) return res.status(400).json({message: "Invalid Credentials"});

            // generate token and send in response
            generateToken(user._id, res);
            
            res.status(200).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                profilePic: user.profilePic,
            });  
    } catch (error) {
        console.error("Error in login controller", error);
        res.status(500).json({message: "Server error"});
    }
}

export const logout =  (_, res)=>{
  
    res.cookie("jwt", "",{maxAge:0});
    res.status(200).json({message: "Logged out successfully"});
}