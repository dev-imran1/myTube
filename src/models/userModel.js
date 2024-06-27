import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { jwt } from "jsonwebtoken";
const userSchema = new Schema({
    username: {
        require: true,
        type: String,
        unique: true
    },
    fullName: {
        require: true,
        type: String
    },
    password: {
        require: true,
        type: String
    },
    avatar: {
        type: String
    },
    coverPhoto: {
        type: String
    },
    videos: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    history: [
        {
            type: Schema.Types.ObjectId,
            ref: "History"
        }
    ],
    playlist: [
        {
            type: Schema.Types.ObjectId,
            ref: "Playlist"
        }
    ],
    refreshToken: {
        type: String
    }
}, {
    timestamps: true
});


userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }else{
        return next()
    }
});

userSchema.method.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password, this.password)
}
userSchema.method.generateAccessToken = async function(password){
   const accesToken =  await jwt.sing({_id:this._id,email: this.email}, process.env.ACCESS_TOKEN_SECRECT, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
   });
   return accesToken
}
userSchema.method.generateRefreshToken = async function(password){
   const refReshToken =  await jwt.sing({_id:this._id,email: this.email}, process.env.REFRESH_TOKEN_SECRECT, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
   });
   return refReshToken
}


export const User = mongoose.models.User ?? mongoose.model("User", userSchema)


