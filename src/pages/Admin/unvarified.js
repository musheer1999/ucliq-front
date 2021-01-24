
import Axios from 'axios'
import React, { Component } from 'react'
import axios from "axios";
import {Table,ButtonToggle} from "reactstrap"
import Sidebar from "./sideBar";
import C from '../../resource/values'
import { Link } from "react-router-dom";
import { FaCheck,FaRegWindowClose } from "react-icons/fa";
class Unvarified extends Component {
   
    
    constructor(){
        super()
this.state={

users:[]
}


this.verify_product = this.verify_product.bind(this)
    }

    componentDidMount=async()=>{

    let a = await axios.get(C.SERVER_CALL + `/admin`);

    this.setState({ users: a.data });

}



//to set the icon of verify and not verify button

  
  // to change the verified
  verify_product= async(id,check,name)=>{
console.log(name)
    let confirm = window.confirm("are you sure you want to verify " +name);
if(confirm){

    if(check){
        await axios.post(C.SERVER_CALL + `/admin/updateproduct/${id}`, {
           verified:false,
           })
       }else{
       await  axios.post(C.SERVER_CALL + `/admin/updateproduct/${id}`, {
           verified:true,
           })
       }
     
       let a = await axios.get(C.SERVER_CALL + `/admin`);
     console.log(a.data)
       this.setState({ users: a.data });
     
}
 
  
  
  }
    render(){
       let sr=0
        return(

<div className="container shadow p-3 mb-5 bg-white rounded my-3">
<Sidebar />
<h1 className="text-center my-5">List of Unvarified Product</h1>
<br/><br/>
<Table id='myTable' hover className="table">
            <thead>
              <tr>
                <th>S No.</th>
                <th>Name</th>
                <th>Category</th>
                <th>Seller Name</th>
                <th>Verified</th>
              </tr>
            </thead>
            <tbody>
              
{this.state.users.map((i)=>(
 i.verified?"":<tr>
 <th scope="row">{(sr = sr + 1)}</th>
 <td style={{cursor: "pointer"}} >    <Link to={`/admin/details/${i._id}`}>  {i.product_name}     </Link></td> 
                   <td style={{cursor: "pointer"}} >  <Link to={`/admin/details/${i._id}`}>{i.category}           </Link></td> 
                   <td style={{cursor: "pointer"}}>   <Link to={`/admin/details/${i._id}`}>{i.seller_name}        </Link></td>
  
                   <td>
                  <ButtonToggle color="success" onClick={()=>this.verify_product(i._id,i.verified,i.product_name)}   >Verify
                   </ButtonToggle>
                  </td>
   </tr>


))}

            </tbody>
            </Table>

</div>
        )



    }
}

export default Unvarified

