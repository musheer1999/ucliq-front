import React, { Component } from "react";
import { Table,Button, ButtonToggle ,Alert,Tooltip} from "reactstrap";
import Sidebar from "./sideBar";
import { Link } from "react-router-dom";
import axios from "axios";
import C from "../../resource/values"
// import Alert from "./alert"
import { FaCheck,FaRegWindowClose } from "react-icons/fa";
class UpdateProduct extends Component {
  constructor() {
    super();
    this.state = {
      model_open:false,
      name: ["abc", "xyz"],
      id: "",
      lastname: ["abc", "xyz"],
      users: [],
    };
    this.remove = this.remove.bind(this)
    this.searchFun = this.searchFun.bind(this)
    this.veri = this.veri.bind(this)
    this.verify_product = this.verify_product.bind(this)


  }

  componentDidMount = async () => {
    let a = await axios.get(C.SERVER_CALL + `/admin`);

    this.setState({ users: a.data });

  };

  //delete the user
  remove= async (id) => {

    var result = window.confirm("Want to delete?");
if (result) {

  await axios.delete(C.SERVER_CALL+`/admin/remove/`+ id);

   let a = await axios.get(C.SERVER_CALL + `/admin`);

   this.setState({ users: a.data });

   document.getElementById('alert').style.display='';

   setTimeout(function(){   document.getElementById('alert').style.display='none'; }, 3000);
}
 
}

//function for search bar
searchFun=()=>{

  let filter = document.getElementById("myInput").value.toUpperCase();
  
  let myTable = document.getElementById('myTable')

  let tr = myTable.getElementsByTagName('tr')

          for(let i=0;i<tr.length;i++){
              let td = tr[i].getElementsByTagName('td')[0];
              console.log(td)
if(td){
               let value = td.innerHTML.toUpperCase()
               if(value.indexOf(filter)>-1){
                   tr[i].style.display=""
               }else{
                  tr[i].style.display="none"
               }
            
                
}
          }
}

//to set the icon of verify and not verify button
veri(is_veri){

  if(is_veri){
   
    return <FaCheck></FaCheck>
  }else{
    return <FaRegWindowClose></FaRegWindowClose>
  }
}

// to change the verified
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

  let a = await axios.get(C.SERVER_CALL + `/admin`);
console.log(a.data)
  this.setState({ users: a.data });



}
details(){
  console.log("detailes")
}


  render() {
    var sr = 0;

    return (
      <div className="container shadow p-3 mb-5 bg-white rounded my-3">
    
        <Sidebar />
        <input type="text" id="myInput" placeholder="search your item.." onChange={this.searchFun}/>
        <h1 className="text-center my-4">Welcome to the Admin Panel</h1>
        <Alert id="alert"  style={{display:'none'}} color="danger">
       The Item is Deleted !!
      </Alert>
        <h3 className="h3 text-center my-3">
         Update the product
        </h3>
       
        <div className="container">
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
              {this.state.users.map((i) => (
                <tr >
                  <th scope="row">{(sr = sr + 1)}</th>
                 <td style={{cursor: "pointer"}} >    <Link to={`/admin/details/${i._id}`}>  {i.product_name}     </Link></td> 
                   <td style={{cursor: "pointer"}} >  <Link to={`/admin/details/${i._id}`}>{i.category}           </Link></td> 
                   <td style={{cursor: "pointer"}}>   <Link to={`/admin/details/${i._id}`}>{i.seller_name}        </Link></td>
                  <td>
                  <ButtonToggle color={i.verified?"success":"danger"} onClick={()=>this.verify_product(i._id,i.verified)}   >{this.veri(i.verified)}
                   </ButtonToggle>
                  </td>
                  <td>
                    <Link to={`/admin/update/${i._id}`}>
                      <button className="btn btn-primary">
                        Update
                      </button>
                    </Link>
                  </td>
                  <td>
              
 
                      <ButtonToggle color="danger" onClick={()=>this.remove(i._id)}>Delete</ButtonToggle>
        
                  </td>
               
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}
export default UpdateProduct;
