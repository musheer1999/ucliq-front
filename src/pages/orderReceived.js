import React, { Component } from 'react'
import NavSection from "../components/organisms/nav-section";
import './orderReceived.css'
import { Container, Spinner } from 'reactstrap'
import axios from "axios"
import C from "../resource/values"

class orderReceived extends Component {
    constructor() {
        super();
        this.state = {
            anyorder: false,
            orders: [],
            count: 0,
            loading: false
        }
    }

    componentDidMount = async () => {
        let orders = await axios.get(C.SERVER_CALL + '/cart/order/recieved')
        orders = orders.data
        this.setState({
            anyorder: (orders.length > 0) ? true : false,
            orders: orders,
            count: orders.length
        })
    }

    changeStatus = async (id, status) => {
        this.setState({ loading: true })
        let st
        if (status === "order not confirmed yet") {
            st = "ready to pack"
        }
        else
            if (status === "ready to pack") {
                st = "ready to hand"
            }
            else
                if (status === "ready to hand") {
                    st = "dispatch"
                }

        let setStatus = await axios.post(C.SERVER_CALL + `/seller/seller/status/${id}`, {
            status: st
        })
        if (setStatus) {

            let orderList = this.state.orders
            for (let i = 0; i < orderList.length; i++) {
                if (orderList[i]._id === id) {
                    if (status === "order not confirmed yet") {
                        orderList[i].status = "ready to pack"
                    }
                    else
                        if (status === "ready to pack") {
                            orderList[i].status = "ready to hand"
                        }
                        else
                            if (status === "ready to hand") {
                                orderList[i].status = "order complete"
                            }
                            else
                                if (status === "Order Cancelled") {
                                    orderList[i].status = "Order Cancelled"
                                }
                    break
                }
            }
            this.setState({ orders: orderList })
            this.setState({ loading: false })

            return
        }
        alert("please try again later")
    }

