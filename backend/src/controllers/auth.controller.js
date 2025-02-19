import { generateToken } from "../lib/util.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signup = async (req,res) => {
    const{fullName,email,password}= req.body;
    try {

        if(!fullName || !password || !email ){
            return res.status(400).json({message: "All feilds are required"});

        }

        if(password.length<8){
            return res.status(400).json({message : "Password must be at least 8 characters"});
        }

        const user = await User.findOne({email});

        if (user) return res.status(400).json({message: "Email already Exists"});
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            fullName : fullName,
            email : email,
            password : hashedPassword
        
        })
        if (newUser) {
            //generate JWT token here
            generateToken(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id : newUser._id,
                fullName : newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({messsage: "Invalid user data"});
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
};

export const login = (req,res) => {
    res.send("login route");
};

export const logout = (req,res) => {
    res.send("logout route");
};