import bcrypt from 'bcrypt';
import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';


//  Register New user
// POST /api/auth/register
export const register = async (req,res,next)=>{
    try {
        const {name,email,password}= req.body;

        // validation
        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "Name,email and password required",
            });
        }
        //  already registerd
        const exsisting = await User.findOne({email});
        if(exsisting){
            return res.status(409).json({
                success: false,
                message: " Email already registered",
            });
        }
        //  password hashing
        const hashedPassowrd = await bcrypt.hash(password,10);
        //  User saving 
        const user =await User.create({
            name,
            email,
            password: hashedPassowrd,
        });
        //  jwt token
        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPRIES_IN}
        );
        return res.status(201).json({
        success: true,
        message: "User registered successfully",
        token,
        data: {
        id: user._id,
        name: user.name,
        email: user.email,
        },
    });
    } catch (error) {
        next(error);
    }
};

// login user
// post/api/auth/login
export const login =  async (req,res,next)=>{
    try {
        const {email,password}=req.body;

        // validation
        if (!email || !password) {
        return res.status(400).json({
        success: false,
        message: "email and password are required",
        });
    }
    // check user
    const user = await User.findOne({email});
    if(!user){
        return res.status(401).json({
        success: false,
        message: "Invalid email or password", 
        });
    }
    // comapre password
    const isMatch = await bcrypt.compare(password,user.password);
    if (!isMatch) {
        return res.status(401).json({
        success: false,
        message: "Invalid email or password",
        });
    }
    // create token
    const token = jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET,
        {expiresIn :process.env.JWT_EXPRIES_IN}
    );
        return res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        data: {
        id: user._id,
        name: user.name,
        email: user.email,
        },
    });
    } catch (error) {
        next(error);
    }
};

// Get current login user
//  GET/api/auth/me
export const getMe = async (req,res)=>{
    return res.status(200).json({
    success: true,
    data: req.user,
    });
};