    render() {
        return (
            <div>
                <NavSection />

                <Container>
                    {
                        this.state.loading
                            ? <div className="loader-sell">
                                <Spinner
                                    className="loader"
                                    animation="border"
                                    role="status"
                                    variant="light"
                                />
                                <div className="loader-content">
                                    Updating ....
                                </div>
                            </div>
                            : <></>
                    }
                    <div className='received '>
                        <h1 className='received-heading text-center'>Orders Received</h1>
                        <hr />
                        {
                            this.state.anyorder
                                ?
                                <>
                                    {
                                        this.state.orders.map((o) => (
                                            <>
                                                <div className='received-subdiv'>
                                                    <img src={o.productImg} alt='' className='received-image' />
                                                    <div className='received-content-div'>
                                                        <p className='order-received-name'><b>{o.productName}</b></p>
                                                        <div className='received-content-details'>
                                                            <p style={{ marginRight: '5px', padding: '0.09em' }} className='received-contentp'><b>#34343434</b></p>
                                                            <p style={{ marginRight: '5px', padding: '0.09em' }} className='received-contentp' ><b>Price:</b>{o.totalPrice}</p>
                                                            <p style={{ padding: '0.09em' }}><b>Qty:</b>{o.quantity}</p>
                                                        </div>
                                                        <div className='received-content-shipping'>
                                                            <p style={{ marginRight: '5px', borderRight: '1px solid gray', padding: '0.09em' }}><b>Buyer Name:</b>{o.buyerName}</p>
                                                            <p style={{ padding: '0.09em' }}><b>Mode Of payment</b> : {o.modeOfPayment}</p>
                                                            {
                                                                o.status === "order not confirmed yet"
                                                                    ?
                                                                    <>
                                                                        <button className='recieved-order-confirm btn btn-danger mx-5' onClick={() => {
                                                                            this.changeStatus(o._id, o.status)
                                                                        }}>Confirm order</button>
                                                                        <button className='received-order-cancel mx-3'><b>Cancel Order</b></button>

                                                                    </>
                                                                    : <></>
                                                            }
                                                            {
                                                                o.status === "ready to pack"
                                                                    ?
                                                                    <>
                                                                        <button className='recieved-order-confirm btn btn-warning mx-5' onClick={() => {
                                                                            this.changeStatus(o._id, o.status)
                                                                        }}>Ready To Pack</button>
                                                                        <button className='received-order-cancel mx-3'><b>Cancel Order</b></button>

                                                                    </>
                                                                    : <></>
                                                            }
                                                            {
                                                                o.status === "ready to hand"
                                                                    ?
                                                                    <>
                                                                        <button className='recieved-order-confirm btn btn-success mx-3' onClick={() => {
                                                                            this.changeStatus(o._id, o.status)
                                                                        }}>Ready To Hand</button>
                                                                        <button className='received-order-cancel mx-3'><b>Cancel Order</b></button>

                                                                    </>
                                                                    :
                                                                    <>
                                                                    </>
                                                            }

                                                            {
                                                                o.status === "Order Cancelled"
                                                                    ?
                                                                    <>
                                                                        <button className='recieved-order-confirm btn btn-warning mx-5' onClick={() => {
                                                                            this.changeStatus(o._id, o.status)
                                                                        }}>Order Cancelled</button>
                                                                        {/* <button className='received-order-cancel mx-3'><b>Cancel Order</b></button> */}

                                                                    </>
                                                                    : <></>
                                                            }



                                                            {
                                                                o.status !== "order not confirmed yet" && o.status !== "ready to pack" && o.status !== "ready to hand" && o.status !== "Order Cancelled"
                                                                    ?
                                                                    <>
                                                                        till return policy status / after it we will remove it from order
                                                                </>
                                                                    :
                                                                    <></>
                                                            }

                                                        </div>
                                                        {/* <p className='received-order-address'><b>Buyer Address:</b>{o.address.hno}, {o.address.line1}, {o.address.city}, {o.address.state}</p> */}
                                                        <div className='received-resposive-btn'>
                                                            {
                                                                o.status === "order not confirmed yet"
                                                                    ?
                                                                    <>
                                                                        < button className='received-after-confirm btn btn-danger mx-3' onClick={() => {
                                                                            this.changeStatus(o._id, o.status)
                                                                        }}>Confirm Order</button>
                                                                        <button className='received-after-cancel '>Cancel Order</button>
                                                                    </>
                                                                    : <></>
                                                            }
                                                            {
                                                                o.status === "ready to pack"
                                                                    ?
                                                                    <>
                                                                        < button className='received-after-confirm btn btn-danger mx-3' onClick={() => {
                                                                            this.changeStatus(o._id, o.status)
                                                                        }}>Ready To Pack</button>
                                                                        <button className='received-after-cancel '>Cancel Order</button>
                                                                    </>

                                                                    : <></>
                                                            }
                                                            {
                                                                o.status === "ready to hand"
                                                                    ?
                                                                    <>
                                                                        < button className='received-after-confirm btn btn-success' onClick={() => {
                                                                            this.changeStatus(o._id, o.status)
                                                                        }}>Ready To Hand</button>
                                                                        <button className='received-after-cancel '>Cancel Order</button>
                                                                    </>

                                                                    : <></>
                                                            }
                                                            {
                                                                o.status !== "order not confirmed yet" && o.status !== "ready to pack" && o.status !== "ready to hand" && o.status !== "Order Cancelled"
                                                                    ?
                                                                    <>
                                                                        till return policy status / after it we will remove it from order
                                                                </>
                                                                    :
                                                                    <></>
                                                            }

                                                        </div>
                                                    </div>
                                                </div>


                                            </>
                                        ))
                                    }
                                </>
                                :
                                <>
                                    No orders received !!
                                </>
                        }
                    </div>
                </Container >

            </div >
        )
    }
}
export default orderReceived