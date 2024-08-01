import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username: { type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true} 
})

export const UserModel = mongoose.model("User", UserSchema)