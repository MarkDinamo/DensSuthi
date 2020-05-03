import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { CategoriesView } from '../components/categories-view'

export function HomeComponent(props) {

    return (
        <>
            <Row>
                <Col xs="12">
                    <h4>Welcome to Den's Sushi and Pizza</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <CategoriesView></CategoriesView>
                </Col>
            </Row>
        </>
        )
}