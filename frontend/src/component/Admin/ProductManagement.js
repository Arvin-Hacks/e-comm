import { Button } from 'bootstrap'
import React, { useEffect, useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { BsDashSquare, BsTrash3 } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
const ProductManagement = () => {
    const [data, setData] = useState([])
    const Navigate=useNavigate()
    useEffect(() => {
        getproduct()
    }, [])
    
    const getproduct = async () => {
        let result = await fetch('http://localhost:5000/')
        result = await result.json()
        if (result.result.length > 0) {
            console.log('manage',result.result)
            setData(result.result)
        }
    }
    const update=(id)=>{
        Navigate(`/dashboard/updateproduct/${id}`)
    }
    return (
        <div className='container'>
            <h1>Product Management</h1>
            <div>
                <div>
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Category</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Operation</th>
                            </tr>
                        </thead>
                        <tbody class="table-group-divider" >
                            {data.length > 0 ? data.map((item) => 
                                <tr>
                                    <th scope="row">1</th>
                                    <td>{item.title}</td>
                                    <td>{item.category}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>
                                        <BiEdit className='tool-icon' onClick={()=>update(item._id)} ></BiEdit> &nbsp;
                                        <BsTrash3 className='tool-icon' ></BsTrash3> &nbsp;
                                        {/* <LiaEdit></LiaEdit> */}
                                    </td>
                                </tr>
                            )
                                :
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>@mdo</td>
                                    <td>@mdo</td>
                                </tr>

                            }


                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}

export default ProductManagement