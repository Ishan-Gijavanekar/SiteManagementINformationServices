import React, { useEffect, useState } from 'react';
import { Menu, X, Edit, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStateMasterStore } from '../../Stores/Administration/stateDetailStore.js';

const AddStateForm = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [stateDesc, setStateDesc] = useState('');
  const [stateGstCode, setStateGstCode] = useState('');
  const [flagStateUt, setFlagStateUt] = useState('State');
  const [fstToDgtsInGstn, setFstToDgtsInGstn] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [editStateId, setEditStateId] = useState(null);

  const { addState, fetchStates, states, updateState, deleteState } = useStateMasterStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStates();
  }, [fetchStates]);

  const handleLogout = async () => {
    // Add logout logic
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stateData = {
      StateDesc: stateDesc,
      StateGstCode: stateGstCode,
      FlagStateUt: flagStateUt,
      FstToDgtsInGstn: fstToDgtsInGstn
    };
    if (editStateId) {
      await updateState(editStateId, stateData);
      setEditStateId(null);
    } else {
      await addState(stateData);
    }
    setStateDesc('');
    setStateGstCode('');
    setFlagStateUt('State');
    setFstToDgtsInGstn('');
  };

  const handleEdit = (state) => {
    setEditStateId(state._id);
    setStateDesc(state.StateDesc);
    setStateGstCode(state.StateGstCode);
    setFlagStateUt(state.FlagStateUt);
    setFstToDgtsInGstn(state.FstToDgtsInGstn);
  };

  const handleDelete = async (id) => {
    await deleteState(id);
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
          <h2 className="font-bold mb-4">{editStateId ? "Edit State" : "Add State"}</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1" htmlFor="stateDesc">State Description</label>
              <input
                type="text"
                id="stateDesc"
                className="w-full p-2 border border-gray-300 rounded"
                value={stateDesc}
                onChange={(e) => setStateDesc(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1" htmlFor="stateGstCode">State GST Code</label>
              <input
                type="text"
                id="stateGstCode"
                className="w-full p-2 border border-gray-300 rounded"
                value={stateGstCode}
                onChange={(e) => setStateGstCode(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1" htmlFor="flagStateUt">Flag State UT</label>
              <select
                id="flagStateUt"
                className="w-full p-2 border border-gray-300 rounded"
                value={flagStateUt}
                onChange={(e) => setFlagStateUt(e.target.value)}
                required
              >
                <option value="State">State</option>
                <option value="UT">UT</option>
              </select>
            </div>
            <div>
              <label className="block mb-1" htmlFor="fstToDgtsInGstn">First Two Digits in GSTN</label>
              <input
                type="text"
                id="fstToDgtsInGstn"
                className="w-full p-2 border border-gray-300 rounded"
                value={fstToDgtsInGstn}
                onChange={(e) => setFstToDgtsInGstn(e.target.value)}
              />
            </div>
            <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
              {editStateId ? "Update" : "Submit"}
            </button>
          </form>
        </div>

        {/* Search and Available States Column */}
        <div className="w-full md:w-1/2 p-4 bg-gray-100 rounded h-150 overflow-y-scroll">
          <h2 className="font-bold mb-4">Available States</h2>
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Search for states..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="w-full p-2 mb-4 bg-blue-600 text-white rounded">Search</button>
          <div className="space-y-4">
            {states
              .filter(state => state.StateDesc.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((state, index) => (
                <div key={index} className="p-4 bg-white border border-gray-300 rounded flex justify-between items-center">
                  {state.StateDesc}
                  <div className="flex space-x-2">
                    <button onClick={() => handleEdit(state)} className="text-blue-600 hover:text-blue-800">
                      <Edit className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleDelete(state._id)} className="text-red-600 hover:text-red-800">
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

export default AddStateForm;
