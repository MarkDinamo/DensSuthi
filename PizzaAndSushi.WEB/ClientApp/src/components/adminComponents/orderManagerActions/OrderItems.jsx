import React, { useEffect, useState } from 'react';
import { ListGroup, ListGroupItem, Badge, Card, Button, CardTitle, CardText, Row, CardBody, Collapse } from 'reactstrap';

export function OrderItems({ id }) {
    const [isOpen, setIsOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const toggle = () => {
        if (products.length === 0) {
            fetch(`api/order/GetOrderItemsById/${id}`)
                .then(response => response.json())
                .then(data => {
                    setProducts(data);
                    setIsOpen(!isOpen);
                })
        }
        else {
            setIsOpen(!isOpen);
        }

    }

    return (
        <>
            <div>
                <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>{isOpen ? "Hide" : "Show products"}</Button>
                <Collapse isOpen={isOpen}>
                    <Card>
                        <CardBody>
                            <ListGroup>
                                {
                                    products.map((product, index) =>
                                        <ListGroupItem key={index} className="justify-content-between">
                                            {product.key} <Badge pill>{product.value}</Badge>
                                        </ListGroupItem>
                                    )
                                }
                            </ListGroup>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        </>
    )
}
