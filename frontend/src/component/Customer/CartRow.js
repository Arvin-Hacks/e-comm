import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const CartRow = (props) => {

    let user = JSON.parse(localStorage.getItem('user'))
    let u_id = user._id
    // console.log('u_id',u_id)
    const Navigate = useNavigate()
    const cart = props.product
    console.log('props', props)
    let [qty, setQty] = useState(cart.quantity)

    // Remove  cart product 
    const deletecartproduct = async () => {
        let data = await fetch(`http://localhost:5000/cart/deletecart/${cart._id}`, { method: 'delete' })
        data = await data.json()
        if (data.success) {
            alert('Product removed...')
            props.onChildchange(childData)
            // getcartproduct()
        } else {
            console.log(data.result)
        }
    }
    
    const handleqty = async () => {
        if (qty >= 1) {
            let data = await fetch(`http://localhost:5000/cart/updateqty/${cart._id}/${qty}`)
            data = await data.json()
            console.log('Update qty', data)
            props.onChildchange()
            // Navigate('/cart')
        } else {
            setQty(1)
            alert('qty can not be less than 1')
        }

    }

    const productdetail = (id) => {
        // console.log('product ..', cart)
        Navigate(`/productdetail/${id}`)
    }
    return (
        // <div>
        //     asd
        // </div>
        <>
            < tr key={1}>
                {/* {console.log(' carts', cart.product)} */}
                <th>{props.index}</th>
                <td width={400}>
                    <img src={`./product_images/${cart.product[0].image}`}
                        alt='img' height={100} width={100} style={{ cursor: "pointer" }}
                        onClick={() => productdetail(cart.product_id)} />
                    {cart.product[0].title}
                </td>
                <td>
                    <div className="quantity" >
                        <a href="#" className="quantity__minus" onClick={() => { setQty(--qty); handleqty() }}><span >-</span></a>
                        <input name="quantity" type="text" className="quantity__input" value={qty} onChange={(e) => { setQty(e.target.value); handleqty() }} />
                        <a href="#" className="quantity__plus" onClick={() => { setQty(++qty); handleqty() }}><span>+</span></a>
                    </div>
                </td>
                <td>₹ {cart.product[0].price}</td>
                <td>
                ₹ {cart.product[0].price * qty}
                </td>
                <td> 
                    <FaTrash className='tool-icon'
                        onClick={deletecartproduct} style={{ color: 'red' }}></FaTrash>
                </td>
            </tr>
        </>
    )
}

export default CartRow