import { create } from 'zustand'
import { axiosInstance } from '../utils/axios.js'
import { toast } from 'react-hot-toast'

export const useAuthStore = create((set) => ({
    chechAuth: null,
    isLoading: false,
    users: [],

    register: async (data) => {
        set({ isLoading: true })
        try {
            const response = await axiosInstance.post('/users/register', data)
            set({ chechAuth: response.data.newUser })
            toast.success("User registered successfully")
        } catch (error) {
            console.error("Error in register:", error)
            if (error.response) {
                toast.error(error.response.data.message)
            } else {
                toast.error("An unexpected error occurred")
            }
        } finally {
            set({ isLoading: false })
        }
    },

    login: async (data) => {
        set({ isLoading: true })
        try {
            const response = await axiosInstance.post('/users/login', data)
            if (response.data.user) {
                set({ chechAuth: response.data.user })
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message || 'Invalid credentials')
            }
            return response
        } catch (error) {
            console.error("Error in login:", error)
            if (error.response) {
                toast.error(error.response.data.message)
            } else {
                toast.error("An unexpected error occurred")
            }
        } finally {
            set({ isLoading: false })
        }
    },

    logout: async () => {
        set({ isLoading: true })
        try {
            await axiosInstance.post('/users/logout')
            set({ chechAuth: null })
            toast.success("Logout successful")
        } catch (error) {
            console.error("Error in logout:", error)
            if (error.response) {
                toast.error(error.response.data.message)
            } else {
                toast.error("An unexpected error occurred")
            }
        } finally {
            set({ isLoading: false })
        }
    },

    getUsers: async () => {
        set({ isLoading: true })
        try {
            const response = await axiosInstance.get('/users/getUsers')
            if (response.data.users) {
                set({ users: response.data.users })
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message || 'No users found')
            }
        } catch (error) {
            console.error("Error in getUsers:", error)
            if (error.response) {
                toast.error(error.response.data.message)
            } else {
                toast.error("An unexpected error occurred")
            }
        } finally {
            set({ isLoading: false })
        }
    },

    deleteUser: async (id) => {
        set({ isLoading: true })
        try {
            const response = await axiosInstance.delete(`/users/deleteUser/${id}`)
            if (response.data.message) {
                set((state) => ({
                    users: state.users.filter(user => user._id !== id)
                }))
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message || 'Error deleting user')
            }
        } catch (error) {
            console.error("Error in deleteUser:", error)
            if (error.response) {
                toast.error(error.response.data.message)
            } else {
                toast.error("An unexpected error occurred")
            }
        } finally {
            set({ isLoading: false })
        }
    },
}))
