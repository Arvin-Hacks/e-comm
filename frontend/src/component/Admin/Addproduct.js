import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



const Addproduct = () => {
    const [description, setDescription] = useState('')
    const [selectedfile, setSelected] = useState(false)
    const [product, setProduct] = useState({
        title: '',
        description: '',
        category: '',
        price: '',
        quantity: '',
    })
    const handledesc = (desc) => {
        // setDescription(desc)
        console.log('desc', desc)
        setProduct({ ...product, description: desc })
        console.log('product', product.description)


    }
    const addproduct = async () => {
        if (product.title && product.category && product.description && product.category && product.price) {
            const fromdata = new FormData();
            fromdata.append('product', selectedfile)
            let upload_result = await fetch('http://localhost:5000/upload', {
                method: "post",
                body: fromdata

            })
            upload_result = await upload_result.json()
            if (upload_result.success) {
                let result = await fetch('http://localhost:5000/addproduct', {
                    method: 'post',
                    body: JSON.stringify(product),
                    headers: {
                        "Content-Type": "application/json"
                    }

                })
                result = await result.json()
                if (result.success) {
                    console.log('result ', result.result)
                } else {
                    console.log('result', result.result)
                }
                alert('success')
                console.log('file upload', upload_result.result)
            } else {
                console.log('file upload', upload_result.result)
            }
        }
        console.log('product details', product)
        // console.log('type',typeof(product.price))
        // let result = await fetch('http://localhost:5000/addproduct', {
        //     method: 'post',
        //     body: ""
        // })
    }
    return (
        <div >
            <h1>Add Product</h1>
            <div className='add-product' >
                <Form>
                    <Form.Group>
                        <Form.Label column sm="2">
                            Product Title
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Product Title"
                                value={product.title} onChange={(e) => setProduct({ ...product, title: e.target.value })} />
                        </Col>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label column sm="2">
                            Category
                        </Form.Label>
                        <Col sm="10">
                            <Form.Select value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })}>
                                <option disabled value=''>Select category</option>
                                <option value='Electricals'>Electricals</option>
                                <option value='Clothing'>Clothing</option>
                                <option value='Groceries'>Groceries</option>
                                <option value='Home & Kitchen'>Home & Kitchen</option>
                                <option value='Books'>Books</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label column sm="2">
                            Price
                        </Form.Label>
                        <Col sm="10">
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">₹</InputGroup.Text>
                                <Form.Control type='number' placeholder="Price"
                                    value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} />
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label column sm="2">
                            Quantity
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control placeholder="Quantity" type='number'
                                value={product.quantity} onChange={(e) => setProduct({ ...product, quantity: e.target.value })} />
                        </Col>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label column sm="2">
                            Description
                        </Form.Label>
                        <Col sm="10">
                            <ReactQuill
                                value={product.description}
                                onChange={handledesc}
                                style={{ height: "180px", marginBottom: "45px" }}

                            />
                        </Col>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label column sm="2">
                            Upload Images
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="file" name='product-image' multiple onChange={(e) => setSelected(e.target.files[0])} />
                        </Col>
                    </Form.Group>
                    <Form.Group>
                        <br />
                        <Button onClick={addproduct}>ADD Product</Button>

                    </Form.Group>

                </Form>

            </div>

        </div >
    )
}

export default Addproduct