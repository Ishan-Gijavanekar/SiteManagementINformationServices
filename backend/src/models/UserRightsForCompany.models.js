import mongoose from 'mongoose'

const UserRightsForCompanyschema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    },
    Seq: {
        type: Number,
        required: true
    },
}, {
    timestamps: true,
})

export const UserRightsForCompany = mongoose.model("UserRightsForCompany", UserRightsForCompanyschema)