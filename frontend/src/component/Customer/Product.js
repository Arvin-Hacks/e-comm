import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';
// const path='../../utils/product_images/'
// require('../utils/product_images')
// const p_img='https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'

const Product = () => {
    const Navigate=useNavigate()
    useEffect(()=>{
        getproduct()
    },[])
    const [data,setData]=useState([])
    const getproduct=async()=>{
        let data= await fetch('http://localhost:5000/')
        data= await data.json()
        if(data.result.length>0){
            setData(data.result)
        }
    }
    const addtocart=()=>{
    }

    const productdetail=(id)=>{
        // console.log('product ..',item)
        Navigate(`/productdetail/${id}`)

    }
    return (
        <div>
            <h1 className='text-center'>Products</h1>
            <div className='product'>
                {data.length>0 ?data.map((item)=>
                <div className='p_card'>
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