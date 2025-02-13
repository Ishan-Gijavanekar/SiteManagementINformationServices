import React, { useEffect, useState } from 'react';
import { Menu, X, Edit, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFormDetailsStore } from '../../Stores/Administration/formDetailsStore.js';

const AddFormDetails = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formName, setFormName] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [deptInUse, setDeptInUse] = useState('');
  const [flagApplicable, setFlagApplicable] = useState('Yes');
  const [searchQuery, setSearchQuery] = useState('');
  const [editFormId, setEditFormId] = useState(null);

  const { addForm, fetchForms, forms, updateForm, deleteForm } = useFormDetailsStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchForms();
  }, [fetchForms]);

  const handleLogout = async () => {
    // Add logout logic
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      FormName: formName,
      FormDesc: formDesc,
      DeptInUse: deptInUse,
      FlagApplicable: flagApplicable
    };
    if (editFormId) {
      await updateForm(editFormId, formData);
      setEditFormId(null);
    } else {
      await addForm(formData);
    }
    setFormName('');
    setFormDesc('');
    setDeptInUse('');
    setFlagApplicable('Yes');
  };

  const handleEdit = (form) => {
    setEditFormId(form._id);
    setFormName(form.FormName);
    setFormDesc(form.FormDesc);
    setDeptInUse(form.DeptInUse);
    setFlagApplicable(form.FlagApplicable);
  };

  const handleDelete = async (id) => {
    await deleteForm(id);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-gray-200">
        <div className="flex items-center">
          <img src="/BusinessCardLogo.jpg" alt="Logo" className="h-8 mr-4" />
          <span className="font-bold text-lg">Administration</span>
        </div>
        <div className="text-center font-bold text-blue-700 flex-grow">
          SiteMIS version 11.0
        </div>
        <div className="hidden md:flex space-x-4">
          <button onClick={() => navigate('/home')} className="p-2 bg-blue-600 text-white rounded">Home</button>
          <button onClick={handleLogout} className="p-2 bg-red-600 text-white rounded">Logout</button>
        </div>
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-200 p-4 space-y-4">
          <button onClick={() => navigate('/home')} className="block w-full p-2 bg-blue-600 text-white rounded">Home</button>
          <button onClick={handleLogout} className="block w-full p-2 bg-red-600 text-white rounded">Logout</button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-4">
        {/* Form Column */}
        <div className="w-full md:w-1/2 p-4 bg-gray-100 rounded">
          <h2 className="font-bold mb-4">{editFormId ? "Edit Form Details" : "Add Form Details"}</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1" htmlFor="formName">Form Name</label>
              <input
                type="text"
                id="formName"
                className="w-full p-2 border border-gray-300 rounded"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1" htmlFor="formDesc">Description</label>
              <textarea
                id="formDesc"
                className="w-full p-2 border border-gray-300 rounded"
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1" htmlFor="deptInUse">Department</label>
              <input
                type="text"
                id="deptInUse"
                className="w-full p-2 border border-gray-300 rounded "
                value={deptInUse}
                onChange={(e) => setDeptInUse(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1" htmlFor="flagApplicable">Flag Applicable</label>
              <select
                id="flagApplicable"
                className="w-full p-2 border border-gray-300 rounded "
                value={flagApplicable}
                onChange={(e) => setFlagApplicable(e.target.value)}
                required
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
              {editFormId ? "Update" : "Submit"}
            </button>
          </form>
        </div>

        {/* Search and Available Forms Column */}
        <div className="w-full md:w-1/2 p-4 bg-gray-100 rounded h-150 overflow-y-scroll">
          <h2 className="font-bold mb-4">Available Forms</h2>
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Search for forms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="w-full p-2 mb-4 bg-blue-600 text-white rounded">Search</button>
          <div className="space-y-4">
            {forms
              .filter(form => form.FormName.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((form, index) => (
                <div key={index} className="p-4 bg-white border border-gray-300 rounded flex justify-between items-center">
                  {form.FormName}
                  <div className="flex space-x-2">
                    <button onClick={() => handleEdit(form)} className="text-blue-600 hover:text-blue-800">
                      <Edit className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleDelete(form._id)} className="text-red-600 hover:text-red-800">
                      <Trash className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-4 bg-gray-200 text-center">
        &copy; {new Date().getFullYear()} All rights reserved.
      </footer>
    </div>
  );
};

export default AddFormDetails;
