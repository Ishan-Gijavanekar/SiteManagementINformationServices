import { UserRightsForForms } from "../models/UserRightsForForms.models.js"


const addUserRights = async (req, res) => {
    try {
        const user = req.user?._id
        console.log(user)
        const {userId, formName, FlagNew, FlagDelete, FlagView, FlagAuthorise, FlagModify} = req.body

        if(!userId || !formName || !FlagNew || !FlagDelete || !FlagView || !FlagAuthorise || !FlagModify) {
            return res.status(401)
            .json({message: "All fields are required"})
        }

        const recdExists = await UserRightsForForms.findOne({
            $and: [{userId}, {formName}]
        })

        if(recdExists) {
            return res.status(401)
            .json({message: "Recd Already exists"})
        }

        const newRecd = new UserRightsForForms({
            userId,
            formName,
            FlagAuthorise,
            FlagDelete,
            FlagNew,
            FlagView,
            FlagModify,
            CreatedBy: user,
            ModifiedBy: user,
        })

        if(newRecd) {
            await newRecd.save()

            return res.status(200)
            .json({
                newRecd,
                message: "Record added successfully"
            })
        } else {
            return res.status(401)
            .json({message: "Something went wronge"})
        }
    } catch (error) {
        console.log("Error in addUserRights controller: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}


const getUserRights = async(req, res) => {
    try {
        const {id} = req.body
        const getRights = await UserRightsForForms.find({userId: id})
        .populate('formName')
        if(!getRights) {
            return res.status(401)
            .json({message: "Something went wronge"})
        }
        return res.status(200)
        .json({
            getRights,
            message: "User rights fetched successfully"
        })
    } catch (error) {
        console.log("Error in getUserRights controller: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}


const getUserRightId = async(req, res) => {
    try {
        const {id} = req.params
        if (!id) {
            return res.status(401)
            .json({message: "id should be mentioned"})
        }
        const recd = await UserRightsForForms.findById(id)
        if (!recd) {
            return res.status(401)
            .json({message: "Recd Not found in database"})
        }
        return res.status(200)
        .json({
            recd,
            message: "Record received successfully"
        })
    } catch (error) {
        console.log("Error in getUserIdRight controller: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

const updateUserRights = async (req, res) => {
    try {
        const user = req.user?._id
        const {id} = req.params
        const {userId, formName, FlagNew, FlagDelete, FlagView, FlagAuthorise, FlagModify} = req.body

        if(!userId || !formName || !FlagNew || !FlagDelete || !FlagView || !FlagAuthorise || !FlagModify) {
            return res.status(401)
            .json({message: "All fields are required"})
        }
        if (!id) {
            return res.status(401)
            .json({message: "id should be mentioned"})
        }

        const updatedRights = await UserRightsForForms.findByIdAndUpdate(
            id,
            {
                userId,
                formName,
                FlagAuthorise,
                FlagDelete,
                FlagNew,
                FlagView,
                FlagModify,
                CreatedBy: user,
                ModifiedBy: user,
            }, {
                new: true
            }
        )

        if (updatedRights) {
            return res.status(200)
            .json({
                updatedRights,
                message: "User rights updates"
            })
        } else {
            if(!id) {
                return res.status(401)
                .json({message: "Something went wronge"})
            }
        }
    } catch (error) {
        console.log("Error in updateRights controller: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}


const deleteUserRights = async (req, res) => {
    try {
        const {id} = req.params
        if (!id) {
            return res.status(401)
            .json({message: "id should be mentioned"})
        }
        await UserRightsForForms.findByIdAndDelete(id)
        return res.status(200)
        .json({
            message: "Rights removed successfully"
        })
    } catch (error) {
        console.log("Error in deleteRights controller: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export {addUserRights, getUserRights, getUserRightId, updateUserRights, deleteUserRights}