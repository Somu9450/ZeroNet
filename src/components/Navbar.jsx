import React from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar() {

  const navigate = useNavigate();
  return (
    <div className='w-full flex gap-5 p-2'>

      <button onClick={() => {navigate('/login')}} className='bg-blue-200 p-1 rounded-xl cursor-pointer'>Login</button>
      <button onClick={() => {navigate('/register')}} className='bg-blue-200 p-1 rounded-xl cursor-pointer'>Register</button>
    </div>
  )
}

export default Navbar