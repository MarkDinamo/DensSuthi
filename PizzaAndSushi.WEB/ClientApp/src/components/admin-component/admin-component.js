import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { ProductTypeComponent } from './product-type-component'
import { ProductComponent } from './product-component'

export function AdminComponent(props) {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    return (
        <Row>
            <Col>
                <div>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '1' })}
                                onClick={() => { toggle('1'); }}
                            >
                                Categories
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '2' })}
                                onClick={() => { toggle('2'); }}
                            >
                                Products
                        </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <ProductTypeComponent></ProductTypeComponent>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <ProductComponent></ProductComponent>
                            </Row>
                        </TabPane>
                    </TabContent>
                </div>
            </Col>
        </Row>

    );
}