import mongoose from 'mongoose'

const PrjExecutionTypeschema = new mongoose.Schema({
    PrjExecutionType: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
})

export const PrjExecutionType = mongoose.model("PrjExecutionType", PrjExecutionTypeschema)