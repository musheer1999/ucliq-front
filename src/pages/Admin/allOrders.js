import React, { Component } from 'react'
import { Container } from 'reactstrap'
import axios from 'axios'
import api from "../../resource/values"
import {
  Col,
  Button,
  Label,
  Input,
} from "reactstrap";

import './allOrders.css'
import { Link } from 'react-router-dom';

class allOrders extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      subcat: [],
      orders: [],
      selectedCat: "",
      selectedSubcat: "",
      selectedStatus: ""
    }
  }

  componentDidMount = async () => {
    let orders = await axios.get(api.SERVER_CALL + "/admin/allorders")
    orders = orders.data
    let cats = await axios.post(api.SERVER_CALL + "/products/getallcats")
    cats = cats.data

    this.setState({
      orders: orders
    })

    let cats_ = [{ name: "none" }]
    for (let i = 0; i < cats.length; i++)
      cats_.push(cats[i])

    this.setState({
      categories: cats_
    })

  }

  changeSubcatList = (event) => {
    if (event.target.value === "none") {
      this.setState({ subcat: [] })
      this.setState({ selectedCat: "" })
      return
    }
    const n = event.target.value
    this.setState({ selectedCat: n })
    for (let i = 0; i < this.state.categories.length; i++) {
      if (this.state.categories[i].name === n) {
        this.setState({ subcat: this.state.categories[i].listofcat })
        break
      }
    }
  }

  applyFilters = () => {
  }

  canPlace = (o) => {
    if (this.state.selectedCat !== "" && this.state.selectedCat !== o.category) return false
    if (this.state.selectedSubcat !== "" && this.state.selectedCat !== o.subcategory) return false
    if (this.state.selectedStatus !== "" && this.state.selectedCat !== o.status) return false
    return true
  }

  render() {
    return (
      <div>

        <Container>

          <h1 className='text-center'>All Orders</h1>
          <div style={{ display: "flex" }}>
            <div>
              <Label>
                category
              </Label>
              <Col>
                <Input
                  type="select"
                  onChange={this.changeSubcatList}
                >
                  {
                    this.state.categories.map((c) => (
                      <option value={c.name}>{c.name}</option>
                    ))
                  }
                </Input>
              </Col>
            </div>

            <div>
              <Label>
                category
                  </Label>
              <Col>
                <Input
                  type="select"
                  onChange={event => { this.setState({ selectedSubcat: event.target.value }) }}
                >
                  {
                    this.state.subcat.map((sc) => (
                      <option value={sc.name}>{sc.name}</option>
                    ))
                  }
                </Input>
              </Col>
            </div>
            <div>
              <Label>
                Status
              </Label>
              <Col>
                <Input
                  type="select"
                  onChange={event => { this.setState({ selectedStatus: event.target.value }) }}
                >
                  <option value="order not confirmed yet">order not confirmed yet</option>
                  <option value="ready to pack">ready to pack</option>
                  <option value="ready to hand">ready to hand</option>
                  <option value="dispatch">dispatch</option>
                  <option value="delivered">delivered</option>
                </Input>
              </Col>
            </div>
            <div>
              <Button onClick={this.applyFilters}>Apply</Button>
            </div>
          </div>
          <hr />
          {/* <h2 className='details-category text-center'>FMGC:</h2> */}
          <div className='allorders'>
            <table className='allorders-table '>
              <tr>
                <th>SNo.</th>
                <th>Product Name</th>
                <th>Product Image</th>
                <th>Status</th>
                <th>Category</th>
                <th>Sub-category</th>
                <th>View Details</th>
              </tr>
              {
                this.state.orders.map((o, index) => (
                  this.canPlace(o)
                    ?
                    <tr>
                      <td>{index + 1}</td>
                      <td>{o.productName}</td>
                      <td><img src={o.productImg} alt="" /></td>
                      <td>{o.status}</td>
                      <td>{o.category}</td>
                      <td>{o.subcategory}</td>
                      <td>{o.date}</td>
                      <td><Link to={`/admin/orderDetails/${o._id}`}><button className='order-full-detail btn btn-success'>Click Here</button></Link></td>
                    </tr>
                    : null
                ))
                // :  
                // buyer: "5ee46aa2278b532b27a7d1a9"
                // category: "Grains and Pulses"
                // date: "2020-07-25T11:20:49.463Z"
                // productId: "5ed0128fc9b687791ec69f7e"
                // quantity: 10
                // seller: "5ebeacc3a109a1217b84bd23"
                // status: "order not confirmed yet"
                // subcategory: "Edible Oils and Ghee"
              }


            </table>
          </div>
          {/* <h2 className='text-center'>Food - Staples:</h2> */}

        </Container>
      </div >
    )
  }
}
export default allOrders