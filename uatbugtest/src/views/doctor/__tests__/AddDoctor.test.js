const {
    render,
    screen,
    fireEvent,
    within,
    waitFor,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import AddDoctor from '../AddDoctor'

beforeEach(() => {
    const endPoint = 'doctor'
    const getStudentListResponse = [
        {
            id: 1,
            name: 'name',
            gender: 'gender',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddDoctor />
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

describe('testing view DoctorAdd Component', () => {
    test('should render AddDoctor and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addDoctorButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const nameElement = screen.getByLabelText(/Name/i)
        const genderElement = screen.getByLabelText(/Gender/i)

        expect(addDoctorButtonElement).toBeInTheDocument()

        expect(nameElement).toBeInTheDocument()
        expect(genderElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Doctor add form', async () => {
        const nameElement = screen.getByLabelText(/Name/i)
        const genderElement = screen.getByLabelText(/Gender/i)

        fireEvent.change(nameElement, { target: { value: 'name' } })
        fireEvent.change(genderElement, { target: { value: 'gender' } })
    })

    test('should return error message when add Doctor button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addDoctorButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addDoctorButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(2)
    })
})
