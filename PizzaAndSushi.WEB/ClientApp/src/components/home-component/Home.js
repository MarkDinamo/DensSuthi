import React, { useState, useEffect } from 'react';
import { ListGroup, ListGroupItem, Button, Col, Form, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Input, Row, Label } from 'reactstrap';
import { CategoryViewComponent } from '../item-component/category-view-component'

export function Home(props) {
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch("api/ProductType/getWithProducts")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                let filteredData = data.filter(e => e.products.length > 0);
                console.log(filteredData);
                setItems(filteredData);

            })
    }, [])

    return (
        <>
            <Row>
                <Col>
                    <div className="flex-container">
                        <h3> Welcome to Denis Sushi & Pizza </h3>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="flex-container">
                        Here you can order pizza and sushi
                    </div>
                </Col>
            </Row>
            <Row>
                {
                    items.map((item) =>
                        <Col xs="12">
                            <CategoryViewComponent category={item}></CategoryViewComponent>
                        </Col>
                    )
                }
            </Row>
        </>
    )
}