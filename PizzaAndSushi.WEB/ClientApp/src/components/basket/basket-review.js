import React, { useState, useEffect } from 'react';
import { ListGroup, ListGroupItem, Button, Col, Form, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Input, Row, Label, Table } from 'reactstrap';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

export function BasketReviewComponent(props) {
    const [items, setItems] = useState([]);
    const [totalSum, setTotalSum] = useState(0);
    const [modal, setModal] = useState(false);
    const [modalEntity, setModalEntity] = useState({
        address: "",
        details: "",
        phoneNumber: "",
        isProcessed: false,
        isSelfTake: false
    });

    const onChangeHandler = (event, name) => {
        console.log(event);
        let value = name === "isSelfTake" ? event.target.checked : event.target.value;
        let newValue = { ...modalEntity };
        newValue[name] = value;
        setModalEntity(newValue);
    }

    const toggle = () => setModal(!modal);
    const createOrder = () => {
        let produtcts = [];
        for (var i = 0; i < items.length; i++) {
            produtcts.push({
                key: items[i].id,
                value: items[i].count
            });
        }
        fetch('api/order/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ orderDetails: modalEntity, products: produtcts })
            })
            .then((rest) => { return rest.json(); })
            .then((data) => console.log(data));
        //setModal(!modal);
    }

    useEffect(() => {
        let array = localStorage.getItem("basket")
        let list = JSON.parse(array);
        let result = [];
        for (var i in list) {
            result.push(list[i]);
        }
        console.log(array);
        console.log(JSON.stringify(array));
        fetch('api/Product/getByIds', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(result)
        }).
            then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                let sum = 0;
                for (var i = 0; i < data.length; i++) {
                    data[i].count = 1;
                    sum += data[i].price;
                }
                setItems(data);
                setTotalSum(sum);
            });
    }, []);

    return (
        <>
            <Row>
                <Col xs="12">
                    <h3>
                        Welcome to you baske, please review products and make an order
                    </h3>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th>Count</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                items.map((item, index) =>
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.name}</td>
                                        <td>{item.count}</td>
                                        <td><span><AddIcon></AddIcon></span> <span><RemoveIcon></RemoveIcon></span></td>
                                    </tr>
                                )
                            }

                        </tbody>
                    </Table>
                    <p>
                        Total sum: {totalSum}
                    </p>
                    <p>
                        <Button color="primary" onClick={toggle}>Make order</Button>
                        <Modal isOpen={modal} toggle={toggle}>
                            <ModalHeader toggle={toggle}>Please fill out all fields</ModalHeader>
                            <ModalBody>
                                <Form>
                                    <FormGroup>
                                        <Label for="exampleEmail">Address</Label>
                                        <Input type="text" name="address" value={modalEntity.address} onChange={(e) => onChangeHandler(e, "address")} id="exampleEmail" placeholder="Your address please if you need courier or address of restorun if you will take it by your self" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="exampleEmail">Details</Label>
                                        <Input type="textarea" name="details" value={modalEntity.details} onChange={(e) => onChangeHandler(e, "details")} id="exampleEmail" placeholder="Put some details if you need, e.g no sugger, sticks for sushi" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="exampleEmail">PhoneNumber</Label>
                                        <Input type="text" name="phoneNumber" value={modalEntity.phoneNumber} onChange={(e) => onChangeHandler(e, "phoneNumber")} id="exampleEmail" placeholder="Put your number" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="exampleEmail">IsSelfTake</Label> <br />
                                        <Input style={{ marginLeft: "10px" }} type="checkbox" name="isSelfTake" value={modalEntity.IsSelfTake} onChange={(e) => onChangeHandler(e, "isSelfTake")} id="exampleEmail" />
                                    </FormGroup>
                                </Form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onClick={toggle}>Cancel</Button>
                                <Button color="success" onClick={createOrder}>Order</Button>
                            </ModalFooter>
                        </Modal>
                    </p>
                </Col>
            </Row>
            <Row>

            </Row>
        </>
    )
}