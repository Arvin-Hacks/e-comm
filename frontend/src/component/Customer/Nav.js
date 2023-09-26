import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BsCartDashFill} from 'react-icons/bs'

const Nav = () => {
  const cartItems= useSelector(state=>state.cart.items)
  return (
    <div >
      
      <nav className='navv'>
        <ul>
            <li><Link to='/'>Product</Link></li>
            {/* <li><Link to='/productdetail'>Product Details</Link></li> */}
            <li><Link to='/cart' style={{fontSize:"20px"}}><BsCartDashFill /><label className='cart-badge'>{cartItems.length}</label></Link></li>
            <li>Profile</li>
            {/* <li style={{right:"20px",position:"absolute"}}><Link to='/cart'>Product</Link></li> */}
            {/* <li style={{right:"20px",position:"absolute",padding:'10px'}}>User</li> */}
        </ul>
      </nav>
    </div>
    
  )
}

export default Nav