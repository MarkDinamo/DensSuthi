import React, { useState, useEffect } from 'react';
import { Card, CardBody, Button, CardTitle, CardText, CardImg, Col, Row } from 'reactstrap';
import { ProductViewComponent } from './product-view-component'

export function CategoryViewComponent(props) {
    const [category, setCategory] = useState(props.category);
    useEffect(() => {
        setCategory(props.category);
    }, [props.category]);


    return (
        <div>
            <p>
                {category.name} {category.products.lenght}
            </p>
            <Row>
                {category.products.map((product) =>
                    <Col xs="4">
                        <ProductViewComponent product={product}></ProductViewComponent>
                    </Col>
                )}
            </Row>
        </div>
    )
}