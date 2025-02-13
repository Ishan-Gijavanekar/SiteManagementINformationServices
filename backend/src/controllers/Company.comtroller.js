import { Company } from "../models/company.models"
import { UserRightsForForms } from "../models/UserRightsForForms.models"


const addCompany = async(req, res) => {
    try {
        const user = req.user?._id
        const {companyName, address, city, state, country, pincode, phoneNo, faxNo, CompanyURL, CompanyEmail, DocCodificationNo, LogoFilePath, Note, PAN, IsoCertificationRem} = req.body

        if (!companyName || !address || !city || !state || !country || !pincode || !LogoFilePath || !Note || !PAN) {
            return res.status(401)
            .json({message: "Fields marked with res are compulsory"})
        }

        const companyExists = await Company.findOne({companyName})
        const name = companyExists.companyName.toLowerCase()
        if (name === companyName) {
            return res.status(401)
            .json({message: "Company with this name already exists"})
        }

        const hasRights = await UserRightsForForms.findOne({userId: user?._id})

        if (hasRights.FlagNew === 'N') {
            return res.status(401)
            .json({
                message: "You do not have rights to add. Contact the admin!!!!"
            })
        }

    } catch (error) {
        
    }
}