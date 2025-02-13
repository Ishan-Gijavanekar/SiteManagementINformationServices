import mongoose from 'mongoose'

const UserRightsForProjectschema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    Seq: {
        type: Number,
        required: true
    },
}, {
    timestamps: true,
})

export const UserRightsForProject = mongoose.model("UserRightsForProject", UserRightsForProjectschema)