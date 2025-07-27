import mongoose from "mongoose";

// console.log("User model is being defined",mongoose);

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ["user","admin"],
        default: "user",
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    }
}
//  can also add timestamps: true to automatically add createdAt and updatedAt fields
, {timestamps: true}
)

const User = mongoose.model("User", userSchema);
export default User;