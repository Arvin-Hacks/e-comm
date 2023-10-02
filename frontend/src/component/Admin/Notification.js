import React, { useState } from 'react'
import Toast from 'react-bootstrap/Toast';

const ProductNotification = ({ productName, productQuantiy }) => {
    const [showA, setShowA] = useState(true)
    // console.log('props',productName)

    const sendmail = async () => {
        let data = await fetch('http://localhost:5000/sendemail', {
            method: "post",
            body: JSON.stringify({ title: productName, quantity: productQuantiy }),
            headers: { "Content-Type": "application/json" }
        })
        data = await data.json()
        console.log('mail status', data.result)
    }
    return (
        <Toast show={showA} onClose={() => setShowA(false)} style={{ widows: "auto" }}>
            <Toast.Header>
                <img
                    src="holder.js/20x20?text=%20"
                    className="rounded me-2"
                    alt=""
                />
                <strong className="me-auto">Bootstrap</strong>
                <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>
                {`The quantity of ${productName} is below the threshold. Current Quantity: ${productQuantiy}`}
                <br />
                <button className='btn btn-primary' onClick={() => { setShowA(false), sendmail() }}>Send a Mail  </button>
            </Toast.Body>

        </Toast>
    )
}

export default ProductNotification
