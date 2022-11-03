import { createSlice } from '@reduxjs/toolkit'
import { fetchDoctor } from './doctor.action'
import { addDoctor } from './doctor.action'
import { editDoctor } from './doctor.action'
import { deleteDoctor } from './doctor.action'

const fetchDoctorExtraReducer = {
    [fetchDoctor.pending]: (state, action) => {
        state.loading = true
    },
    [fetchDoctor.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchDoctor.rejected]: (state, action) => {
        state.loading = false
    },
}

const addDoctorExtraReducer = {
    [addDoctor.pending]: (state, action) => {
        state.loading = true
    },
    [addDoctor.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addDoctor.rejected]: (state, action) => {
        state.loading = false
    },
}

const editDoctorExtraReducer = {
    [editDoctor.pending]: (state, action) => {
        state.loading = true
    },
    [editDoctor.fulfilled]: (state, action) => {
        const { id, name, gender } = action.payload
        const existingDoctor = state.entities.find(
            (doctor) => doctor.id.toString() === id.toString()
        )
        if (existingDoctor) {
            existingDoctor.name = name
            existingDoctor.gender = gender
        }
        state.loading = false
    },
    [editDoctor.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteDoctorExtraReducer = {
    [deleteDoctor.pending]: (state, action) => {
        state.loading = true
    },
    [deleteDoctor.fulfilled]: (state, action) => {
        const id = action.payload
        const existingDoctor = state.entities.find(
            (doctor) => doctor.id.toString() === id.toString()
        )
        if (existingDoctor) {
            state.entities = state.entities.filter((doctor) => doctor.id !== id)
        }
        state.loading = false
    },
    [deleteDoctor.rejected]: (state, action) => {
        state.loading = false
    },
}
const doctorSlice = createSlice({
    name: 'doctor',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        doctorAdded(state, action) {
            state.entities.push(action.payload)
        },
        doctorUpdated(state, action) {
            const { id, name, gender } = action.payload
            const existingDoctor = state.entities.find(
                (doctor) => doctor.id.toString() === id.toString()
            )
            if (existingDoctor) {
                existingDoctor.name = name
                existingDoctor.gender = gender
            }
        },
        doctorDeleted(state, action) {
            const { id } = action.payload
            const existingDoctor = state.entities.find(
                (doctor) => doctor.id.toString() === id.toString()
            )
            if (existingDoctor) {
                state.entities = state.entities.filter(
                    (doctor) => doctor.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchDoctorExtraReducer,
        ...addDoctorExtraReducer,
        ...editDoctorExtraReducer,
        ...deleteDoctorExtraReducer,
    },
})

export const { doctorAdded, doctorUpdated, doctorDeleted } = doctorSlice.actions

export default doctorSlice.reducer
