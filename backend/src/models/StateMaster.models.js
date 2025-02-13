import mongoose from "mongoose";

const StateMasterschema = new mongoose.Schema({
    StateDesc: {
        type: String,
        required: true,
    },
    StateGstCode: {
        type: String,
        required: true,
    },
    FlagStateUt: {
        type: String,
        required: true,
        enum: ['State', 'UT']
    },
    FstToDgtsInGstn: {
        type: String,
    },
}, {
    timestamps: true,
})

export const StateMaster = mongoose.model("StateMaster", StateMasterschema)