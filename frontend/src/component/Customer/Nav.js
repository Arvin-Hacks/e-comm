import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { additem } from '../../redux/cartSlice'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BsCartDashFill } from 'react-icons/bs'
import { IoNotificationsCircleOutline } from 'react-icons/io5'
import Badge from 'react-bootstrap/Badge';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ProductNotification from '../Admin/Notification';

const Nav = () => {
  // console.log('props',productName)
 

  const [show, setShow] = useState(false)
  const [notificationData, setNotificationData] = useState([])

  let auth = JSON.parse(localStorage.getItem('user'))
  let admin_auth = JSON.parse(localStorage.getItem('admin'))

  const cartItems = useSelector(state => state.cart.items)
  const dispatch = useDispatch()
  // Logout Function 
  const logout = () => {
    localStorage.clear()
    window.location.reload()
  }
  // Get Admin Notification
  const getnotificationdata = async () => {
    let data = await fetch('http://localhost:5000/notify/getnotifications')
    data = await data.json()
    if (data.success) {
      console.log('data', data.result)
      setNotificationData(data.result)
      dispatch(additem(data.result))
      // window.location.reload()
    } else {
      console.log('No new notification ')
    }
    // window.location.reload()
  }
  // get Notificaton on certain interval
  admin_auth ? setInterval(() => { getnotificationdata() }, 350000) : console.log('Quantiy in control')

  useEffect(() => {
    getnotificationdata()
  }, [])
  return (

    <div >
      <nav className='navv'>
        <img src={'./logo2.png'} alt='E-Comm' className='logo' />

        <ul>
          {
            auth || admin_auth ?

              admin_auth ? <>
                <li><Link to='/dashboard/dashboarddetail'>Dashboard</Link></li>
                <li><Link to='/'>Product</Link></li>
                <li onClick={() => setShow(true)}><IoNotificationsCircleOutline size={30} />
                  <Badge bg="danger" >{cartItems.length}</Badge></li>
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
          <Offcanvas.Title key={'0'} >Notificaion</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ borderBottom: "1px solid #aeabab" }}>
          {notificationData.length > 0 ? notificationData.map((product, index) =>
            <><ProductNotification
              message={product.message}
              subject={product.subject}
              id={product._id}
              key={index + 1}
              onChildcahnge={getnotificationdata} /></>
          )
            :
            <h4> you are all done</h4>
            // <ProductNotification productName={'test'} productQuantiy={'5'} />
          }
        </Offcanvas.Body>

      </Offcanvas>
    </div>

  )
}

export default Nav