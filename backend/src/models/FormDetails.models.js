import mongoose from 'mongoose'

const FormDetailsschema = new mongoose.Schema({
    FormName: {
        type: String,
        required: true,
    },
    FormDesc: {
        type: String,
        required: true,
    },
    DeptInUse: {
        type: String,
        required: true,
    },
    FlagApplicable: {
        type: String,
        required: true,
        enum: ['Yes', 'No'],
        default: "Yes",
    },
}, {
    timestamps: true,
})

export const FormDetails = mongoose.model("FormDetails", FormDetailsschema)