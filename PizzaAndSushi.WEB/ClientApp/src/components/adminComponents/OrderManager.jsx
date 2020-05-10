import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { OrderList } from '../adminComponents/orderManagerActions/OrderList';

export function OrderManager() {
    let allOrders;

    const [orders, setOrders] = useState();

    useEffect(() => {
        fetch('api/order/all')
            .then(response => response.json())
            .then(respData => {
                debugger;
                allOrders = respData;
                setOrders(respData);
            })
    }, [])

    const update = (id, status) => {

    }

    return (
        <>
            {orders &&
                <>
                    <Row>
                        <Col xs={12}>
                            Review orders
                        </Col>
                        <Col xs={12}>
                            <Form>
                                <FormGroup>
                                    <Label for="exampleEmail">Order Id</Label>
                                    <Input type="text" name="orderId" id="orderId" placeholder="Type order id" />
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                    <OrderList updateCallBack={update} orders={orders}></OrderList>
                </>
            }
        </>
    )

}