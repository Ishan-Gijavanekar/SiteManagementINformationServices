import mongoose from 'mongoose'

const CmpZoneMasterschema = new mongoose.Schema({
    CmpZoneDesc: {
        type: String,
        required: true,
    },
    cmpZoneCountry: {
        type: String,
        required: true,
    },
    CreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    CreatedOn: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    ModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    ModifiedOn: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    FlagDeleted: {
        type: String,
        required: true,
        enum: ['Yes', 'No']
    },
}, {
    timestamps: true,
})

export const CmpZoneMaster = mongoose.model("CmpZoneMaster", CmpZoneMasterschema)