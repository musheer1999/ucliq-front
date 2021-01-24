import React, { Component } from 'react'
import {
  Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Alert ,Row,  
} from 'reactstrap';
import axios from "axios";
import Sidebar from './sideBar';
import C from '../../resource/values'
import { split } from 'lodash';
import { Link } from "react-router-dom";
import { FaCheck,FaRegWindowClose,FaExclamationTriangle } from "react-icons/fa";
import { GoX } from "react-icons/go";

class Details extends Component {
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
      productweight: '',
      verified:'',
    id:''

    }
    this.remove = this.remove.bind(this)
    this.verify_product = this.verify_product.bind(this)
    
  }



  createproduct = async (event) => {

    event.preventDefault();
    var a = await axios.post(C.SERVER_CALL + `/admin/updateproduct/${this.state.id}`, {
      qty: this.state.productquanity,
      product_name: this.state.productname,
      category: this.state.brandname,
      subcategory: this.state.brandname,
      price: this.state.productprice,
      gst: 0,
      description: this.state.productdesc,
      discount: 0,
      images: [
      {
      _id: "5f7ebfe73652ea6f69e18284",
      image: "https://ucliq.s3.ap-south-1.amazonaws.com/1602142181817.jpeg"
      },
      {
      _id: "5f7ebfe73652ea6f69e18285",
      image: "https://ucliq.s3.ap-south-1.amazonaws.com/1602142181820.jpeg"
      }
      ],
      verified:true,
      __v: 1
      }).then(()=>{
        window.alert("Do you really wants to update the item ");

        window.location.replace("http://localhost:3000/admin/all");
      });
  
  };





componentWillMount= async()=>{

var b = window.location.href.split("/")
var ID= b[b.length-1];
   
    let a=  await axios.get(C.SERVER_CALL+`/admin/products/`+ ID);

    this.setState({productname:a.data.product_name,
    id:ID,
    brandname:a.data.subcategory,
    productprice:a.data.price,
    productquanity:a.data.qty,
    productweight:a.data.qty,
    productdesc:a.data.description,
    product_image:a.data.images,
    verified:a.data.verified
    })


}


verify_product= async(id,check)=>{
  if(check){
   await axios.post(C.SERVER_CALL + `/admin/updateproduct/${id}`, {
      verified:false,
      })
  }else{
  await  axios.post(C.SERVER_CALL + `/admin/updateproduct/${id}`, {
      verified:true,
      })
  }


  this.setState({ verified:!check});



}


remove= async (id) => {

  var result = window.confirm("Want to delete?");
if (result) {

await axios.delete(C.SERVER_CALL+`/admin/remove/`+ id).then(()=>{


  window.location.replace("http://localhost:3000/admin/all");
});;



 
}

}

  render() {

    return (
      <div className='container shadow p-3 mb-5 bg-white rounded'>
        <Sidebar />
     
        <h3 className='h3 text-center'>The Details of The Product {this.state.productname}  </h3>
        <br/><br/>
        <Row>
<Col><img style={{height:"500px",width:"500px"}} src={this.state.product_image[0]?this.state.product_image[0].image:" "}></img></Col>
    <Col>

 
      <Card body>
          <CardTitle tag="h1">{this.state.productname} {this.state.verified?<FaCheck style={{color:"green"}}></FaCheck>:<FaExclamationTriangle className="text-warning" ></FaExclamationTriangle>} </CardTitle>
          <CardText>
            <Row>
            {this.state.productdesc}</Row>
            <br/><br/>
            <Row><Col><h3>Brandname</h3></Col><Col> : {this.state.productname}</Col></Row>
            <Row><Col><h3>price </h3></Col><Col> : Rs {this.state.productprice}</Col></Row>
            <Row><Col><h3>Quantity </h3></Col><Col> : {this.state.productquanity}</Col></Row>
            <Row><Col><h3>Weight </h3></Col><Col> : {this.state.productweight}</Col></Row>

            </CardText>

         <Row>    <Link to={`/admin/update/${this.state.id}`}><Col><Button color="info" >Update</Button></Col> </Link>
         <Col>
          <Button  color="danger" onClick={()=>this.remove(this.state.id)}>Delete</Button></Col>
          
          <Col>
          <Button  color={this.state.verified?"warning":"success"}  onClick={()=>this.verify_product(this.state.id,this.state.verified)}>{this.state.verified?"Unvarify":"Verify"}</Button></Col>
          
          </Row>
         
        </Card>

      </Col>
</Row>
    
              
 
         
         
      </div>


    )

  }


}
export default Details