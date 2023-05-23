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

// currencyFormat function retrieved from https://stackoverflow.com/questions/55556221/how-do-you-format-a-number-to-currency-when-using-react-native-expo

// modified using Number() found: https://stackoverflow.com/questions/55623957/how-to-use-tofixed-method-in-react-jsx
  const currencyFormat = (num) => {
    return '$' + Number(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }

  // 'loaded' function
  const loaded = () => {
    return props.customers.map((customer) => (
      <div key={customer._id} className='customer'>
        <Card.Link href={`/customers/${customer._id}`}>
        <Card text='dark'>
          <Card.Title>{customer.name}</Card.Title>
          <Card.Body>{currencyFormat(customer.phoneNumber)}</Card.Body>
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
        <form onSubmit={handleSubmit}>
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
              placeholder='Amount'
              onChange={handleChange}
            />
            <Button variant='primary' type='submit'>Create Invoice</Button>
          </Form.Group>
        </form>
        {props.customers ? loaded() : loading()}
      </section>
    )
}

export default Index