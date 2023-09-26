import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {additem, removeitem} from '../../redux/cartSlice'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { FaTrash } from 'react-icons/fa'

const Cart = () => {

    let user = JSON.parse(localStorage.getItem('user'))
    let u_id = user._id
    const Navigate = useNavigate()

    const cartItems = useSelector(state => state.cart.items)
    const dispatch = useDispatch()
    useEffect(() => {
        getcartproduct()
    }, [])
    console.warn('cart store', cartItems)
    const [data, setData] = useState([])
    const [qty, setQty] = useState('')

    // get Cart products
    const getcartproduct = async () => {
        let data = await fetch(`http://localhost:5000/getcartproduct/${u_id}`)
        data = await data.json()
        if (data.result.length > 0) {
            setData(data.result)
            dispatch(additem(data.result))
            // console.log('cart data', data.result)
        } else {
            console.log(data.result)

        }
    }
    // Remove  cart product 
    const deletecartproduct = async (p_id) => {
        let data = await fetch(`http://localhost:5000/deletecart/${p_id}/${u_id}`, { method: 'delete' })
        data = await data.json()
        if (data.success) {
            alert('Product removed...')
            getcartproduct()
            // console.log('delete cart ', data.result)
        } else {
            console.log(data.result)
        }
    }
    // Go to Product Details
    const productdetail = (id) => {
        // console.log('product ..',item)
        Navigate(`/productdetail/${id}`)
    }

    const manageqty=()=>{

        
    }
    return (
        <div>
            <h1 className='text-center'>Carts Details</h1>
            <div className='cart'>
                <h1>Shoping Cart</h1><br />
                <Table striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>SubTotal</th>
                            <th>Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? data.map((item, index) => (

                            <tr key={index+1}>
                                {/* {console.log('items',item.product)} */}
                                <td>{index + 1}</td>
                                <td width={400}>
                                    <img src={`./product_images/${item.product[0].image}`}
                                        alt='img' height={100} width={100} style={{ cursor: "pointer" }}
                                        onClick={() => productdetail(item.product_id)} />
                                    {item.product[0].title}
                                </td>
                                <td>{item.product[0].price}</td>
                                <td>
                                    <div className="quantity">
                                        <a href="#" className="quantity__minus" ><span>-</span></a>
                                        <input name="quantity" type="text" className="quantity__input" value={item.quantity} />
                                        <a href="#" className="quantity__plus"><span>+</span></a>
                                    </div>
                                </td>
                                <td>
                                    subtotal
                                </td>
                                <td>
                                    <FaTrash className='tool-icon'
                                        onClick={() => deletecartproduct(item.product_id)} style={{color:'red'}}></FaTrash>
                                </td>
                            </tr>
                        ))
                            :
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                <td>@fat</td>

                            </tr>
                        }



                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Cart