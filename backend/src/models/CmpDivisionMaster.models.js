import mongoose from 'mongoose'

const CmpDivisionMasterschema = new mongoose.Schema({
    CmpDivDesc: {
        type: String,
        required: true
    },
    CmpZoneID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CmpZoneMaster",
        required: true,
    },
    CostCentreRef: {
        type: String,
        required: true
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

export const CmpDivisionMaster = mongoose.model("CmpDivisionMaster", CmpDivisionMasterschema)