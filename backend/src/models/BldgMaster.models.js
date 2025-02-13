import mongoose from 'mongoose'

const BldgMasterschema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    blockId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BlockMaster",
        required: true,
    },
    BldgDesc: {
        type: String,
        required: true
    },
    NoOfFloor: {
        type: Number,
        required: true,
    },
    TotFloorArea: {
        type: Number,
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

export const BldgMaster = mongoose.model("BldgMaster", BldgMasterschema)