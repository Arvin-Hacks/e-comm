import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {additem,removeitem} from '../../redux/cartSlice'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';
const Product = () => {
    let user= JSON.parse(localStorage.getItem('user'))
    let u_id=user._id

    const [data,setData]=useState([])
    const cartItems= useSelector(state=>state.cart.items)
    const dispatch=useDispatch()
    const Navigate=useNavigate()

    useEffect(()=>{
        getproduct()
    },[])
    // Get All Products
    const getproduct=async()=>{
        let data= await fetch('http://localhost:5000/')
        data= await data.json()
        if(data.result.length>0){
            setData(data.result)
        }
    }
    // Add Product to cart
    const addtocart=async(p_id)=>{
        let  result= await fetch(`http://localhost:5000/addtocart/${p_id}/${u_id}`)
        result= await result.json()
        if(result.success){
            alert('product added to cart')
            // console.log('details',result.result.product_id)
            dispatch(additem(result.result.product_id))
        }else{
            alert('error')
        }
    }
    // Get Product Details
    const productdetail=(id)=>{
        // console.log('product ..',item)
        Navigate(`/productdetail/${id}`)

    }
    return (
        <div>
            <h1 className='text-center'>Products</h1>
            <div className='product'>
                {data.length>0 ?data.map((item)=>
                <div className='p_card' key={item._id}>
                <Card style={{padding:'20px',height: "430px"}} >
                    {/* <img alt="cover_page" src={require(`./books/${items.cover_page}`)} */}
                    <Card.Img variant="top" src={`./product_images/${item.image}`} width={277}height={ 193} onClick={()=>productdetail(item._id)} />
                    <Card.Body>
                        <Card.Title>{item.title}</Card.Title>
                        {/* <Card.Text>
                           Category- {item.category}
                        </Card.Text> */}
                    <Card.Text>Price: ₹ {item.price}</Card.Text>
                    </Card.Body>
                    <Card.Body>
                    <Button onClick={()=>addtocart(item._id)}>Add to Cart</Button>
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