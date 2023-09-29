import React from 'react'
import {Navigate, Outlet } from 'react-router-dom'

const UserPrivate = () => {
    let auth= JSON.parse(localStorage.getItem('user'))
    let admin = JSON.parse(localStorage.getItem('admin'))

    // console.log('auth',auth)

     return auth || admin  ? <Outlet/>:<Navigate to='/userlogin'/>

}

export default UserPrivate