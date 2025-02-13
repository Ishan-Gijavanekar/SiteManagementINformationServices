import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
    ProjectName: {
        type: String,
        required: true,
    },
    CompanyID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    },
    ProjectAdd: {
        type: String,
        required: true,
    },
    ProjectCity: {
        type: String,
        required: true,
    },
    ProjectState: {
        type: String,
        required: true,
    },
    ProjectCountry: {
        type: String,
        required: true,
    },
    ProjectPin: {
        type: String,
        required: true,
    },
    ProjectPhone: {
        type: String,
        required: true,
    },
    ProjectFax: {
        type: String,
        required: true,
    },
    ProjectEmail: {
        type: String,
        required: true,
    },
    ProjectIncharge: {
        type: String,
        required: true,
    },
    ProjectCost: {
        type: String,
        required: true,
    },
    FlagFreez: {
        type: String,
        required: true,
    },
    ProjectCode: {
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
    FlagAboveBelowDSR: {
        type: String,
        required: true,
    },
    PertAboveBelowDSR: {
        type: String,
        required: true,
    },
    ProjectType: {
        type: String,
        required: true,
    },
    PrjExecutionTypeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PrjExecutionType",
        required: true,
    },
    FlagApplyBudget: {
        type: String,
        required: true,
    },
    FlagDisplayForTransactions: {
        type: String,
        required: true,
    },
    FlagDisplayForReports: {
        type: String,
        required: true,
    },
    BoqTempUploadFile: {
        type: String,
        required: true,
    },
    BudMatLabTempUploadFile: {
        type: String,
        required: true,
    },
    ExpectedProfitPertForBudget: {
        type: String,
        required: true,
    },
    GateMISProjectID: {
        type: String,
        required: true,
    },
    PlanTempUploadFile: {
        type: String,
        required: true,
    },
    LimitMobilizationPeriod: {
        type: String,
        required: true,
    },
    CmpDivID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CmpDivisionMaster",
        required: true,
    },
}, {
    timestamps: true,
})

export const Project = mongoose.model("Project", projectSchema)