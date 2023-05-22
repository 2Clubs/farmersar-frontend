import React from 'react'
import { Link } from 'react-router-dom'

const Index = (props) => {

  // loaded function
  const loaded = () => {
    return props.customers.map((customer) => (
      <div key={customer._id} className='customer'>
        <Link to={`/customers/${customer._id}`}>
          <h1>{customer.name}</h1>
          <h2>{customer.phoneNumber}</h2>
        </Link>
      </div>
    ))
  }

  const loading = () => {
    return <h1>Loading...</h1>
  }

  return props.customers ? loaded() : loading()
}

export default Index