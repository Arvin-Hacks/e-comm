import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Customer/product.css'
import Button from 'react-bootstrap/esm/Button';
import { useParams } from 'react-router-dom';

const ProductDetails = (props) => {
    const param=useParams()
    const [product,setProduct]=useState([])
    console.log('props',param.id)
    useEffect(()=>{
        getproductdata()
    },[])

    const getproductdata=async()=>{
        let data= await fetch(`http://localhost:5000/getproductdetails/${param.id}`)
        data= await data.json()

        if(data.success){
            setProduct(data.result)
            console.warn('data',data.result)
        }else{
            console.warn('data',data.result)

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
                            <Button>Add to Cart</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails