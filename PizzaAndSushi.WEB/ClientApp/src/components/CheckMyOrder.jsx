import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { InfoModal } from '../components/shared/infoModal'

export function CheckOrderStatus() {
    const [order, setOrder] = useState({});
    const [infoModal, setInfoModal] = useState(false);
    const [id, setId] = useState("");
    const [code, setCode] = useState("");

    const fetchOrder = () => {
        setInfoModal(false);
        fetch(`api/order/getOrderByCode/${id}/${code}`)
            .then(response => response.json())
            .then(data => {
                debugger
                setOrder(data);
            })
            .catch(error => {
                setInfoModal(true);
            })
    }

    return (
        <Row>
            <Col xs={12}>
                <InfoModal open={infoModal} message={"Look's like code is wrong, please try again"}></InfoModal>
                <h3>Here you can check you order</h3>
                <p>
                    Please provide code
                </p>
            </Col>
            <Col xs={12}>
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Code</Label>{' '}
                        <Input className="width-100 display-inline" value={id} onChange={(e) => setId(e.target.value)} type="text" name="id" id="orderId" placeholder="" /> -
                        <Input className="width-100 display-inline" value={code} onChange={(e) => setCode(e.target.value)} type="text" name="code" id="orderCode" placeholder="" />

                    </FormGroup>
                    <Button onClick={fetchOrder} color="info">Check</Button>{' '}
                </Form>
                {
                    order.orderStatus !== undefined &&
                    <div>
                        <br/>
                        <p>
                            Status: {order.orderStatus.name}
                        </p>
                    </div>
                }
            </Col>

        </Row>
    )
}