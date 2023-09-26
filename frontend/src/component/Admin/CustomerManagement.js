import React from 'react'

const CustomerManagement = () => {
    return (
        <div className=''>
            <h1>CustomerManagement</h1>
            <div>
                <div>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Operation</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                        <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
                            </tr>
                           
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}

export default CustomerManagement