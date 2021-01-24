// import React, { Component } from "react";
// import { Container } from "reactstrap";
// import NavSection from "../components/organisms/nav-section";
// import "./replaceOrder.css";
// class replaceOrder extends Component {
//     constructor(props) {
//         super(props)
    
//         this.state = {
//              option:'',
//              isOther:false
//         }
//     }

//     handlechange = (e)=>{
//         const {name,value} = e.target
//         this.setState({
//             [name]:value,
//             isOther:false
//         })
//         if(e.target.value=='others'){
//             this.setState({
//                 isOther:true
//             })
//         }
//     }

//   render() {
//     return (
//       <div>
//         <NavSection />
//         <Container>
//           <h1>REPLACE SERVICE</h1>
//           <hr />
//           <div className="buyerorders-div">
//             <img
//               src="https://cdn.zeebiz.com/sites/default/files/styles/zeebiz_850x478/public/2017/06/11/20180-britannia3co-web.jpg?itok=qPz4i3PF"
//               className="buyer-image"
//             />
//             <div>
//               <p className="buyerorder-productname">
//                 <h3></h3>
//                 <b>LOREM IPSUM LOREM IPSUM LOREM IPSUM</b>
//               </p>
//               <p className="buyerorder-sold">
//                 <b>Sold By:LOREM IPSUM</b>
//               </p>
//               <div className="buyerorder-basicdetials">
//                 <p>
//                   <b>Price:1200</b>
//                 </p>
//                 <p>
//                   <b>Qty:40</b>
//                 </p>
//                 <p>
//                   <b>Mode of Payment:COD</b>
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div>
//               <h5>Reason for Replacement:<span style={{color:"red"}}>*</span></h5>
//               <select  onChange={this.handlechange} className='replacement-select' required>
//                   <option  className='replacement-option'>SELECT REPLACEMENT REASON</option>
//                   <option className='replacement-option'>LOREM IPSUM</option>
//                   <option className='replacement-option'>LOREM IPSUM</option>
//                   <option className='replacement-option'>LOREM IPSUM</option>
//                   <option className='replacement-option'>LOREM IPSUM</option>
//                   <option className='replacement-option'>LOREM IPSUM</option>
//                   <option className='replacement-option'>LOREM IPSUM</option>
//                   <option className='replacement-option'>LOREM IPSUM</option>
//                   <option className='replacement-option'>LOREM IPSUM</option>
//                   <option className='replacement-option'>LOREM IPSUM</option>
//                   <option value="others" className='replacement-option'>OTHERS..</option>
//               </select>
//               <br/>
//               {
//                   this.state.isOther?<input placeholder='please state the reason here...' className='reason-input-div'/>:null
//               }
//           </div>
//           <hr />
//         </Container>
//       </div>
//     );
//   }
// }

// export default replaceOrder;
