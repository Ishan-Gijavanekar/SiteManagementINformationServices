import {create} from 'zustand';
import { axiosInstance } from '../../utils/axios';
import toast from 'react-hot-toast';

const useformRightstore = create((set) => ({
  formRightss: [],
  loading: false,
  error: null,

  fetchformRights: async (data) => {
    set({ loading: true, error: null });
    try {
      console.log(data)
      const response = await axiosInstance.post('/FormRights/getUserRights', data);
      set({ formRightss: response.data.getRights, loading: false });
      toast.success('Form rights fetched successfully!');
      console.log(response.data)
      return response.data.getRights
    } catch (error) {
      console.error('Error fetching form rights:', error);
      set({ error: 'Error fetching form rights', loading: false });
      toast.error('Error fetching form rights.');
    }
  },

  addFormRight: async (formRightData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post('/FormRights/addUserRights', formRightData);
      set((state) => ({
        formRightsss: [...state.formRightss, response.data.newRecd],
        loading: false,
      }));
      toast.success('Form right added successfully!');
    } catch (error) {
      console.error('Error adding form right:', error);
      set({ error: 'Error adding form right', loading: false });
      toast.error('Error adding form right.');
    }
  },

  updateFormRight: async (id, formRightData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.put(`/FormRights/updateUserRights/${id}`, formRightData);
      set((state) => ({
        formRightsss: state.formRightss.map((right) =>
          right._id === id ? response.data.updatedRights : right
        ),
        loading: false,
      }));
      toast.success('Form right updated successfully!');
    } catch (error) {
      console.error('Error updating form right:', error);
      set({ error: 'Error updating form right', loading: false });
      toast.error('Error updating form right.');
    }
  },

  deleteFormRight: async (id) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`/FormRights/deleteUserRights/${id}`);
      set((state) => ({
        formRightsss: state.formRightss.filter((right) => right._id !== id),
        loading: false,
      }));
      toast.success('Form right deleted successfully!');
    } catch (error) {
      console.error('Error deleting form right:', error);
      set({ error: 'Error deleting form right', loading: false });
      toast.error('Error deleting form right.');
    }
  },
}));


export {useformRightstore}