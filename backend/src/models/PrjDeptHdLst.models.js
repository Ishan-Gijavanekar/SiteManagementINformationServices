import mongoose from 'mongoose'

const PrjDeptHdLstschema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    EmpIdDir: {
        type: String,
        required: true,
    },
    EmpID_Pm: {
        type: String,
        required: true,
    },
    EmpID_Tech: {
        type: String,
        required: true,
    },
    EmpID_Qs: {
        type: String,
        required: true,
    },
    EmpID_Purchase: {
        type: String,
        required: true,
    },
    EmpID_Stores: {
        type: String,
        required: true,
    },
    EmpID_Vmm: {
        type: String,
        required: true,
    },
    EmpID_Planning: {
        type: String,
        required: true,
    },
    EmpID_Accts: {
        type: String,
        required: true,
    },
    EmpID_TechHo: {
        type: String,
        required: true,
    },
    EmpID_QsHo: {
        type: String,
        required: true,
    },
    EmpID_PurchaseHo: {
        type: String,
        required: true,
    },
    EmpID_StoresHo: {
        type: String,
        required: true,
    },
    EmpID_VmmHo: {
        type: String,
        required: true,
    },
    EmpID_PlanningHo: {
        type: String,
        required: true,
    },
    EmpID_AcctsHo: {
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

export const PrjDeptHdLst = mongoose.model("PrjDeptHdLst", PrjDeptHdLstschema)