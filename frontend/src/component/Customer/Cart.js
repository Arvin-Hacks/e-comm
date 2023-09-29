import React, { useEffect, useState } from 'react'
import {useDispatch } from 'react-redux';
import { additem } from '../../redux/cartSlice'
import { Link} from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import CartRow from './CartRow';

const Cart = () => {

    let user = JSON.parse(localStorage.getItem('user'))
    let u_id = user ? user._id :''
    const dispatch = useDispatch()
    useEffect(() => {
        getcartproduct()
    }, [])

    const [data, setData] = useState([])
    const C_Total = data.map((a) => a.product[0].price * a.quantity).reduce((prev, curr) => prev + curr, 0)


    // get Cart products
    const getcartproduct = async () => {
        let data = await fetch(`http://localhost:5000/cart/getcartproducts/${u_id}`)
        data = await data.json()
        if (data.result.length > 0) {
            setData(data.result)
            dispatch(additem(data.result))
            // console.log('cart data', data.result)
        } else {
            console.log(data.result)

        }
    }

    // Go to Product Details

    return (
        <div style={{ margin: "0px 5px 20px 20px" }}>
            <h1 className='text-center'>Carts Details</h1>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                <div className='cart' style={{ minWidth: "800px" }}>
                    <h1>Shoping Cart</h1><br />
                    <Table striped>
                        <thead style={{borderBottom:"2px solid black"}} >
                            <tr>
                                <th >#</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>SubTotal</th>
                                <th>Manage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? data.map((item, index) => (

                                <CartRow product={item} key={index + 1} index={index + 1} onChildchange={getcartproduct}></CartRow>

                            ))
                                :
                                <tr>
                                    <td>*</td>
                                    <td><h2><Link to='/' style={{ textDecoration: "none" }}>Add some data in cart</Link></h2></td>
                                </tr>
                            }
                        </tbody>
                       
                    </Table>
                </div>
                <div className="cart-summary" style={{ float: "right" }}>
                    <div >
                        <p className="fs-5">SUMMARY</p>
                    </div>
                    <div>
                        <p>Do you have a promocode ?</p>
                        <input type="text" style={{height:"37px"}}></input>&nbsp;<span role="button" className='btn-cart1' style={{width:"100px"}}>APPLY</span>
                    </div>
                    <div>
                        <p className="fs-5">SUBTOTAL<p className="sumary-value">₹ {C_Total}</p></p>
                        <p>Shipping <p className="sumary-value">₹ 2.2155</p></p>
                        <p>Sales Tex<p className="sumary-value">₹ 2.2155</p></p>
                        {/* <p>Sales Tex<p className="sumary-value">2.2155</p></p> */}
                    </div>
                    <div>
                        <p className="fs-5">ESTIMATED TOTAL<p className="sumary-value">₹ {(C_Total + 2.2155 + 2.2155).toFixed(2)}</p></p>
                    </div>
                    <div>
                        <button className='btn-cart1' style={{ position: "unset" }}>CHECKOUT</button>
                    </div>





                </div>
            </div>


        </div >
    )
}

export default Cart