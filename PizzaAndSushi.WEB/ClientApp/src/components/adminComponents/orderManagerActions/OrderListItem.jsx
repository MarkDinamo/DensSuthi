import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import './orderListStyles.css'
import ReactTimeAgo from 'react-time-ago'
import { OrderAction } from '../orderManagerActions/OrderActions'
import * as _ from 'lodash';
import { OrderItems } from '../orderManagerActions/OrderItems'

export function OrderListItem({ updateCallBack, order }) {
    const [orderEntity, setOrderEntity] = useState({})

    useEffect(() => {
        setOrderEntity(order);
    }, [order]);

    const updateStatus = (id, status) => {
        let copy = _.cloneDeep(order);
        copy.orderStatus.name = status;
        setOrderEntity(copy);
        updateCallBack(id, status);
    }

    return (
        <Col key={orderEntity.id} xs={12}>
            {orderEntity.id != undefined && orderEntity.orderStatus.name != "Resolved" && orderEntity.orderStatus.name != "Rejected" &&
                <div className="order-item">
                    <Row>
                        <Col xs={2}>
                            Id: {orderEntity.id}
                        </Col>
                        <Col xs={2}>
                            Code: {orderEntity.code}
                        </Col>
                        <Col xs={2}>
                            Address: {orderEntity.address}
                        </Col>
                        <Col xs={2}>
                            <FormGroup check>
                                <Label check>
                                    <Input disabled checked={orderEntity.isSelfTake} type="checkbox" />{' '}
                                         Self collect
                                        </Label>
                            </FormGroup>
                        </Col>
                        <Col xs={2}>
                            Phone number: {orderEntity.phoneNumber}
                        </Col>
                        <Col xs={2}>
                            Created: <ReactTimeAgo locale="en" date={orderEntity.createdOne} />
                        </Col>
                        <Col xs={2}>
                            Status: {orderEntity.orderStatus.name}
                        </Col>
                        <Col xs={8}>
                            Details: {orderEntity.details}
                        </Col>
                        <Col xs={10}>
                            <OrderItems id={orderEntity.id}></OrderItems>
                        </Col>
                        <Col xs={2}>
                            <OrderAction updateCallBack={updateStatus} orderStatusProp={order.orderStatus.name} orderId={order.id}></OrderAction>
                        </Col>
                    </Row>
                </div>
            }
        </Col>
    )
}