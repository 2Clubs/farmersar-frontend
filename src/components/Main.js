import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Index from '../pages/Index'
import Show from '../pages/Show'

const Main = (props) => {
  const [ customers, setCustomers ] = useState(null)

  const URL = 'http://localhost:4000/customers/'

  const getCustomers = async () => {
    const response = await fetch(URL)
    const data = await response.json()
    setCustomers(data)
  }

  const createCustomers = async (customer) => {
    // make post request to create customers
    await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify(customer),
    })
    // update list of customers
    getCustomers()
  }

  const updateCustomers = async (customer, id) => {
    await fetch(URL + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify(customer)
    })
  }

  const deleteCustomers = async id => {
    // make delete request to create customers
    await fetch(URL + id, {
      method: 'DELETE',
    })
    // update list of customers
    getCustomers()
  }

  useEffect(() => {getCustomers()}, [])

  return (
    <main>
      <Routes>
        <Route exact path='/' element={<Index customers={customers} createCustomers={createCustomers}/>} />
        <Route
          path='/customers/:id'
          element = {
            <Show
              customers={customers}
              updateCustomers={updateCustomers}
              deleteCustomers={deleteCustomers}
            />
          }
        />
      </Routes>
    </main>
  )
}

export default Main