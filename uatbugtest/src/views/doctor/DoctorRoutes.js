import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const DoctorList = Loadable(lazy(() => import('./DoctorList')))
const EditDoctor = Loadable(lazy(() => import('./EditDoctor')))
const AddDoctor = Loadable(lazy(() => import('./AddDoctor')))

const doctorRoutes = [
    {
        path: '/doctor',
        element: <DoctorList />,
    },
    {
        path: '/doctor/edit/:id',
        element: <EditDoctor />,
    },
    {
        path: '/doctor/add',
        element: <AddDoctor />,
    },
]

export default doctorRoutes
