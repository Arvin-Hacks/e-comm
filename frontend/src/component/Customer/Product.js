import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { additem } from '../../redux/cartSlice'
import Card from 'react-bootstrap/Card';
import { IoBagCheckOutline } from 'react-icons/io5'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ReactPaginate from 'react-paginate'
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

const Product = () => {
    let user = JSON.parse(localStorage.getItem('user'))
    let u_id = user ? user._id : ''

    const [data, setData] = useState([])
    const [CartId, setCartid] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 8;
    const pageCount = Math.ceil(data.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const currentData = data.slice(offset, offset + itemsPerPage);
    // const startIndex = currentPage * itemsPerPage + 1;
    const dispatch = useDispatch()
    const Navigate = useNavigate()

    useEffect(() => {
        getproduct()
        getCartId()
    }, [])

    // Get Cart deatils to show dynamic add to cart button
    const getCartId = async () => {
        let result = await fetch(`http://localhost:5000/cart/getcartproducts/${u_id}`)
        result = await result.json()
        if (result.success) {
            dispatch(additem(result.result))
            setCartid(result.result.map((item) => item.product_id))
            getproduct()
        }
    }
    // Get All Products
    const getproduct = async () => {
        let data = await fetch('http://localhost:5000/product/getproducts')
        data = await data.json()
        if (data.result.length > 0) {
            setData(data.result)
        }
    }
    // Add Product to cart
    const addtocart = async (p_id) => {
        let result = await fetch(`http://localhost:5000/cart/addtocart/${p_id}/${u_id}`, { method: "post" })
        result = await result.json()
        if (result.success) {
            getproduct()
            getCartId()
        } else {
            alert('error')
        }
    }

    const filterproduct = async (filter, key) => {
        if (key !== '') {
            let data = await fetch(`http://localhost:5000/product/filterproduct/${filter}/${key}`)
            data = await data.json()
            if (data.success) {
                setData(data.result)
                console.warn('filter data', data.result)
            } else {
                console.warn("warn...", data)
            }
        } else {
            getproduct()
        }
    }
    // Get Product Details
    const productdetail = (id) => {
        Navigate(`/productdetail/${id}`)
    }
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected)
    }
    return (
        <div style={{ marginTop: "60px" }}>
            <div className='product-tools' >
                {/* <ProductTools obj={getproduct}/> */}
                <Form>
                    <Row className="align-items-right" >
                        <Col xs="auto">
                            <Form.Select aria-label="Default select example" onChange={(e) => filterproduct('category', e.target.value)}>
                                <option style={{ backgroundColor: "#8175c9" }}>Select Category</option>
                                <option value="">All</option>
                                <option value="Electricals">Electricals</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Groceries">Groceries</option>
                                <option value="Home & Kitchen">Home & Kitchen</option>
                                <option value="Books">Books</option>
                            </Form.Select>

                        </Col>
                        <Col xs="auto">
                            <Form.Select aria-label="Default select example" onChange={(e) => filterproduct('price', e.target.value)}>
                                <option style={{ backgroundColor: "#8175c9" }}>Filter Price</option>
                                <option value="">All</option>
                                <option value="1">High to Low</option>
                                <option value="-1">Low to High</option>
                            </Form.Select>

                        </Col>
                        <Col xs="auto">

                        </Col>
                        <Col xs="auto">
                            <InputGroup style={{ zIndex: "-1" }}>
                                <Form.Control
                                    placeholder="Search..."
                                    aria-label="search"
                                    aria-describedby="basic-addon1"
                                    onChange={(e) => filterproduct('search', e.target.value)}
                                />
                                <InputGroup.Text style={{ backgroundColor: "#483d8b", color: "white" }}>Search</InputGroup.Text>
                            </InputGroup>

                        </Col>
                    </Row>
                </Form>
            </div>
            <div className='product'>
                {currentData.length > 0 ? currentData.map((item) =>
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
                                    <button className='btn-cart2' onClick={() => Navigate('/cart')}><IoBagCheckOutline size={20} /> CHECKOUT</button>
                                    :
                                    <button onClick={() => addtocart(item._id)} className='btn-cart1'>ADD TO CART</button>
                                }


                            </Card.Body>
                        </Card>
                    </div>

                )
                    :
                    <>
                        <div className='p_card'>
                            <Card style={{ padding: '20px' }} >
                                <Card.Img variant="top" src={''} width={277} height={193} />
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Text>
                                        bulk of the card's content.
                                    </Card.Text>
                                    <Card.Text>Price: $399</Card.Text>

                                </Card.Body>
                                <Card.Body>
                                    <button>Add to Cart</button>
                                </Card.Body>
                            </Card>
                        </div>
                    </>
                }
                




            </div>
            <div>
                    <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        breakLabel={'...'}
                        // breakClassName={'break-me'}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageChange}
                        containerClassName={'container'}
                        previousLinkClassName={'page'}
                        breakClassName={'page'}
                        nextLinkClassName={'page'}
                        pageClassName={'page'}
                        activeClassName={'active'}
                    />
                </div>
        </div>
    )
}

export default Product