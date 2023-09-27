import React from 'react'
import { useSelector } from 'react-redux';
// import { additem } from '../../redux/cartSlice'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BsCartDashFill } from 'react-icons/bs'
import Badge from 'react-bootstrap/Badge';

const Nav = () => {



  let auth = JSON.parse(localStorage.getItem('user'))
  let admin_auth = JSON.parse(localStorage.getItem('admin'))

  const cartItems = useSelector(state => state.cart.items)
  const logout = () => {
    localStorage.clear()
  }

  return (
    <div >

      <nav className='navv'>
        <ul>
          {
            auth || admin_auth ? <>
              <li><Link to='/'>Product</Link></li>              
              <li><Link to='/cart' style={{ fontSize: "20px" }}><BsCartDashFill /><Badge bg="danger" >{cartItems.length}</Badge></Link></li>
              <li><Link to='/userlogin' onClick={logout}>Logout</Link></li>
            </>
              : <>
                <li><Link to='/userlogin' >Login</Link></li>
                <li><Link to='/usersignup' >SignUp</Link></li>                
              </>
          }
        </ul>
      </nav>
    </div>

  )
}

export default Nav