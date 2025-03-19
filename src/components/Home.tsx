import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className='flex justify-between'>
        <p className='bg'>Welcome to Expense</p>
        <div>
            Your Profile is incomplete
            <Link to="profile">Complete now</Link>
        </div>
    </div>
  )
}
