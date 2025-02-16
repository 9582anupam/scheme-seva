import User from "../models/user.model.js";
import { generateAccessAndRefreshToken } from "../helper/generateAccessAndRefreshToken.js";
import jwt from "jsonwebtoken";

// signup a new user
const signUp = async (req, res) => {
    try {
        // Destructure the user's data from the request body
        const { name, email, password } = req.body;

        // Check if all fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                status: 400,
                success: false,
            });
        }

        // Check if the user already exists
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(400).json({
                message: "User already exists",
                status: 400,
                success: false,
            });
        }

        // Check for minimum password length
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long",
                status: 400,
                success: false,
            });
        }

        // Apply email regex
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format",
                status: 400,
                success: false,
            });
        }

        // Create a new user
        const newUser = new User({ name, email, password });
        await newUser.save();

        // fetch user information
        const user = await User.findById(newUser._id).select("-password");

        // Send back the created user's information
        return res.status(201).json({
            message: "User registered successfully",
            user,
            status: 201,
            success: true,
        });
    } catch (error) {
        console.error("error while registering a user", error);
        return res.status(500).json({
            message: "Error while registering a user",
            error: error.message,
            status: 500,
            success: false,
        });
    }
};

// login an existing user
const login = async (req, res) => {
    try {
        // Destructure the user's data from the request body
        const { email, password } = req.body;

        // Check if all fields are provided
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                status: 400,
                success: false,
            });
        }

        // Check if the user exists
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                message: "User does not exist",
                status: 400,
                success: false,
            });
        }

        // Check if the password is correct
        const isMatch = await user.isPasswordCorrect(password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Incorrect password",
                status: 400,
                success: false,
            });
        }

        // Generate access token and refresh token
        const { accessToken, newRefreshToken: refreshToken } = await generateAccessAndRefreshToken(user._id);


        // Fetch user information
        let userDetails = await User.findById(user._id).select(
            "-password -refreshToken"
        );

        // Add accessToken to userDetails
        userDetails = { ...userDetails.toObject(), accessToken };

        // sending accessToken and refreshToken as cookies
        const option = {
            httpOnly: true,
            secure: true,
        };

        // Send back the user's information
        return res
            .status(200)
            .cookie("accessToken", accessToken)
            .cookie("refreshToken", refreshToken)
            .json({
                message: "User logged in successfully",
                user: userDetails,
                status: 200,
                success: true,
            });
    } catch (error) {
        console.error("error while logging in a user", error);
        return res.status(500).json({
            message: "Error while logging in a user",
            error: error.message,
            status: 500,
            success: false,
        });
    }
};

// Generate a new access token and using the refresh token
const refreshAccessToken = async (req, res) => {
    try {
        const incomingRefreshToken =
            req.cookies?.refreshToken || req.body?.refreshToken;

        if (!incomingRefreshToken) {
            return res.status(403).json({
                message: "Unauthorized request: Refresh token is required",
                status: 403,
                success: false,
            });
        }

        const decoded = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );


        const user = await User.findById(decoded?._id);

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized request: Invalid refresh token",
                status: 401,
                success: false,
            });
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            return res.status(403).json({
                message: "Unauthorized request: Refresh token in invalid or expired",
                status: 403,
                success: false,
            });
        }

        const options = {
            httpOnly: true,
            secure: true,
        };

        const { accessToken, newRefreshToken } =
            await generateAccessAndRefreshToken(user._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json({
                status: 200,
                data: {
                    accessToken: accessToken,
                },
                message: "Access token was updated successfully",
                success: true,
            });
    } catch (error) {
        console.error("Error refreshing access token:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
            status: 500,
            success: false,
        });
    }
};

// logout a user
const logout = async (req, res) => {
    try {
        const userId = req.user._id;
        await User.findByIdAndUpdate(
            userId,
            {
                // unset is used to remove this field from mongo, it is better than set refrehToken to null or undef
                $unset: {
                    refreshToken: 1,
                },
            },
            {
                new: true,
            }
        );

        const options = {
            httpOnly: true,
            secure: true,
        };
        return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json({
                status: 200,
                message: "User logged out successfully",
                success: true,
            });
    } catch (error) {
        return res.status(403).json({
            message: "Error while logging out a user",
            error: error.message,
            status: 403,
            success: false,
        });
    }
};

export { signUp, login, refreshAccessToken, logout };
