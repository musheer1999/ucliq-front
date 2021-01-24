import React, {  useState } from 'react';
import './test.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from "react-router-dom";

const ModalExample = (props) => {
    const {
        className
    } = props;

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [bankname, setBankname] = useState(props.oldDet.bankname)
    const [Account, setAccount] = useState(props.oldDet.account)
    const [iifsc, setiifsc] = useState(props.oldDet.iifsc)
    var details = ""
    let Bank = {
        bankname: bankname,
        accountnumber: Account,
        iifsc: iifsc
    }
    const updateDetail = () => {
        if (details.length > 0) {
            if (props.detailsType === "Username") {
                props.func(details, "name")
            }
            else
                if (props.detailsType === "GST Number") {
                    props.func(details, "gstin")
                }
        }
        else
            if (props.detailsType === "BankDetails") {
                props.func(Bank, "bankdetails")
            } else
                props.func(details, "pincode")
    }
    const onChange = (e) => {
        details = e.target.value
    }
    const onchangeBank = (e) => {
        if (e.target.name === 'bankname') {
            setBankname(e.target.value)
        }
        if (e.target.name === 'accountnumber') {
            setAccount(e.target.value)
        }
        if (e.target.name === 'iifsc') {
            setiifsc(e.target.value)
        }
    }
    return (
        <div>
            <form>
                <Button color="primary" type="button" style={{ float: " right" }} onClick={toggle}>EDIT</Button>
                <Modal isOpen={modal} toggle={toggle} className={className}>
                    <ModalHeader toggle={toggle}>{props.detailsType}</ModalHeader>
                    <ModalBody>
                        {(() => {
                            if (props.detailsType === "Username") {
                                return (
                                    <div style={{ display: "block" }}>
                                        <span class="input-group-text">Name </span>

                                        <span >
                                            <input id="text" onChange={onChange} placeholder={props.oldDet} class="form-control" />
                                        </span>
                                        <span class="input-group-text">Phone Number </span>

                                        <Link to={"/verifyNumber"} style={{ all: "unset" }}>
                                            <div className="inner-div-dash">
                                                <Button color="primary"> Add New Number </Button>
                                            </div>
                                        </Link>

                                    </div>
                                );
                            } else if (props.detailsType === "GST Number") {
                                return (
                                    <div style={{ display: "flex" }}>
                                        <span class="input-group-text">GSTIN </span>
                                    &nbsp;
                                    &nbsp;
                                        <span>
                                            <input id="text" onChange={onChange} placeholder={props.oldDet} class="form-control" />
                                        </span>
                                    </div>
                                );
                            } else if (props.detailsType === "Address") {
                                return (
                                    <div style={{ display: "flex" }}>
                                        <span class="input-group-text">Address </span>
                                    &nbsp;
                                    &nbsp;
                                        <span>
                                            <input id="text" onChange={onChange} placeholder={props.oldDet} class="form-control" />
                                        </span>
                                    </div>
                                );
                            }
                            else if (props.detailsType === "BankDetails") {
                                return (
                                    <div style={{ display: "block" }}>
                                        <span class="input-group-text">Bank Name</span>

                                        <span >
                                            <input name='bankname' id="text" onChange={onchangeBank} placeholder={props.oldDet.bankname} class="form-control" />
                                        </span>
                                        <span class="input-group-text">Account Number </span>

                                        <input name='accountnumber' id="text" onChange={onchangeBank} placeholder={props.oldDet.account} class="form-control" />
                                        <span class="input-group-text">IIFSC Number</span>

                                        <span >
                                            <input name='iifsc' id="text" onChange={onchangeBank} placeholder={props.oldDet.iifsc} class="form-control" />
                                        </span>
                                    </div>
                                );
                            }
                        })()}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => { updateDetail(); toggle(); }}>SUBMIT</Button>{' '}
                    </ModalFooter>
                </Modal>
            </form>
        </div>
    );
}


export default ModalExample;
