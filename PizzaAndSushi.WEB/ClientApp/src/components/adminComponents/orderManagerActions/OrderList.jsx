import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import './orderListStyles.css'

export function OrderList({ updateCallBack, orders }) {

    return (
        <Row>
            {orders.map((order, index) =>
                <Col key={order.id} xs={12}>
                    <div className="order-item">
                        <Row>
                            <Col xs={2}>
                                Code: {order.code}
                            </Col>
                            <Col xs={2}>
                                Address: {order.address}
                            </Col>
                            <Col xs={2}>
                                <FormGroup check>
                                    <Label check>
                                        <Input disabled checked={order.IsSelfTake} type="checkbox" />{' '}
                                         Self collect
                                        </Label>
                                </FormGroup>
                            </Col>
                            <Col xs={2}>
                                Phone number: {order.phoneNumber}
                            </Col>
                            <Col xs={2}>
                                Created on: {order.createdOne}
                            </Col>
                            <Col xs={2}>
                                Status: {order.orderStatus.name}
                            </Col>
                        </Row>
                    </div>
                </Col>
            )}
        </Row>
    )
};