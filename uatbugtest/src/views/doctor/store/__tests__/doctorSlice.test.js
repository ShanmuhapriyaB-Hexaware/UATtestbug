import store from 'store/store'
import { doctorAdded, doctorDeleted, doctorUpdated } from '../doctorSlice'

describe('testing doctor redux store reducers', () => {
    test('add doctor to store test', () => {
        let state = store.getState().doctor
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            name: 'name',
            gender: 'gender',
        }
        store.dispatch(doctorAdded(initialInput))
        state = store.getState().doctor
        expect(state.entities).toHaveLength(1)
    })

    test('update doctor from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            name: 'name',
            gender: 'gender',
        }
        store.dispatch(doctorAdded(initialInput))
        let state = store.getState().doctor
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            name: 'name1',
            gender: 'gender1',
        }
        store.dispatch(doctorUpdated(updatedInput))
        state = store.getState().doctor
        let changedDoctor = state.entities.find((p) => p.id === 2)
        expect(changedDoctor).toStrictEqual(updatedInput)
    })

    test('delete doctor from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            name: 'name',
            gender: 'gender',
        }
        store.dispatch(doctorAdded(initialInput))
        let state = store.getState().doctor
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            doctorDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().doctor
        expect(state.entities).toHaveLength(2)
    })
})
