import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxLength: 25,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength : 6,
    },
    profile: {
        type: String,
    }
}, {
    timestamps: true,
})

export const User = mongoose.model("User", userSchema)