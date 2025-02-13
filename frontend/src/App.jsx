import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./Pages/LoginPage"
import HomePage from "./Pages/HomePage"

import { Toaster } from 'react-hot-toast'
import HomePageAcc from "./Pages/Accounts/HomePage"
import HomePageStores from "./Pages/Stores/HomePageStores"
import HomePageProcurment from "./Pages/Procurment/HomePageProcurment"
import HomePageVMM from "./Pages/VMM/HomePageVMM"
import HomePageTechnical from "./Pages/Technical/HomePageTechnical"
import HomePageHr from "./Pages/HR/HomePafeHr"
import HomePageAdmin from "./Pages/Asminstration/HomePageadmin"
import AddFormDetails from "./Pages/Asminstration/AddFormDetails"
import AddStateForm from "./Pages/Asminstration/AddStateForm"
import UserRegistration from "./Pages/Asminstration/RegisterUser"
import ProjectRights from "./Pages/Asminstration/ProjectRights"
import FormRights from "./Pages/Asminstration/FormRights"
import CompanyRights from "./Pages/Asminstration/CompanyRights"


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/accounts" element={<HomePageAcc />} />
          <Route path="/stores" element={<HomePageStores />} />
          <Route path="/procurment" element={<HomePageProcurment />} />
          <Route path="/vmm" element={<HomePageVMM />} />
          <Route path="/technical" element={<HomePageTechnical />} />
          <Route path="/hr" element={<HomePageHr />} />
          <Route path="/administration" element={<HomePageAdmin />} /> 
          <Route path="/administration/addFormDetails" element={<AddFormDetails />} />
          <Route path="/administration/addStateForm" element={<AddStateForm />} />
          <Route path="/administration/registerUser" element={<UserRegistration />} />
          <Route path="/administration/projectRights" element={<ProjectRights />} />
          <Route path="/administration/formRights" element={<FormRights />} />
          <Route path="/administration/companyRights" element={<CompanyRights />} />
        </Routes>

        <Toaster />

      </BrowserRouter>
    </>
  )
}

export default App
