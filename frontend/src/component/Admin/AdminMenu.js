import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AdminMenu = () => {
  const Navigate=useNavigate()
  const logout=()=>{
    localStorage.clear()
    Navigate('/adminlogin')
  }
  // localStorage.setItem('admin',JSON.stringify({name:"John"}))
  

  return (
    <div>
        <ul className='menu'>
            <li><Link to='/dashboard/dashboarddetail' >Dashboard</Link></li>
            <li><Link to='/dashboard/addproduct' >Add Product</Link></li>
            <li><Link to='/dashboard/productmanagement' >Product Management</Link></li>
            <li><Link to='/dashboard/customermanagement' >Customer Management</Link></li>
            <li style={{position:'absolute',bottom:"20px",width:'230px'}} onClick={logout}>Logout</li>
        </ul>
    </div>
  )
}

export default AdminMenu