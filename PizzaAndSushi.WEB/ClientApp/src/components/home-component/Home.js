import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { ListGroup, ListGroupItem, Button, Col, Form, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Input, Row, Label } from 'reactstrap';
import { CategoryViewComponent } from '../item-component/category-view-component'

export function Home(props) {
    const history = useHistory();
    const [items, setItems] = useState([]);
    const [basketItems, setBasketItems] = useState([]);

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

    const addToBasket = (id) => {
        console.log(id);
        let basketItemsNew = [...basketItems];
        basketItemsNew.push(id);
        console.log(basketItemsNew);
        setBasketItems(basketItemsNew);
    }

    const removeFromBasket = (id) => {
        console.log(id);
        let basketItemsNew = basketItems.filter(item => item !== id);
        console.log(basketItemsNew);
        setBasketItems(basketItemsNew);
    }

    const redirectToBasket = () => {
        localStorage.clear();
        localStorage.setItem("basket", JSON.stringify(basketItems));
        history.push("basket")
    }

    return (
        <>
            <Row>
                <Col>
                    <div className="flex-container">
                        <h3> Welcome to Denis Sushi & Pizza </h3> 
                        {
                            basketItems.length > 0 &&
                            <Button onClick={() => redirectToBasket()} color="info">My basket</Button>
                        }
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
                        <Col key={item.id} xs="12">
                            <CategoryViewComponent addToBasket={addToBasket} removeFromBasket={removeFromBasket} category={item}></CategoryViewComponent>
                        </Col>
                    )
                }
            </Row>
        </>
    )
}