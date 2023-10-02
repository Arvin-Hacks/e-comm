import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
// import { additem } from '../../redux/cartSlice'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BsCartDashFill } from 'react-icons/bs'
import { IoNotificationsCircleOutline } from 'react-icons/io5'
import Badge from 'react-bootstrap/Badge';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ProductNotification from '../Admin/Notification';

const Nav = () => {
  useEffect(() => {
    getnotificationdata()
  }, [])

  const [show, setShow] = useState(false)
  const [notificationData, setNotification] = useState([])

  let auth = JSON.parse(localStorage.getItem('user'))
  let admin_auth = JSON.parse(localStorage.getItem('admin'))

  const cartItems = useSelector(state => state.cart.items)
  const logout = () => {
    localStorage.clear()
  }

  const getnotificationdata = async () => {
    let data = await fetch('http://localhost:5000/product/inventorycheck').then(response => response.json())
    if (data.success) {
      setNotification(data.result)
      console.warn('Notificationdata:', data.result)
    } else {
      console.warn('Notificationdata:', data.result)
    }
  }
  // admin_auth ? setInterval(() => {getnotificationdata()}, 350000):console.log('Quantiy in control')
  return (

    <div >
      <nav className='navv'>
        <img src={'./logo2.png'} alt='E-Comm' className='logo' />

        <ul>
          {
            auth || admin_auth ?

              admin_auth ? <>
                <li><Link to='/'>Product</Link></li>
                <li onClick={() => setShow(true)}><IoNotificationsCircleOutline size={30} /></li>
                <li><Link to='/userlogin' onClick={logout}>Logout</Link></li>
              </>
                : <>
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
      <Offcanvas show={show} onHide={() => setShow(false)} placement='end'>
        <Offcanvas.Header style={{ borderBottom: "2px solid #aeabab" }} closeButton>
          <Offcanvas.Title >Notificaion</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ borderBottom: "1px solid #aeabab" }}>
          {notificationData.length > 0 ? notificationData.map((product, index) =>
            <><ProductNotification productName={product.title} productQuantiy={product.quantity} key={index + 1} /></>
          )
            :
            <ProductNotification productName={'test'} productQuantiy={'5'} />
          }
        </Offcanvas.Body>

      </Offcanvas>
    </div>

  )
}

export default Nav