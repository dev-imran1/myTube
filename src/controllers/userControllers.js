import { User } from "../models/userModel.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js";

const register = async (req, res) => {
   try {
    const { username, fullName, email, password } = req.body

    // if(!fullName){
    //     res.status(404).json({
    //         message: "full name nai"
    //     })
    // }else{
    //     res.send("response ache")
    // }
    if ([fullName, email, password].some((field) => field?.trim() === "")) {
        return res.json(new ApiError(400, "all files required"));
    }
    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (existingUser) {
        // ApiError(400,"already existing, null")
        return res.json(new ApiError(403, "already exits"))
    }
    const user = await User.create({ username, fullName, email, password });
    const createdUser = await User.findById(user._id).select("-password -refReshToken");
    if (!createdUser) {
        return res.json(new ApiResponse(500).createUser)
    }
    res.json(new ApiResponse(201, "user Create"))
   } catch (error) {
    console.log(error.message)
    return res.json(new ApiResponse(500), error.message)
   }
}

export default register
