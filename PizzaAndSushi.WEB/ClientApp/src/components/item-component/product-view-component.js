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
                <CardImg top width="100%" src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.kwestiasmaku.com%2Fprzepis%2Fciasto-na-pizze&psig=AOvVaw1GK0usJtf4MmUiz3cHMO2x&ust=1586974529163000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNis9frC6OgCFQAAAAAdAAAAABAW" alt="Card image cap" />
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