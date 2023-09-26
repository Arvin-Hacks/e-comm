import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className='_404page'>
        {/* <h1>Page not found</h1> */}

        <Link to='/' className='btn btn-primary' style={{top:'80%',right:"30%",position:"absolute"}}>Go To Home</Link>
    </div>
  )
}

export default PageNotFound