import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'


const Nav = () => {
  return (
    <div >
      
      <nav class='navv'>
        <ul>
            <li><Link to='/'>Product</Link></li>
            <li><Link to='/productdetail'>Product Details</Link></li>
            <li><Link to='/cart'>Product</Link></li>
            {/* <li style={{right:"20px",position:"absolute"}}><Link to='/cart'>Product</Link></li> */}
            {/* <li style={{right:"20px",position:"absolute",padding:'10px'}}>User</li> */}
        </ul>
      </nav>
    </div>
    
  )
}

export default Nav