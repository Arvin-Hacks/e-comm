import React, { useEffect, useState } from 'react'

const CustomerManagement = () => {

    useEffect(() => {
        getuserList()
    }, [])
    const [user, setUser] = useState([])

    const getuserList = async () => {
        let data = await fetch("http://localhost:5000/user/getallusers")
        data = await data.json()
        console.log('user...', data)
        if (data.success) {
            setUser(data.result)
        }
        else {
            console.log('fatal error')
        }
    }

    return (
        <div className=''>
            <h1>CustomerManagement</h1>
            <div>
                <div>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr >
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Operations</th>
                                {/* <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Operation</th> */}
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {
                                user.length > 0 ? user.map((item, index) => (
                                    <tr key={index + 1}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>
                                        <button className='btn btn-primary '>Update</button>&nbsp;
                                        <button className='btn btn-primary'>Delete</button>
                                            </td>
                                        {/* <td>@mdo</td>
                                    <td>@mdo</td> */}
                                    </tr>
                                ))
                                    :
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>No User Found</td>
                                        {/* <td>Otto</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
                                <td>@mdo</td> */}
                                    </tr>
                            }



                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}

export default CustomerManagement