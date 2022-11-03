const {
    render,
    screen,
    fireEvent,
    within,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import EditDoctor from '../EditDoctor'
import { doctorAdded } from '../store/doctorSlice'
beforeAll(() => {
    store.dispatch(
        doctorAdded({
            id: 1,
            name: 'name',
            gender: 'gender',
        })
    )
})

beforeEach(() => {
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Navigate to="doctor/edit/1" replace />
                                }
                            />
                            <Route
                                path="doctor/edit/:id"
                                element={<EditDoctor />}
                            />
                        </Routes>
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
})

const clickAndWait = async (element) => {
    await act(async () => {
        fireEvent.click(element)
    })

    await act(async () => {
        jest.runOnlyPendingTimers()
    })
}

afterEach(cleanup)

describe('testing view of DoctorEdit Component', () => {
    test('should render EditDoctor and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveDoctorButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const nameElement = screen.getByLabelText(/Name/i)
        const genderElement = screen.getByLabelText(/Gender/i)

        expect(saveDoctorButtonElement).toBeInTheDocument()

        expect(nameElement).toBeInTheDocument()
        expect(genderElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Doctor edit form', async () => {
        const nameElement = screen.getByLabelText(/Name/i)
        const genderElement = screen.getByLabelText(/Gender/i)

        fireEvent.change(nameElement, { target: { value: 'name' } })
        fireEvent.change(genderElement, { target: { value: 'gender' } })

        expect(nameElement.value).toBe('name')

        expect(genderElement.value).toBe('gender')
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const nameElement = screen.getByLabelText(/Name/i)
        const genderElement = screen.getByLabelText(/Gender/i)

        fireEvent.change(nameElement, { target: { value: '' } })
        fireEvent.change(genderElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveDoctorButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveDoctorButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(2)
    })
})
