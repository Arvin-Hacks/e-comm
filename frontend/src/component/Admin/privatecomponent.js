import React from 'react'
import {Navigate, Outlet } from 'react-router-dom'

const Privatecomponent = () => {
    let auth= JSON.parse(localStorage.getItem('admin'))
    // console.log('auth',auth) 
       return auth ? <Outlet/>:<Navigate to='/adminlogin'/>
}

export default Privatecomponent