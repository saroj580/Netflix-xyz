import jwt from 'jsonwebtoken'
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv'

dotenv.config();

const Register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            return res.status(401).json(
                {
                    message: "Invalid data",
                    success: false
                }
            )
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json(
                {
                    message: "This email is already used, Please try another email ?",
                    success : false
                }
            )
        }

        await User.create({
            fullName,
            email,
            password
        })

        return res.status(201).json(
            {
                message: "Account created successfully.",
                success: true
            }
        )

    } catch (error) {
        console.log(error);
    }
}


const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json(
                {
                    message: "Invalid data",
                    success: false
                }
            )
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json(
                {
                    message: "Invalid email or password",
                    success : false
                }
            )
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json(
                {
                    message: "Invalid email or password",
                    success : false
                }
            ) 
        }

        const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
        return res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        }).json({
            message: `Welcome ${user.fullName}`,
            success: true
        });
      
    } catch (error) {
        console.log(error);
    }
}

const logout = async (req, res) => {
    return res.status(200).cookie('token', "", {
        httpOnly: true,
        expires: new Date(0)
    }).json({
        message: "Logout successfully",
        success: true
    });
};

export {
    Register,
    Login,
    logout
};
