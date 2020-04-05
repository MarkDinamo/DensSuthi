import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './home-styles.css'

export function Home(props) {

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
            
        </>
    );
}