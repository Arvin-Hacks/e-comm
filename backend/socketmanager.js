const io =require('./websocket')

const sendAdminmessage=(message)=>{
    io.on('connection',(socket)=>{
        console.log('admin connected')

        socket.emit('adminmsg',message)
    })
}

module.exports={sendAdminmessage}