import React, {useEffect, useState } from 'react'
import Toast from 'react-bootstrap/Toast';
import io from 'socket.io-client'
const ProductNotification = ({ message, subject,id,onChildcahnge}) => {

    useEffect(()=>{
        const socket=io('http:localhost:5000')
        socket.on('adminmsg',(message)=>{
            console.warn('Admin Message',message)
        })
        return () => {
            // Disconnect from the WebSocket server when the component unmounts
            socket.disconnect();
          };
    },[])


    const [showA, setShowA] = useState(true)
    // console.warn('key',id)
    const sendmail = async () => {
        let data = await fetch('http://localhost:5000/sendemail', {
            method: "post",
            body: JSON.stringify({ title: message }),
            headers: { "Content-Type": "application/json" }
        })
        data = await data.json()
        console.log('mail status', data.result)
        removeNotification()

    }

    const removeNotification=async()=>{
        let data =await fetch(`http://localhost:5000/notify/deletenotification/${id}`,{method:"delete"})
        data=await data.json()
        if(data){
            console.log('remove data',data)
            onChildcahnge()
        }

    }
    return (
        <Toast show={showA} onClose={()=>{removeNotification(),setShowA(false)}} style={{ widows: "auto" }}>
            <Toast.Header>
                <img
                    src="holder.js/20x20?text=%20"
                    className="rounded me-2"
                    alt=""
                />
                <strong className="me-auto">{subject}</strong>
                <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>
                {message}
                <br />
                <button className='btn btn-primary' onClick={() => { sendmail(), setShowA(false) }}>Send a Mail  </button>
            </Toast.Body>

        </Toast>
    )
}

export default ProductNotification
