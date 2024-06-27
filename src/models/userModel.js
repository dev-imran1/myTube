import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
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
   return bcrypt.compare(password, this.password)
}
