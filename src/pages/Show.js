import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const Show = (props) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const customers = props.customers
  const customer = customers ? customers.find( (p) => p._id === id ) : null

  // state for form
  const [ editForm, setEditForm ] = useState(customer)
  const [ isEditing, setIsEditing ] = useState(false)

  useEffect( () => {
    if (customer) {
      setEditForm(customer)
    }
  }, [customer])

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

  // handleEdit function
  const handleEdit = () => {
    // sets the value of isEditing to its opposite when function is called
    setIsEditing(prevState => !prevState)
  }

  // handleDelete function
  const handleDelete = () => {
    props.deleteCustomers(customer._id)
    navigate('/') // returns to root
  }

// currencyFormat function retrieved from https://stackoverflow.com/questions/55556221/how-do-you-format-a-number-to-currency-when-using-react-native-expo

// modified using Number() found: https://stackoverflow.com/questions/55623957/how-to-use-tofixed-method-in-react-jsx
  const currencyFormat = (num) => {
    return '$' + Number(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }

  const loaded = () => {
    return (
      <Card>
        <Card.Body>
          <Card.Title>{customer.name}</Card.Title>
          <Card.Text>{currencyFormat(customer.phoneNumber)}</Card.Text>
          <Button variant="primary" onClick={handleEdit}>{ isEditing ? 'Cancel' : 'Edit' }</Button>{ ' ' }
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Card.Body>
      </Card>
    )
  }

  const loading = () => {
    return <h1>Loading...</h1>
  }

  return (
    <div className='customer'>
      { customer ? loaded() : loading() }

      { isEditing &&
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
            placeholder='Amount'
            onChange={handleChange}
          />
          <input type='submit' value='Update Customer' />
        </form>
      }
    </div>
  )
}

export default Show