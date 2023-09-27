import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { additem, removeitem } from '../../redux/cartSlice'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import {IoBagCheckOutline}  from 'react-icons/io5'
import { useNavigate } from 'react-router-dom';
import ProductTools from './ProductTools';
const Product = () => {
    let user = JSON.parse(localStorage.getItem('user'))
    let u_id = user._id

    const [data, setData] = useState([])
    const [CartId, setCartid] = useState([])
    // const cartItems= useSelector(state=>state.cart.items)
    const dispatch = useDispatch()
    const Navigate = useNavigate()

    useEffect(() => {
        getproduct()
        getCartId()
    }, [])

    // Get Cart deatils to show dynamic add to cart button
    const getCartId = async () => {
        let result = await fetch(`http://localhost:5000/getcartproduct/${u_id}`)
        result = await result.json()
        if (result.success) {
            dispatch(additem(result.result))
            setCartid(result.result.map((item) => item.product_id))
            // console.warn("test:", result.result)
            getproduct()
        }
    }
        // Get All Products
    const getproduct = async () => {
        let data = await fetch('http://localhost:5000/')
        data = await data.json()
        if (data.result.length > 0) {
            setData(data.result)
        }
    }
    // Add Product to cart
    const addtocart = async (p_id) => {
        let result = await fetch(`http://localhost:5000/addtocart/${p_id}/${u_id}`)
        result = await result.json()
        if (result.success) {  
            alert('product added to cart')
            // console.log('details',result.result.product_id)
            getproduct()
        getCartId()
        } else {
            alert('error')
        }
    }
    // Get Product Details
    const productdetail = (id) => {
        Navigate(`/productdetail/${id}`)
    }

    return (
        <div style={{marginTop:"60px"}}>
            {/* <h1 className='text-center'>Products</h1> */}
            <div className='product-tools' >
                <ProductTools />
            </div>
            <div className='product'>
                {data.length > 0 ? data.map((item) =>
                    <div className='p_card' key={item._id}>
                        <Card style={{ padding: '25px', height: "430px" }} >
                            {/* <img alt="cover_page" src={require(`./books/${items.cover_page}`)} */}
                            <Card.Img variant="top" src={`./product_images/${item.image}`} width={277} height={193} onClick={() => productdetail(item._id)} />
                            <Card.Body style={{ height: "50px" }}>
                                <Card.Title>{item.title}</Card.Title>
                                {/* <Card.Text>
                           Category- {item.category}
                        </Card.Text> */}
                                
                            </Card.Body>
                            <Card.Body>
                            <Card.Text className='price'>₹ {item.price}</Card.Text>
                                {CartId.includes(item._id) ?
                                    <button className='btn-cart2' onClick={()=>Navigate('/cart')}><IoBagCheckOutline size={20}/> CHECKOUT</button>
                                    :
                                    <button onClick={() => addtocart(item._id)} className='btn-cart1'>ADD TO CART</button>
                            }


                            </Card.Body>
                        </Card>
                    </div>

                )
                    :
                    <></>
                    // <div className='p_card'>
                    //     <Card style={{padding:'20px'}} >
                    //         <Card.Img variant="top" src={p_img} width={277}height={ 193} />
                    //         <Card.Body>
                    //             <Card.Title>Card Title</Card.Title>
                    //             <Card.Text>
                    //                 bulk of the card's content.
                    //             </Card.Text>
                    //         <Card.Text>Price: $399</Card.Text>

                    //         </Card.Body>
                    //         <Card.Body>
                    //         <Button>Add to Cart</Button>
                    //         </Card.Body>
                    //     </Card>
                    // </div>
                }





            </div>
        </div>
    )
}

export default Product