import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { OrderList } from '../adminComponents/orderManagerActions/OrderList';
import * as _ from 'lodash';

export function OrderManager() {
    const [allOrders, setAllOrders] = useState();
    const [orders, setOrders] = useState();

    useEffect(() => {
        fetch('api/order/all')
            .then(response => response.json())
            .then(respData => {
                setAllOrders(respData);
                setOrders(_.cloneDeep(respData));
            })
    }, [])

    const update = (id, statusId, status) => {
        let allOrdersCopy = _.cloneDeep(allOrders);
        let order = allOrdersCopy.find(e => e.id == id);
        order.orderStatusId = statusId;
        order.orderStatus.id = statusId;
        order.orderStatus.name = status;

        setAllOrders(allOrdersCopy);

        fetch(`api/order/updateOrderStatus/${id}/${statusId}`)
    }

    const filter = (id) => {
        if (id) {
            let filteredOrders = allOrders.filter(e => e.id == id);
            setOrders(_.cloneDeep(filteredOrders));
        } else {
            setOrders(_.cloneDeep(allOrders));
        }
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
                                    <Input onChange={(e) => filter(e.target.value)} type="number" name="orderId" id="orderId" placeholder="Type order id" />
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