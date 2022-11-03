import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'doctor'

export const fetchDoctor = createAsyncThunk('doctor/fetchDoctor', async () => {
    const response = await axios.get(`/${endPoint}`)
    const doctor = await response.data
    return doctor
})

export const addDoctor = createAsyncThunk(
    'doctor/addDoctor',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const doctor = await response.data
        thunkAPI.dispatch(showSuccess('Doctor added successfully'))
        return doctor
    }
)

export const editDoctor = createAsyncThunk(
    'doctor/editDoctor',
    async (data, thunkAPI) => {
        const response = await axios.put(`/${endPoint}/${data.id}`, data)
        const doctor = await response.data
        thunkAPI.dispatch(showSuccess('Doctor updated successfully'))
        return doctor
    }
)

export const deleteDoctor = createAsyncThunk(
    'doctor/deleteDoctor',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected doctor deleted successfully.')
            )
            return data.id
        }
    }
)
