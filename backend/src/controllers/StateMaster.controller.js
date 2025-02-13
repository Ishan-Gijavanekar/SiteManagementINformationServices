import { StateMaster } from "../models/StateMaster.models.js"


const addState = async(req, res) => {
    try {
        const {StateDesc, StateGstCode, FlagStateUt, FstToDgtsInGstn} = req.body

        if (!StateDesc || !StateGstCode || !FlagStateUt || !FstToDgtsInGstn) {
            return res.status(401)
            .json({message: "All fields are required"})
        }

        const stateExists = await StateMaster.findOne({StateDesc})
        if (stateExists) {
            return res.status(401)
            .json({message: "State already exists"})
        }

        const newState = new StateMaster({
            StateDesc,
            StateGstCode,
            FlagStateUt,
            FstToDgtsInGstn,
        })

        if (newState) {
            await newState.save()

            return res.status(200)
            .json({
                newState,
                message: "State Added Successfully"
            })
        } else {
            return res.status(401)
            .json({message: "Something went wronge"})
        }
    } catch (error) {
        console.log("Error in addState controller: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}


const getStates = async (req, res) => {
    try {
        const states = await StateMaster.find()
        if (!states) {
            return res.status(401)
            .json({message: "Something went wronge"})
        }
        return res.status(200)
        .json({
            states,
            message: "States fetched successfully"
        })
    } catch (error) {
        console.log("Error in getStates controller: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

const getStateById = async(req, res) => {
    try {
        const {id} = req.params
        if (!id) {
            return res.status(401)
            .json({message: "Id should be present"})
        }
        const state = await StateMaster.findById(id)
        if (!state) {
            return res.status(401)
            .json({message: "Something went wronge"})
        }
        return res.status(200)
        .json({
            state,
            message: "State fetched successfully"
        })
    } catch (error) {
        console.log("Error in getStateById controller: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}


const updateState = async(req, res) => {
    try {
        const {id} = req.params
        const {StateDesc, StateGstCode, FlagStateUt, FstToDgtsInGstn} = req.body

        if (!StateDesc || !StateGstCode || !FlagStateUt || !FstToDgtsInGstn) {
            return res.status(401)
            .json({message: "All fields are required"})
        }
        if (!id) {
            return res.status(401)
            .json({message: "Id should be present"})
        }

        const updatedState = await StateMaster.findByIdAndUpdate(
            id,
            {
                StateDesc,
                StateGstCode,
                FlagStateUt,
                FstToDgtsInGstn,
            },{
                new: true
            }
        )

        if (updatedState) {
            return res.status(200)
            .json({
                updatedState,
                message: "State updated successfully"
            })
        } else {
            return res.status(401)
            .json({message: "Something went wronge"})
        }
    } catch (error) {
        console.log("Error in updateState controller: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}


const deleteState = async(req, res) => {
    try {
        const {id} = req.params
        if (!id) {
            return res.status(401)
            .json({message: "id must be present in paramas"})
        }
        await StateMaster.findByIdAndDelete(id)
        return res.status(200)
        .json({message: "State deleted successfully"})
    } catch (error) {
        console.log("Error in deleteState controller: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export {addState, getStates, getStateById, updateState, deleteState}