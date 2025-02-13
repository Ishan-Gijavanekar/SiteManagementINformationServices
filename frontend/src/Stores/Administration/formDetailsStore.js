import { create } from 'zustand';
import { axiosInstance } from '../../utils/axios.js';
import { toast } from 'react-hot-toast';

export const useFormDetailsStore = create((set) => ({
  forms: [],
  formDetails: null,
  isLoading: false,

  addForm: async (data) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post('FormDetails/addForm', data);
      toast.success(response.data.message);
      set((state) => ({
        forms: [...state.forms, response.data.newForm],
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error in addForm:", error);
      toast.error(error.response?.data?.message || "An unexpected error occurred");
      set({ isLoading: false });
    }
  },

  fetchForms: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get('FormDetails/getForms');
      set({ forms: response.data.forms, isLoading: false });
    } catch (error) {
      console.error("Error in fetchForms:", error);
      toast.error(error.response?.data?.message || "An unexpected error occurred");
      set({ isLoading: false });
    }
  },

  updateForm: async (id, data) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.put(`FormDetails/updateForm/${id}`, data);
      toast.success(response.data.message);
      set((state) => ({
        forms: state.forms.map(form => form._id === id ? response.data.updatedForm : form),
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error in updateForm:", error);
      toast.error(error.response?.data?.message || "An unexpected error occurred");
      set({ isLoading: false });
    }
  },

  getFormById: async (id) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(`FormDetails/getFormById/${id}`);
      set({ formDetails: response.data.formDetails, isLoading: false });
    } catch (error) {
      console.error("Error in getFormById:", error);
      toast.error(error.response?.data?.message || "An unexpected error occurred");
      set({ isLoading: false });
    }
  },

  deleteForm: async (id) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.delete(`FormDetails/deleteForm/${id}`);
      toast.success(response.data.message);
      set((state) => ({
        forms: state.forms.filter(form => form._id !== id),
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error in deleteForm:", error);
      toast.error(error.response?.data?.message || "An unexpected error occurred");
      set({ isLoading: false });
    }
  },
}));
