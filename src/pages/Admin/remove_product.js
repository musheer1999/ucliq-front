import React, { Component } from 'react'
import {
    Button, Form, FormGroup, Label, Input, Card, CardImg, CardText, CardBody,
    CardSubtitle
} from 'reactstrap';
import Sidebar from './sideBar';
import './remove_product.css'
import Axios from 'axios';
import C from '../../resource/values'
class Remove_product extends Component {
    constructor() {
        super();
        this.state = {
            isshowing: false,
            productid:''

        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.remove = this.remove.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState(
            {
                isshowing: true
            }
        )

    }
    handleChange(event) {
        const { name, value } = event.target
        this.setState(
            {
                [name]: value
            }
        )
    }
    remove(){
        console.log(this.state.productid);
        Axios.delete(C.SERVER_CALL+`/admin/remove/`+ this.state.productid);
    }
    render() {
        return (
            <div className='container remove_prod'>


                <div className="container contain shadow p-3 mb-5 bg-white rounded">
                    <Sidebar />
                    <h1 className='text-center my-4'>Welcome to the Admin Panel</h1>
                    <h3 className='text-center'>You can remove Product by entering Following Information</h3>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0 my-3 mx-3"  >
                            {/* <Label className="mr-sm-2">Product Name</Label>
                            <Input type="text" name="productname" placeholder="Enter Product name" onChange={this.handleChange} required />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0 my-3 mx-3"  >
                            <Label className="mr-sm-2">Brand Name</Label>
                            <Input type="text" name="brandname" placeholder="Enter Brand Name" onChange={this.handleChange} required />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0 my-3 mx-3"  >
                            <Label className="mr-sm-2">Product Weight</Label>
                            <Input type="text" name="productweight" placeholder="Enter Product Weight" onChange={this.handleChange} required />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0 my-3 mx-3"  > */}
                            <Label className="mr-sm-2">Product ID</Label>
                            <Input type="text" name="productid" placeholder="Enter Product ID" onChange={this.handleChange} required />
                        </FormGroup>
                        <Button className='my-3 mx-3 btn btn-secondary btn-lg btn-block'>Fetch Product</Button>
                        <h3 className='text-center'>
                            Fetched Product is:
                    </h3>
                        {this.state.isshowing ? <div >

                            <div className='container remove_prod'>
                                <Card disabled={this.state.isshowing}>
                                    <CardImg top width="100%" src={this.state.product_image} alt="Product image" />
                                    <CardBody>
                                        {/* <CardSubtitle><b>ProductName:</b>{this.state.productname}</CardSubtitle>

                                        <CardSubtitle><b>BrandName</b>:{this.state.brandname}</CardSubtitle>
                                        <CardSubtitle><b>ProductWeight:</b>{this.state.productweight}</CardSubtitle>
                                        <CardSubtitle><b>ProductQuantity:</b>{this.state.productquanity}</CardSubtitle>
                                        <CardText><b>ProductPrice:</b>{this.state.productprice}</CardText> */}
                                        <CardText><b>ProductID:</b>{this.state.productid}</CardText>
                                        <Button color='danger' onClick={this.remove}>Remove Product</Button>
                                    </CardBody>
                                </Card>
                            </div>
                        </div> : null}
                    </Form>
                </div>



            </div>);


    }
}
export default Remove_product   