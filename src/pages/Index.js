import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


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
        <Card.Link href={`/customers/${customer._id}`}>
        <Card text='dark' style={{ width: '50rem' }}>
          <Card.Title>{customer.name}</Card.Title>
          <Card.Body>{customer.phoneNumber}</Card.Body>
        </Card>
        </Card.Link>
      </div>
    ))
  }

  const loading = () => {
    return <h1>Loading...</h1>
  }

  return (
      <section>
          {props.customers ? loaded() : loading()}
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3'>

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
          <Button variant='primary' type='submit'>Create Customer</Button>

          </Form.Group>
        </Form>
      </section>
    )
}

export default Index