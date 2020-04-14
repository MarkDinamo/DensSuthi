import React, { useState, useEffect } from 'react';
import { ListGroup, ListGroupItem, Button, Col, Form, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Input, Row, Label } from 'reactstrap';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

export function BasketReviewComponent(props) {
    const [items, setItems] = useState([]);
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
                for (var i = 0; i < data.length; i++) {
                    data[i].count = 1;
                }
                setItems(data);
            });
    }, []);

    return (
        <>
            <Row>
                <Col xs="12">
                    <h3>
                        Welcome to you baske, please review products and make an order
                    </h3>
                    {
                        items.map((item) =>
                            <p key={item.id}>{item.name}  ---- {item.count} <span><AddIcon></AddIcon></span> <span><RemoveIcon></RemoveIcon></span></p>
                            
                        )
                    }
                </Col>
            </Row>
            <Row>

            </Row>
        </>
    )
}