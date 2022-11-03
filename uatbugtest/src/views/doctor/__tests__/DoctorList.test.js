const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import DoctorList from '../DoctorList'
import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Doctor rows when api response has data', async () => {
    const endPoint = 'doctor'
    const getDoctorListResponse = [
        {
            id: 1,
            name: 'name1',
            gender: 'gender1',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getDoctorListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <DoctorList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const doctorNameCell = await screen.findByText(/name1/i)

    expect(doctorNameCell).toHaveTextContent(/name1/i)
    mock.reset()
})
