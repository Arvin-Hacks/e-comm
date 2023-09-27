import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { additem } from '../../redux/cartSlice'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BsCartDashFill } from 'react-icons/bs'

const Nav = (Props) => {




  let auth = JSON.parse(localStorage.getItem('user'))
  let admin_auth = JSON.parse(localStorage.getItem('admin'))
  let u_id = auth._id

  // const [cartData, setCartData] = useState([])
  const dispatch = useDispatch()
  // const cartItems=useSelector(state=>state.cart.items)



  const cartItems = useSelector(state => state.cart.items)
  console.log('cartDataaaaaaaaaaaaa', cartItems ,cartItems.length )
  const logout = () => {
    localStorage.clear()

  }

  // const getcartproduct = async () => {
  //   let data = await fetch(`http://localhost:5000/getcartproduct/${u_id}`)
  //   data = await data.json()
  //   if (data.result.length > 0) {
  //     console.log('cart dataaaaaaaaaaaaaa', data.result)

  //     // setCartData(data.result)
  //     dispatch(additem(cartData))
  //     // dispatch(additem(data.result))
  //     // console.log('cart data', data.result)
  //   } else {
  //     console.log(data.result)

  //   }
  // }
  useEffect(() => {
    // getcartproduct()
  }, [])

  return (
    <div >

      <nav className='navv'>
        <ul>
          {
            auth || admin_auth ? <>
              <li><Link to='/'>Product</Link></li>
              {/* <li><Link to='/productdetail'>Product Details</Link></li> */}
              <li><Link to='/cart' style={{ fontSize: "20px" }}><BsCartDashFill /><label className='cart-badge'>{cartItems.length}</label></Link></li>
              <li><Link to='/userlogin' onClick={logout}>Logout</Link></li>
            </>
              : <>
                <li><Link to='/userlogin' >Login</Link></li>
                <li><Link to='/usersignup' >SignUp</Link></li>
                {/* <li><Link to='/' >SignUp</Link></li> */}
              </>
          }
        </ul>
      </nav>
    </div>

  )
}

export default Nav