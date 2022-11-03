import axios from '../../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'store/store'
import {
    fetchDoctor,
    addDoctor,
    editDoctor,
    deleteDoctor,
} from '../doctor.action'

const getDoctorListResponse = [
    {
        id: 1,
        name: 'name',
        gender: 'gender',
    },
]

const addDoctorListResponse = (data) => {
    return { id: 2, ...data }
}
const editDoctorListResponse = (data) => {
    return data
}

describe('should test Doctor redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'doctor'
    test('Should be able to fetch the doctor list and update doctor redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getDoctorListResponse)
        const result = await store.dispatch(fetchDoctor())
        const doctorList = result.payload
        expect(result.type).toBe('doctor/fetchDoctor/fulfilled')
        expect(doctorList).toEqual(getDoctorListResponse)

        const state = store.getState().doctor
        expect(state.entities).toEqual(doctorList)
    })

    test('Should be able to add new doctor to list and make post api and update doctor redux store', async () => {
        const body = {
            name: 'name',
            gender: 'gender',
        }
        mock.onPost(`/${endPoint}`, body).reply(
            201,
            addDoctorListResponse(body)
        )
        const result = await store.dispatch(addDoctor(body))
        const doctorItem = result.payload
        expect(result.type).toBe('doctor/addDoctor/fulfilled')
        expect(doctorItem).toEqual(addDoctorListResponse(body))

        const state = store.getState().doctor
        expect(state.entities).toContainEqual(addDoctorListResponse(body))
    })

    test('Should be able to edit doctor in list and make put api call and update doctor redux store', async () => {
        const body = {
            id: 1,
            name: 'name',
            gender: 'gender',
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editDoctorListResponse(body)
        )
        const result = await store.dispatch(editDoctor(body))
        const doctorItem = result.payload
        expect(result.type).toBe('doctor/editDoctor/fulfilled')
        expect(doctorItem).toEqual(editDoctorListResponse(body))

        const state = store.getState().doctor
        let changedDoctor = state.entities.find((p) => p.id === body.id)
        expect(changedDoctor.name).toEqual(body.name)
    })

    test('Should be able to delete doctor in list and update doctor redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().doctor
        const initialLength = state.entities.length
        const result = await store.dispatch(deleteDoctor(input))
        const deletId = result.payload
        expect(result.type).toBe('doctor/deleteDoctor/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().doctor
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
