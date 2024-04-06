import React, { useEffect, useState } from 'react'


const DashboardDetail = () => {

  const [state,setState]=useState({})

  const getAllStats = async () => {
    let data = await fetch('http://localhost:5000/getallstate')
    data = await data.json()
    console.log('dsdjkfjskkjg',data)
    if (data?.success) {
      setState(data.result)
    }
  }

  useEffect(() => {
    getAllStats()

  }, [])
  


  return (
    <div className=''>
      <h1>Dashboard Details</h1>
      <div className="book-state ">
        <div className="card-1">
          <h3>Total Products    </h3>
          <h4>{state?.productCount ?? "NA"}</h4>
        </div>
        <div className="card-1">
          <h3>Total Users      </h3>
          <h4>{state?.UsertCount ?? "NA"}</h4>
        </div>
        <div className="card-1">
          <h3>Cart Products       </h3>
          <h4>{state?.CartCount ?? "NA"}</h4>
        </div>

      </div>
    </div>
  )
}

export default DashboardDetail