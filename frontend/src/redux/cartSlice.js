import { useEffect, useState } from 'react'
const { createSlice, nanoid } = require('@reduxjs/toolkit')


// const [cartdata,setCartdata]=useState([])

// let user = JSON.parse(localStorage.getItem('user'))
// let u_id = user._id
// useEffect(() => {
//     getcartproduct()
// })


// const getcartproduct = async () => {
//     let data = await fetch(`http://localhost:5000/getcartproduct/${u_id}`)
//     data = await data.json()
//     if (data.result.length > 0) {
//         setCartdata(data.result)
//         console.log('cart store data', data.result)
//     } else {
//         console.log(data.result)

//     }
// }
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: []
    },
    reducers: {
        additem: (state, action) => {
            state.items=action.payload
        },
        removeitem: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload.id)
        },
        increment: (state, action) => {
            // state.value += 1;

        }, decrement: (state, action) => {
            // state.value -= 1;
        }

    }
})

export const { increment, decrement, additem, removeitem } = cartSlice.actions
export default cartSlice.reducer