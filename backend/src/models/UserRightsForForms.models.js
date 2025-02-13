import mongoose from 'mongoose'

const UserRightsForFormsschema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    formName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FormDetails",
        required: true,
    },
    FlagNew: {
        type: String,
        required: true,
        default: "N",
        enuam: ['Y', 'N'],
    },
    FlagDelete: {
        type: String,
        required: true,
        default: "N",
        enuam: ['Y', 'N'],
    },
    FlagView: {
        type: String,
        required: true,
        default: "N",
        enuam: ['Y', 'N'],
    },
    FlagAuthorise: {
        type: String,
        required: true,
        default: "N",
        enuam: ['Y', 'N'],
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
        enum: ['Yes', 'No'],
        default: "No",
    },
    FlagModify: {
        type: String,
        required: true,
        default: "N",
        enuam: ['Y', 'N'],
    },
}, {
    timestamps: true,
})

export const UserRightsForForms = mongoose.model("UserRightsForForms", UserRightsForFormsschema)