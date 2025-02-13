import { FormDetails } from "../models/FormDetails.models.js"


const addForm = async(req, res) => {
    try {
        const {FormName, FormDesc, DeptInUse, FlagApplicable} = req.body

        if (!FormName || !FormDesc || !DeptInUse || !FlagApplicable) {
            return res.status(401)
            .json({message: "All fields are required"})
        }

        const formExists = await FormDetails.findOne({FormName})
        if (formExists) {
            return res.status(401)
            .json({message: "Form Already exists"})
        }

        const newForm = new FormDetails({
            FormName,
            FormDesc,
            DeptInUse,
            FlagApplicable,
        })

        if (newForm) {
            await newForm.save()
            return res.status(200)
            .json({
                newForm,
                message: "Form added successfully"
            })
        } else {
            return res.status(401)
            .json({message: "Something went wronge"})
        }
    } catch (error) {
        console.log("Error in addForm: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

const getForms = async(req, res) => {
    try {
        const forms = await FormDetails.find()

        if (forms) {
            return res.status(200)
            .json({
                forms,
                message: "Forms fetched successfully"
            })
        } else {
            return res.status(401)
            .json({message: "Something went wronge"})
        }
    } catch (error) {
        console.log("Error in getForms: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

const updateForm = async(req, res) => {
    try {
        const {id} = req.params
        const {FormName, FormDesc, DeptInUse, FlagApplicable} = req.body
        
        if (!FormName || !FormDesc || !DeptInUse || !FlagApplicable) {
            return res.status(401)
            .json({message: "All fields are required"})
        }

        if (!id) {
            return res.status(401)
            .json({message: "Id required in params"})
        }

        const updatedForm = await FormDetails.findByIdAndUpdate(
            id,
            {
                FormName,
                FormDesc,
                DeptInUse,
                FlagApplicable,
            },
            {
                new: true
            }
        )

        if (updatedForm) {
            return res.status(200)
            .json({
                updatedForm,
                message: "Record Updated successfully"
            })
        } else {
            return res.status(401)
            .json({message: "Something went wronge"})
        }
    } catch (error) {
        console.log("Error in updateForm controller: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

const getFormById = async(req, res) => {
    try {
        const {id} = req.params
        if (!id) {
            return res.status(401)
            .json({message: "Id required in params"})
        }
        const formDetails = await FormDetails.findById(id)
        if (formDetails) {
            return res.status(200)
            .json({
                formDetails,
                message: "Form details fetched successfully"
            })
        }
    } catch (error) {
        console.log("Error in formDeyails controller: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

const deleteForm = async (req, res) => {
    try {
        const {id} = req.body
        if (!id) {
            return res.status(401)
            .json({message: "Id required in params"})
        }
        await FormDetails.findByIdAndDelete(id)
        res.status(200).json({message: "Form deleted successfully"})
    } catch (error) {
        console.log("Error in deleteForm controller: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export {addForm, getForms, updateForm, getFormById, deleteForm}