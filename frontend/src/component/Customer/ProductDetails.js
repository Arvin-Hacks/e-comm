import React, { useEffect, useState } from 'react'
import {IoBagCheckOutline}  from 'react-icons/io5'

import 'bootstrap/dist/css/bootstrap.min.css';
import '../Customer/product.css'
import { useParams } from 'react-router-dom';

const ProductDetails = (props) => {

    let user = JSON.parse(localStorage.getItem('user'))
    let u_id = user ? user._id : ''

    const param=useParams()
    const [product,setProduct]=useState([])
    const [CartId,setCartid]=useState([])
    

    console.log('props',param.id)
    useEffect(()=>{
        getproductdata()
        getCartId()
    },[])

    const getproductdata=async()=>{
        let data= await fetch(`http://localhost:5000/product/getproductdetail/${param.id}`)
        data= await data.json()
        if(data.success){
            setProduct(data.result)
            console.warn('data',data.result)
        }else{
            console.warn('data',data.result)
        }
    }
    const getCartId = async () => {
        let result = await fetch(`http://localhost:5000/cart/getcartproducts/${u_id}`)
        result = await result.json()
        if (result.success) {
            // dispatch(additem(result.result))
            setCartid(result.result.map((item) => item.product_id))
            // console.warn("test:", result.result)
            // getproductdata()
        }
    }
    return (
        <div>
            <h1>Product Details</h1>
            <div>
                <div className="container">
                    <div className="card" style={{ display: "flex", flexDirection: "row" }}>
                        <div className='p-2'>
                            <h1>
                            <img src={`../product_images/${product.image}`} alt='Product' height={300} width={300} />
                                {/* <img src={require(`./product_images/${product.image}`)}
                                    alt='Product' height={300} width={300} /> */}
                            </h1>
                        </div>
                        <div className='product-deatils p-2'>
                            <h2>{product.title}</h2>
                            <h3>About Product</h3>
                            <div dangerouslySetInnerHTML={{__html: product.description}}/>
                            <h3>Price: ${product.price}</h3>
                            {/* <p>Color:
                                <Button variant='success'>Green</Button>&nbsp;
                                <Button variant='danger'>RED</Button>
                            </p>
                            <p>______________________________</p> */}
                            {CartId.includes(product._id) ?
                                    <button className='btn-cart2' onClick={()=>Navigate('/cart')}><IoBagCheckOutline size={20}/> CHECKOUT</button>
                                    :
                                    <button onClick={() => addtocart(product._id)} className='btn-cart1'>ADD TO CART</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails