// import { User } from "../models/userModel.js"
// import { ApiError } from "../utils/apiError.js"
// import { ApiResponse } from "../utils/apiResponse.js";

// const register = async (req, res) => {
//    try {
//     const { username, fullName, email, password } = req.body

//     // if(!fullName){
//     //     res.status(404).json({
//     //         message: "full name nai"
//     //     })
//     // }else{
//     //     res.send("response ache")
//     // }
//     if ([fullName, email, password].some((field) => field?.trim() === "")) {
//         return res.json(new ApiError(400, "all files required"));
//     }
//     const existingUser = await User.findOne({
//         $or: [{ username }, { email }]
//     })
//     if (existingUser) {
//         // ApiError(400,"already existing, null")
//         return res.json(new ApiError(403, "already exits"))
//     }
//     const user = await User.create({ username, fullName, email, password });
//     const createdUser = await User.findById(user._id).select("-password -refReshToken");
//     if (!createdUser) {
//         return res.json(new ApiResponse(500).createUser)
//     }
//     res.json(new ApiResponse(201, "user Create"))
//    } catch (error) {
//     console.log(error.message)
//     return res.json(new ApiResponse(500), error.message)
//    }
// }

// const login =async (req,res)=>{
//     try {
//         const {email,password} = req.body;
//         if ([email, password].some((field) => field?.trim() === "")) {
//             return res.json(new ApiError(401, "all fills required"));
//         }
//         const userFound = await User.findOne({email});
//         if(!userFound){
//             return res.json(new ApiError(402,"user not found"))
//         }
//         const isPassword = await userFound.isPasswordCorrect(password)
//         if(!isPassword){
//             return res.json(new ApiError(403,"authtication failed"))
//         }else{
//             console.log('not create')
//         }
//     } catch (error) {
//         console.log(error.message)
//     }
// }

// export  {register, login}





import { User } from "../models/userModel.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const register = async (req, res) => {
   try {
       const { username, fullName, email, password } = req.body;

       // Check if all required fields are provided
       if ([fullName, email, password].some((field) => field?.trim() === "")) {
           return res.status(400).json(new ApiError(400, "All fields are required"));
       }

       // Check if the username or email is already in use
       const existingUser = await User.findOne({
           $or: [{ username }, { email }]
       });
       if (existingUser) {
           return res.status(403).json(new ApiError(403, "Username or email already exists"));
       }

       // Create the new user
       const user = await User.create({ username, fullName, email, password });

       // Find the created user, excluding password and refreshToken
       const createdUser = await User.findById(user._id).select("-password -refreshToken");
       if (!createdUser) {
           return res.status(500).json(new ApiResponse(500, "User creation failed"));
       }

       return res.status(201).json(new ApiResponse(201, "User created successfully", createdUser));
   } catch (error) {
       console.error(error.message);
       return res.status(500).json(new ApiResponse(500, "Internal server error", error.message));
   }
};

const login = async (req, res) => {
   try {
       const { email, password } = req.body;

       // Check if all required fields are provided
       if ([email, password].some((field) => field?.trim() === "")) {
           return res.status(400).json(new ApiError(400, "All fields are required"));
       }

       // Find the user by email
       const userFound = await User.findOne({ email });
       if (!userFound) {
           return res.status(404).json(new ApiError(404, "User not found"));
       }

       // Check if the provided password is correct
       const isPassword = await userFound.isPasswordCorrect(password);
       if (!isPassword) {
           return res.status(403).json(new ApiError(403, "Authentication failed"));
       }

       return res.status(200).json(new ApiResponse(200, "Login successful"));
   } catch (error) {
       console.error(error.message);
       return res.status(500).json(new ApiResponse(500, "Internal server error", error.message));
   }
};

export { register, login };

