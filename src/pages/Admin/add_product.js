import React, { Component } from 'react'
import {
  Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';

import axios from "axios";
import Sidebar from './sideBar';
import C from '../../resource/values'

class Add_product extends Component {
  constructor() {
    super();
    this.state = {
      isShowing: false,
      productname: '',
      brandname: '',
      productprice: '',
      productdesc: '',
      product_image: [],
      productquanity: '',
      productweight: ''


    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handle_image = this.handle_image.bind(this)

  }

  createproduct = async (event) => {

    event.preventDefault();
    var a = await axios.post(C.SERVER_CALL + `/admin/addproduct`, {
      qty: this.state.productquanity,
      product_name: this.state.productname,
      category: this.state.brandname,
      subcategory: this.state.brandname,
      price: this.state.productprice,
      gst: 0,
      description: this.state.productdesc,
      discount: 0,
      images: this.state.product_image,
      __v: 1
      }).then(()=>{
        window.alert("Do you really wants to add the item ");

        window.location.replace("http://localhost:3000/admin/verify");
      });
  
  };

  handleSubmit(event) {
    event.preventDefault()
    this.setState(
      {
        isShowing: true
      }
    )

  }


//image upload to the aws server

  handle_image(event){
    const data = new FormData();
    
    for(let i=0;i<event.target.files.length;i++){
      data.append( '', event.target.files[i], event.target.files[i].name );
    }
 
 
    axios.post("http://localhost:5000/api/upload/upload/",data).then((data)=>{
   
     let img_url=[]
      for(let j=0;j<data.data.length;j++){
        img_url.push({image: data.data[j]})
      } 
    
      this.setState({
        product_image: img_url
      })


 document.getElementById("gen_bt").disabled = false
      


    })



  }
  handleChange(event) {

    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  componentDidMount(){
    document.getElementById("gen_bt").disabled = true;
  }
  render() {
    return (
      <div className='container shadow p-3 mb-5 bg-white rounded'>
        <Sidebar />
        <h1 className='text-center my-4'>Welcome to the Admin Panel</h1>
        <h3 className='h3 text-center'>You can Add new Product By Entering Following details </h3>

        <Form onSubmit={this.handleSubmit} >

       <FormGroup row>
            <Label for="exampleEmail" sm={2}>Product Name</Label>
            <Col sm={10}>
              <Input type="text" name="productname" id="exampleEmail" placeholder="Enter Product Name" onChange={this.handleChange} required />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="examplePassword" sm={2}>BrandName</Label>
            <Col sm={10}>
              <Input type="text" name="brandname" id="examplePassword" placeholder="Enter Brand Name" onChange={this.handleChange} required />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="examplePassword" sm={2}>Product Price</Label>
            <Col sm={10}>
              <Input type="number" name="productprice" id="examplePassword" placeholder="Enter Product Price" onChange={this.handleChange} required />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="examplePassword" sm={2}>Product Weight</Label>
            <Col sm={10}>
              <Input type="text" name="productweight" id="examplePassword" placeholder="Enter Product Weight" onChange={this.handleChange} required />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="examplePassword" sm={2}>Product Quantity</Label>
            <Col sm={10}>
              <Input type="number" name="productquanity" id="examplePassword" placeholder="Enter Product Quantity" onChange={this.handleChange} required />
            </Col>
          </FormGroup>


          <FormGroup row>
            <Label for="exampleText" sm={2}>Product Descriptions</Label>
            <Col sm={10}>
              <Input type="textarea" name="productdesc" id="exampleText" placeholder="Enter Product Descriptions" onChange={this.handleChange} required />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleFile" sm={2}>Product Image</Label>
            <Col sm={10}>
              <Input type="file" name="product_image" id="exampleFile" onChange={this.handle_image}  multiple  required />
         
              <FormText color="muted">
                This is some placeholder block-level help text for the above input.
                It's a bit lighter and easily wraps to a new line.
                      </FormText>
            </Col>
          </FormGroup>



          <FormGroup check row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button id="gen_bt" color="success" >Generate Product</Button>
            </Col>
          </FormGroup>
          {this.state.isShowing ? <div >
            <h3 className='text-center'>
              Created Product is:
                    </h3>

            <div className='container to_be_removed'>
              <Card disabled={this.state.isshowing}>
                <CardImg top width="100%" src={this.state.product_image[0].image} alt="Product image" />
                <CardBody>
                  <CardTitle><b>ProductName:</b>{this.state.productname}</CardTitle>

                  <CardSubtitle><b>BrandName</b>:{this.state.brandname}</CardSubtitle>
                  <CardSubtitle><b>ProductWeight:</b>{this.state.productweight}</CardSubtitle>
                  <CardSubtitle><b>ProductQuantity:</b>{this.state.productquanity}</CardSubtitle>
                  <CardText><b>ProductPrice:</b>{this.state.productprice}</CardText>
                  <CardText><b>ProductDescription:</b>{this.state.productdesc}</CardText>
                  <Button color='success' onClick={this.createproduct}>Create Product</Button>
                </CardBody>
              </Card>
            </div>
          </div> : null}
        </Form>
      </div>


    )

  }

}

export default Add_product