import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link, useNavigate } from 'react-router-dom';

const UserLogin = () => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const [err, setErr] = useState(false)
    const Navigate = useNavigate()

    const login = async () => {
        if (user.email && user.password) {
            // console.log('login data', user)
            let result = await fetch('http://localhost:5000/user/userlogin', {
                method: "post",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            result = await result.json()
            // console.log('resulvjhjjt', result.result)

            if (result.success) {
                console.log('result', result.result)
                localStorage.setItem('user', JSON.stringify(result.result))
                Navigate('/')
            }
            else {
                alert('Please enter valid details')
                // console.log('result', result.result)
                setErr(true)
                setTimeout(() => {setErr(false)}, 3000);
            }
            // setErr(false)
        } else {
            setErr(true)
            console.log('error')
            setTimeout(() => {setErr(false)}, 3000);
        }

    }
    return (
        <div className='admin-login'>

            <div className='login'>
                <h1 className='text-center'>User Login</h1>
                <br />
                <Form>

                    {err ? <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>

                        </Form.Label>
                        <Col sm={10}>
                            <Form.Label style={{ color: "#ff7d7d" }}>
                                Please provide a valid details.
                            </Form.Label>
                        </Col>
                    </Form.Group> :
                        <></>}
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            Email
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="email" placeholder="Email"
                                value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            Password
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="password" placeholder="Password"
                                value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Form.Check label="Remember me" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Col sm={{ span: 6, offset: 2 }}>
                            <Button onClick={login}>Sign in</Button>

                        </Col>
                        <Col>
                            <Link to='/adminlogin' style={{ color: "white" }}>login as Admin </Link>
                        </Col>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}

export default UserLogin