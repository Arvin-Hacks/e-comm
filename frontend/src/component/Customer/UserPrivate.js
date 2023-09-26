import React from 'react'
import { NavLink, Navigate, Outlet } from 'react-router-dom'

const UserPrivate = () => {
    let auth= JSON.parse(localStorage.getItem('user'))

    console.log('auth',auth)

     return auth ? <Outlet/>:<Navigate to='/userlogin'/>

}

export default UserPrivate