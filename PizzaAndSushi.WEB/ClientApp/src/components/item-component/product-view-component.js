import React, { useState, useEffect } from 'react';
import { Card, CardBody, Button, CardTitle, CardText, CardImg } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../actions/index'


export function ProductViewComponent(props) {
    const basket = useSelector(state => state.basket);
    console.log(basket);
    const dispatch = useDispatch();
    const [product, setProducts] = useState(props.product);
    const [productIsInBusket, setProductIsInBusket] = useState(false);
    useEffect(() => {
        console.log("tttt");
        setProducts(props.product);
        //fetch("api/file/1", {
        //    method: 'GET',
        //}).then((response) => response.blob())
        //    .then((blob) => {
        //        console.log('Success:', data);
        //    })
        //    .catch((error) => {
        //        console.error('Error:', error);
        //    });
    }, [props.product]);

    //const addToBasket = () => {
    //    props.addToBasket(product.id);
    //    setProductIsInBusket(true);
    //}

    const removeFromBasket = () => {
        props.removeFromBasket(product.id);
        setProductIsInBusket(false);
    }

    return (
        <div>
            <Card>
                <CardImg top width="100%" src="api/file/1" alt="Card image cap" />
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
                                <Button color="primary" onClick={() => dispatch(actions.addToBasket(1))}>Add to basket </Button>
                                : <Button color="secondary" onClick={() => removeFromBasket()}>RemoveFrom</Button>
                        }
                    </CardText>
                </CardBody>
            </Card>
        </div>
    )
}