import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Show = (props) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const customers = props.customers
  const customer = customers ? customers.find( (p) => p._id === id ) : null

  // state for form
  const [ editForm, setEditForm ] = useState(customer)
  // const [ isEditing, setIsEditing ] = useState(false)

  // handleChange function
  const handleChange = (event) => {
    setEditForm({
      ...editForm,
      [event.target.name]: event.target.value
    })
  }

  // handleSubmit function
  const handleUpdate = (event) => {
    event.preventDefault()
    props.updateCustomers(editForm, customer._id)
  }

  const loaded = () => {
    return (
      <>
        <h1>{customer.name}</h1>
        <h2>{customer.phoneNumber}</h2>
      </>
    )
  }

  const loading = () => {
    return <h1>Loading...</h1>
  }

  return (
    <div className='customer'>
      { customer ? loaded() : loading() }

      {/* { isEditing && */}
        <form onSubmit={handleUpdate}>
          <input
            type='text'
            value={editForm.name}
            name='name'
            placeholder='name'
            onChange={handleChange}
          />
          <input
            type='text'
            value={editForm.phoneNumber}
            name='phoneNumber'
            placeholder='phoneNumber'
            onChange={handleChange}
          />
          <input type='submit' value={'Update Customer'} />
        </form>
      {/* } */}
    </div>
  )
}

export default Show