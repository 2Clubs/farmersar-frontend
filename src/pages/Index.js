import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Index = (props) => {
  // state to hold formData
  const [ newForm, setNewForm ] = useState({
    name: '',
    phoneNumber: '',
  })

  // handleChange function for form
  const handleChange = (event) => {
    setNewForm({ ...newForm, [event.target.name]: event.target.value })
  }

  // handleSubmit function for form
  const handleSubmit = (event) => {
    event.preventDefault()
    props.createCustomers(newForm)
    setNewForm({
      name: '',
      phoneNumber: '',
    })
  }

  // 'loaded' function
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

  return (
      <section>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={newForm.name}
            name='name'
            placeholder='name'
            onChange={handleChange}
          />
          <input
            type='text'
            value={newForm.phoneNumber}
            name='phoneNumber'
            placeholder='phoneNumber'
            onChange={handleChange}
          />
          <input type='submit' value={'Create Customer'} />
        </form>
        {props.customers ? loaded() : loading()}
      </section>
    )
}

export default Index