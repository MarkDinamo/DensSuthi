import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

export function OrderAction({ orderId, orderStatusProp, updateCallBack }) {
    const [nextStatus, setNextStatus] = useState("");
    const [orderStatus, setOrderStatus] = useState("");

    useEffect(() => {
        console.log("Test");
        if (orderStatus == "") {
            setOrderStatus(orderStatusProp);
        }
        calculateNewStatus(orderStatus)
    }, [orderStatus])

    const calculateNewStatus = (currentStatus, isSelfTake) => {
        if (currentStatus == 'Created') {
            setNextStatus("Confirmed");
        }
        else if (currentStatus == 'Confirmed') {
            setNextStatus("Preparing");
        }
        else if (currentStatus == 'Preparing' && isSelfTake) {
            setNextStatus("Waiting for collect");
        }
        else if (currentStatus == 'Preparing' && !isSelfTake) {
            setNextStatus("Delivering");
        }

        else if (currentStatus == 'Delivering' || currentStatus == 'Waiting for collect') {
            setNextStatus("Resolved");
        }
    }

    const changeStatus = () => {
        setOrderStatus(nextStatus);
        updateCallBack(orderId, nextStatus);
    }

    const rejectOrder = () => {
        setOrderStatus("Rejected");
        updateCallBack(orderId, "Rejected");
    }

    return (
        <>
            {nextStatus.length > 0 && orderStatus !== "Resolved" && orderStatus !=="Rejected" &&
                <>
                <Button onClick={() => { changeStatus() }} color="info">{nextStatus}</Button> {' '}
                <Button onClick={rejectOrder} color="danger">Reject</Button>
                </>
            }
        </>
    )
}