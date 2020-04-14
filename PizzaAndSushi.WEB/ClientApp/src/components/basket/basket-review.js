import React, { useState, useEffect } from 'react';
import { ListGroup, ListGroupItem, Button, Col, Form, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Input, Row, Label } from 'reactstrap';


export function BasketReviewComponent(props) {
    const [items, setItems] = useState([]);
    useEffect(() => {
        let array = localStorage.getItem("basket")
        console.log(array);
        console.log(JSON.stringify(array));
        fetch('api/Product/getByIds', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(array)
             }).
            then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                data.foreach(e => {e.count = 1 });
                setItems(data);
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
                            <p key={item.id}>{item.name}  ---- {item.count}</p>
                        )
                    }
                </Col>
            </Row>
            <Row>

            </Row>
        </>
    )
}