import mongoose from 'mongoose'

const CompanyStateTaxRegSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    },
    stateDesc: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StateMaster",
        required: true,
    },
    GstTin: {
        type: String,
    },
    GstRegAdd: {
        type: String,
    },
    GstRegCity: {
        type: String,
    },
    GstRegCountry: {
        type: String,
    },
    GstRegPh: {
        type: String,
    },
    GstRegContPerson: {
        type: String,
    },
    GstRegMobile: {
        type: String,
    },
    GstRegContEmail: {
        type: String,
    },
    GstPin: {
        type: String,
        minLength: 6,
    },
}, {
    timestamps: true,
})

export const CompanyStateTaxReg = mongoose.model("CompanyStateTaxReg", CompanyStateTaxRegSchema)