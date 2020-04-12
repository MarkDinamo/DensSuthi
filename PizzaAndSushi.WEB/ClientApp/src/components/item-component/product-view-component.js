import React, { useState, useEffect } from 'react';
import { Card, CardBody, Button, CardTitle, CardText, CardImg } from 'reactstrap';

export function ProductViewComponent(props) {
    const [product, setProducts] = useState(props.product);
    const [productIsInBusket, setProductIsInBusket] = useState(false);
    useEffect(() => {
        setProducts(props.product);
    }, [props.product]);

    const addToBasket = () => {
        props.addToBasket(product.id);
        setProductIsInBusket(true);
    }

    const removeFromBasket = () => {
        props.removeFromBasket(product.id);
        setProductIsInBusket(false);
    }

    return (
        <div>
            <Card>
                <CardImg top width="100%" src="https://ocs-pl.oktawave.com/v1/AUTH_876e5729-f8dd-45dd-908f-35d8bb716177/amrest-web-ordering/GRD4/GRD4590/W2%202020/PH_pepperoni_01.jpg" alt="Card image cap" />
                <CardBody>
                    <CardTitle>{product.name}</CardTitle>
                    <CardText>{product.details}</CardText>
                    <CardText>
                        <div>Price:{product.price}</div>
                        <div>Weight:{product.weight}</div>
                    </CardText>
                    <CardText>
                        {
                            productIsInBusket == false ?
                                <Button color="primary" onClick={() => addToBasket()}>Add to basket </Button>
                                : <Button color="secondary" onClick={() => removeFromBasket()}>RemoveFrom</Button>
                        }
                    </CardText>
                </CardBody>
            </Card>
        </div>
    )
}