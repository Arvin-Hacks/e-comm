import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [admin, setAdmin] = useState({
        email: '',
        password: ''
    })
    const [err, setErr] = useState(admin ? false : true)
    const Navigate=useNavigate()

    const login = async () => {
        if (admin.email && admin.password) {
            // console.log('login data', admin)
            let result = await fetch('http://localhost:5000/adminlogin', {
                method: "post",
                body: JSON.stringify(admin),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            result = await result.json()
            if (result.success) {
                console.log('result', result.result)
                localStorage.setItem('admin',JSON.stringify(result.result))
                localStorage.removeItem('user')
                Navigate('/dashboard')
            }
            else { 
                console.log('result', result.result)
                setErr(true)
             }
            // setErr(false)
        } else {
            setErr(true)
            console.log('error')
        }

    }
    return (
        <div className='admin-login'>

            <div className='login'>
                <h1 className='text-center'>Admin Login</h1>
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
                                value={admin.email} onChange={(e) => setAdmin({ ...admin, email: e.target.value })} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            Password
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="password" placeholder="Password"
                                value={admin.password} onChange={(e) => setAdmin({ ...admin, password: e.target.value })} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Form.Check label="Remember me" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Button onClick={login}>Sign in</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}

export default AdminLogin