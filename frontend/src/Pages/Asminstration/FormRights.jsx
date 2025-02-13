import React, { useCallback, useEffect, useState } from "react";
import { Menu, Trash, X, Edit, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../Stores/authStore";
import { useFormDetailsStore } from "../../Stores/Administration/formDetailsStore";
import { useformRightstore } from "../../Stores/Administration/FormRightStore";

const FormRight = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const { getUsers, users, isLoading } = useAuthStore();
  const { forms, fetchForms } = useFormDetailsStore();
  const { formRightss, fetchformRights, addFormRight, updateFormRight, deleteFormRight } = useformRightstore();
  const navigate = useNavigate();

  // Form management state
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedForm, setSelectedForm] = useState("");
  const [rights, setRights] = useState({
    new: false,
    edit: false,
    delete: false,
    view: false,
    authorize: false,
  });

  let formRightDetails;

  // Fetch initial data
  useEffect(() => {
    getUsers();
    fetchForms();
    //fetchformRights({id: selectedUser});
  }, [getUsers, fetchForms, fetchformRights]);


  useEffect(() => {
    const formrights = async() => {
      console.log(selectedUser)
      await fetchformRights({id:selectedUser})
    }
    formrights()
  }, [selectedUser])

  const departments = ["IT", "HR", "Finance", "Operations", "Marketing", "Accounts", "Administartion"];

  const handleRightChange = (right) => {
    setRights((prev) => ({
      ...prev,
      [right]: !prev[right],
    }));
  };

  const handleAdd = async () => {
    if (!selectedForm || !selectedDepartment) return;
    const formRightData = {
      userId: selectedUser,
      formName: selectedForm,
      FlagNew: rights.new ? "Y" : "N",
      FlagModify: rights.edit ? "Y" : "N",
      FlagDelete: rights.delete ? "Y" : "N",
      FlagView: rights.view ? "Y" : "N",
      FlagAuthorise: rights.authorize ? "Y" : "N",
    };
    await addFormRight(formRightData);
  };

  const handleEdit = async () => {
    if (!selectedForm) return;
    const formRightData = {
      formName: selectedForm,
      userId: selectedUser,
      new: rights.new ? "Y" : "N",
      edit: rights.edit ? "Y" : "N",
      delete: rights.delete ? "Y" : "N",
      view: rights.view ? "Y" : "N",
      authorize: rights.authorize ? "Y" : "N",
    };
    await updateFormRight(selectedForm, formRightData);
  };

  const handleDelete = async () => {
    if (!selectedForm) return;
    await deleteFormRight(selectedForm);
    setSelectedForm("");
    setRights({
      new: false,
      edit: false,
      delete: false,
      view: false,
      authorize: false,
    });
  };

  // const handleSelectedUser = async() => {
  //   let data = {id: selectedUser}
  //   console.log(data)
  //   const res = await fetchformRights(data)
  //   formRightDetails = res
  // }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-gray-300">
        <div className="flex items-center">
          <img src="/BusinessCardLogo.jpg" alt="Logo" className="h-8 mr-4" />
          <span className="font-bold text-lg">Admin</span>
        </div>
        <div className="text-center font-bold text-blue-700 flex-grow">SiteMIS version 11.0</div>
        <div className="hidden md:flex space-x-4">
          <button onClick={() => navigate("/home")} className="p-2 bg-blue-600 text-white rounded">
            Home
          </button>
          <button onClick={() => navigate("/login")} className="p-2 bg-red-600 text-white rounded">
            Logout
          </button>
        </div>
        <button className="md:hidden focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-300 p-4 space-y-4">
          <button onClick={() => navigate("/home")} className="block w-full p-2 bg-blue-600 text-white rounded">
            Home
          </button>
          <button onClick={() => navigate("/login")} className="block w-full p-2 bg-red-600 text-white rounded">
            Logout
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full flex flex-col space-y-4">
          {/* User Dropdown */}
          <div className="mb-4">
            <label htmlFor="userSelect" className="block mb-1 font-bold">
              Select User
            </label>
            <select
              id="userSelect"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>

          {selectedUser && (
            <div className="flex flex-1 flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            {/* Form Rights Table */}
            <div className="w-full md:w-2/3 p-4 bg-gray-100 rounded shadow">
              <div className="mb-4">
                <label htmlFor="search" className="block mb-1 font-bold">
                  Search Forms
                </label>
                <input
                  id="search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Search by form name..."
                />
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded">
                  <thead className="bg-gray-300">
                    <tr>
                      <th className="p-2 border-r">Form Name</th>
                      <th className="p-2 border-r">New</th>
                      <th className="p-2 border-r">Edit</th>
                      <th className="p-2 border-r">View</th>
                      <th className="p-2 border-r">Delete</th>
                      <th className="p-2 border-r">Authorize</th>
                      <th className="p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formRightss
                      .filter((right) => right.formName.FormName.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((right) => (
                        <tr key={right._id}>
                          <td className="p-2 border-r">{right.formName.FormName}</td>
                          <td className="p-2 border-r text-center">{right.FlagNew}</td>
                          <td className="p-2 border-r text-center">{right.FlagModify}</td>
                          <td className="p-2 border-r text-center">{right.FlagView}</td>
                          <td className="p-2 border-r text-center">{right.FlagDelete}</td>
                          <td className="p-2 border-r text-center">{right.FlagAuthorise}</td>
                          <td className="p-2 text-center">
                            <button
                              className="p-1 bg-yellow-500 text-white rounded mr-2"
                              onClick={() => {
                                setSelectedForm(right.formName);
                                setRights({
                                  new: right.new === "Y",
                                  edit: right.edit === "Y",
                                  delete: right.delete === "Y",
                                  view: right.view === "Y",
                                  authorize: right.authorize === "Y",
                                });
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Form Rights Management */}
            <div className="w-full md:w-1/3 p-4 bg-gray-100 rounded shadow flex flex-col space-y-4">
              <div>
                <label htmlFor="departmentSelect" className="block mb-1 font-bold">
                  Department
                </label>
                <select
                  id="departmentSelect"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="formSelect" className="block mb-1 font-bold">
                  Form Details
                </label>
                <select
                  id="formSelect"
                  value={selectedForm}
                  onChange={(e) => setSelectedForm(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select form</option>
                  {forms.map((form) => (
                    <option key={form._id} value={form._id}>
                      {form.FormName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                {Object.entries(rights).map(([right, value]) => (
                  <div key={right} className="flex items-center">
                    <input
                      type="checkbox"
                      id={right}
                      checked={value}
                      onChange={() => handleRightChange(right)}
                      className="mr-2"
                    />
                    <label htmlFor={right} className="capitalize">
                      {right}
                    </label>
                  </div>
                ))}
              </div>

              <div className="flex justify-center space-x-2 pt-4">
                <button
                  onClick={handleEdit}
                  className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600"
                  disabled={!selectedForm}
                >
                  <Edit className="h-6 w-6" />
                </button>
                <button
                  onClick={handleAdd}
                  className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
                  disabled={!selectedForm || !selectedDepartment}
                >
                  <Plus className="h-6 w-6" />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                  disabled={!selectedForm}
                >
                  <Trash className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormRight;
