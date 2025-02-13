import { create } from 'zustand';
import { axiosInstance } from '../../utils/axios.js';
import { toast } from 'react-hot-toast';

export const useStateMasterStore = create((set) => ({
  states: [],
  stateDetails: null,
  isLoading: false,

  addState: async (data) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post('/State/addState', data);
      toast.success(response.data.message);
      set((state) => ({
        states: [...state.states, response.data.newState],
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error in addState:", error);
      toast.error(error.response?.data?.message || "An unexpected error occurred");
      set({ isLoading: false });
    }
  },

  fetchStates: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get('/State/getStates');
      set({ states: response.data.states, isLoading: false });
    } catch (error) {
      console.error("Error in fetchStates:", error);
      toast.error(error.response?.data?.message || "An unexpected error occurred");
      set({ isLoading: false });
    }
  },

  getStateById: async (id) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(`/State/getStateById/${id}`);
      set({ stateDetails: response.data.state, isLoading: false });
    } catch (error) {
      console.error("Error in getStateById:", error);
      toast.error(error.response?.data?.message || "An unexpected error occurred");
      set({ isLoading: false });
    }
  },

  updateState: async (id, data) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.put(`/State/updateState/${id}`, data);
      toast.success(response.data.message);
      set((state) => ({
        states: state.states.map(state => state._id === id ? response.data.updatedState : state),
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error in updateState:", error);
      toast.error(error.response?.data?.message || "An unexpected error occurred");
      set({ isLoading: false });
    }
  },

  deleteState: async (id) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.delete(`/State/deleteState/${id}`);
      toast.success(response.data.message);
      set((state) => ({
        states: state.states.filter(state => state._id !== id),
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error in deleteState:", error);
      toast.error(error.response?.data?.message || "An unexpected error occurred");
      set({ isLoading: false });
    }
  },
}));
