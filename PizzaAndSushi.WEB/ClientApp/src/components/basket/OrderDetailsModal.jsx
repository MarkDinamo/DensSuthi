import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export function OrderDetailsModel({ proccessOrder}) {
    const [modal, setModal] = useState(false);
    const [order, setOrder] = useState({});
    const [restoraunts, setRestoraunts] = useState([]);
    const toggle = () => setModal(false);

    const openModal = () => {
        setModal(true);
    }

    const onChangeHandler = (property, value) => {
        console.log("data");
        let copy = { ...order };
        copy[property] = value;
        setOrder(copy);
    }

    const makeOrder = () => {
        let copy = { ...order };
        copy.address = copy.isSelfTake ? copy.address : restoraunts.find(e => e.id == copy.restorauntAddress).address;
        setModal(false);
        proccessOrder(copy);
    }


    useEffect(() => {
        fetch('api/Restoraunt')
            .then((response) => response.json())
            .then(data => setRestoraunts(data))

        setOrder({
            address: "",
            details: "",
            phoneNumber: "",
            isProcessed: false,
            isSelfTake: true,
            restorauntAddress: 0
        });
    }, [])

    return (
        <>
            <Button onClick={openModal} color="success">Prepear order</Button>{' '}
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Finish your order</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup check>
                            <Label check>
                                <Input name="isSelfTake" checked={order.isSelfTake} onChange={(e) => onChangeHandler(e.target.name, e.target.checked)} type="checkbox" />{' '}
                                Do you want to have have home deliver?
                            </Label>
                        </FormGroup>
                        {
                            order.isSelfTake 
                                ?
                                <FormGroup>
                                    <Label for="address">Home address</Label>
                                    <Input type="text" name="address" id="address" placeholder="Address" value={order.address} onChange={(e) => onChangeHandler(e.target.name, e.target.value)} />
                                </FormGroup>
                                :
                                <FormGroup>
                                    <Label for="address">Restoraunt address</Label>
                                    <Input type="select" name="restorauntAddress" id="restorauntAddress" value={order.restorauntAddress} onChange={(e) => onChangeHandler(e.target.name, e.target.value)}>
                                        <option value={0}>None</option>
                                        {restoraunts.map((restoraunt, index) =>
                                            <option value={restoraunt.id} key={index}>{restoraunt.address}</option>)
                                        }
                                    </Input>
                                </FormGroup>
                        }
                        <FormGroup>
                            <Label for="phoneNumber">Phone number</Label>
                            <Input type="text" name="phoneNumber" id="phoneNumber" placeholder="phone number" value={order.phoneNumber} onChange={(e) => onChangeHandler(e.target.name, e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="details">Order details</Label>
                            <Input type="textarea" name="details" id="details" placeholder="details" value={order.details} onChange={(e) => onChangeHandler(e.target.name, e.target.value)} />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>{' '}
                    <Button color="primary" onClick={makeOrder}>Order</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}