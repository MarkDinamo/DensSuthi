import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { ProductItem } from '../components/product-item'

export function ProductGrid(props) {
    console.log(props.products);

    return (
        <Row>
            {props.products.map((product) =>
                <Col xs="3" key={product.id}>
                    <ProductItem product={product}>
                    </ProductItem>
                </Col>
            )}
        </Row>
    )
}