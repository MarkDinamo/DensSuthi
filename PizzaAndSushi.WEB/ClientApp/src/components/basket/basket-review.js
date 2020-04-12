import React, { useState, useEffect } from 'react';
import { ListGroup, ListGroupItem, Button, Col, Form, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Input, Row, Label } from 'reactstrap';


export function BasketReviewComponent(props) {
    const [items, setItems] = useState([]);
    useEffect(() => {
        let array = localStorage.getItem("basket")
        setItems(JSON.parse(array));
        fetch("api/getByIds", {
             }).
            then((response) => {
                return response.json();
            })
            .then((data) => {

            });
    },[]);

    return (
        <>
            <Row>
                <Col xs="12">
                    <h3>
                        Welcome to you baske, please review products and make an order
                    </h3>
                    {
                        items.map((item) =>
                            <p key={item}>{item}</p>
                        )
                    }
                </Col>
            </Row>
            <Row>

            </Row>
        </>
    )
}