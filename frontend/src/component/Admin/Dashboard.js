import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminMenu from './AdminMenu'
import Addproduct from './Addproduct'

const Dashboard = () => {
    const Navigate = useNavigate()
    // console.log('window.location.pathname',window.location.pathname)
    useEffect(() => {
        if (window.location.pathname === '/dashboard' || window.location.pathname === '/dashboard/') {
            Navigate('/dashboard/dashboarddetail')
        }
    }, [])

    return (
        <div className='dashboard'>
            <div>
                <AdminMenu />

            </div>
            <div className='dashboard-content'>
                {/* <h1>Dashboard</h1> */}
                <Outlet />
            </div>

        </div>
    )
}

export default Dashboard