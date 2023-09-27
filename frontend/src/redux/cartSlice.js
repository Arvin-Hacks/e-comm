// import { useEffect, useState } from 'react'
const { createSlice } = require('@reduxjs/toolkit')


// let user = JSON.parse(localStorage.getItem('user'))
// let u_id = user ? user._id : null


// const getcartproduct = async () => {
//     let a = []
//     console.log('a',a)
//     if (u_id) {
//         // let cart = []
//         let data = await fetch(`http://localhost:5000/getcartproduct/${u_id}`)
//         data = await data.json()
//         if (data.result.length > 0) {
//             a = data.result
//             console.log('cart', data.result)
//         }
//     }
//     console.log('return cart', a)
//     return a
//     // console.log(data.result)

// }
// let a
// try {
//     let b =getcartproduct().then(r=>{
//         b=r
//     })
//     a=b
// } catch (error) {
    
// }
// console.log('test',a)
// cart= getcartproduct()
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: []
    },
    reducers: {
        additem: (state, action) => {
            state.items = action.payload
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