import React from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
const ProductTools = (props) => {
    console.log('props tools',props)
    return (
        <>
            <Form>
                <Row className="align-items-right" >
                    <Col xs="auto">
                        <Form.Select aria-label="Default select example" >
                            <option style={{ backgroundColor: "#8175c9" }}>Select Category</option>
                            <option value="all">All</option>
                            <option value="Electricals">Electricals</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Groceries">Groceries</option>
                            <option value="Home & Kitchen">Home & Kitchen</option>
                            <option value="Books">Books</option>
                        </Form.Select>

                    </Col>
                    <Col xs="auto">
                        <Form.Select aria-label="Default select example" >
                            <option style={{ backgroundColor: "#8175c9" }}>Filter Price</option>
                            <option value="all">All</option>
                            <option value="0">High to Low</option>
                            <option value="1">Low to High</option>
                        </Form.Select>

                    </Col>
                    <Col xs="auto">

                    </Col>
                    <Col xs="auto">
                        <InputGroup>
                            <Form.Control
                                placeholder="Search..."
                                aria-label="search"
                                aria-describedby="basic-addon1"
                            />
                            <InputGroup.Text style={{backgroundColor:"#483d8b",color:"white"}}>Search</InputGroup.Text>
                        </InputGroup>
                        
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default ProductTools