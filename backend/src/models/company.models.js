import mongoose from 'mongoose'

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
    },
    country: {
        type: String,
        required: true,
    },
    pinCode: {
        type: String,
    },
    phoneNo: {
        type: String,
    },
    faxNo: {
        type: String,
    },
    CompanyURL: {
        type: String,
    },
    CompanyEmail: {
        type: String,
    },
    DocCodificationNo: {
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
        enum: ['Yes', 'No'],
    },
    LogoFilePath: {
        type: String,
        required: true,
    },
    CSTNo: {
        type: String,
    },
    TIN: {
        type: String,
    },
    ServiceTaxNo: {
        type: String,
    },
    PAN: {
        type: String,
    },
    Note: {
        type: String,
    }, 
    IsoCertificationRem: {
        type: String,
    },
}, {
    timestamps: true,
})

export const Company = mongoose.model("Company", companySchema)