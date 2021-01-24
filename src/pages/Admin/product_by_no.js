import React, { Component } from 'react'
import { InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap'
import './product_by_no.css'
import Sidebar from './sideBar';
class ProductsByNo extends Component {
  render() {
    return (
      <div className='container text-center contain my-5 shadow p-3 mb-5 bg-white rounded'>
        <Sidebar />
        <h1 className='h1 text-center'>Welcome to the Admin Panel</h1>
        <h3 className='h3 text-center'>Enter Phone no. of seller to check Products</h3>

        <InputGroup className='container input'>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Phone No.+91</InputGroupText>
          </InputGroupAddon>
          <Input placeholder=" Enter Phone number" maxLength='10' />
        </InputGroup>
        <Button color='success text-center mx-5 my-3'>Fetch Products</Button>

      </div>
    )
  }
}
export default ProductsByNo