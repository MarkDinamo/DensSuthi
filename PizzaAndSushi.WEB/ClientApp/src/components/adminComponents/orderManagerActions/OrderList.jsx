import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import './orderListStyles.css'
import ReactTimeAgo from 'react-time-ago'
import { OrderListItem } from '../orderManagerActions/OrderListItem'

export function OrderList({ updateCallBack, orders }) {
   const [orderStatuses, setOrderStatuses] =  useState([])

    useEffect(() => {
        fetch('api/order/statuses')
            .then(response => response.json())
            .then(respData => {
                setOrderStatuses(respData);
            })
    }, [])

    const updateStatus = (id, status) => {
        let statusId = orderStatuses.find(e => e.name == status);
        updateCallBack(id, statusId, status);
    }

    return (
        <Row>
            {orders.map((order, index) =>
                <OrderListItem order={order} updateCallBack={updateStatus} key={order.id}></OrderListItem>
            )}
        </Row>
    )
};