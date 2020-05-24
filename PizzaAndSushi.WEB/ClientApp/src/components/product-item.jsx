import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Weight } from '../components/WeightOrLitters'
import { Button } from 'reactstrap';
import * as actions from '../actions/index'
import { useDispatch, useSelector } from 'react-redux'

export function ProductItem(props) {
    const basket = useSelector(state => state.basket);
    const dispatch = useDispatch();
    const imageUrl = "api/file/" + props.product.id
    const [isInBasket, setIsInBasket] = useState();

    useEffect(() => {
        let isInBasket = basket.find(e => e.id == props.product.id);
        setIsInBasket(isInBasket);
    }, [])

    const addToBasket = () => {
        setIsInBasket(true);
        dispatch(actions.addToBasket(props.product.id, 1));
    }

    const removeFromBasket = () => {
        setIsInBasket(false);
        dispatch(actions.removeFromBasket(props.product.id));
    }

    return (
        <div className="product-item">
            <div>
                <div className="center-flex">
                    <h6>{props.product.name}</h6>
                </div>
                <img src={imageUrl} alt="Italian Trulli" width="325" height="225" />
            </div>
            <div>
                <p>
                    {props.product.details}
                </p>
                <p>
                    Price : {props.product.price}
                </p>
                <p>
                    <Weight product={props.product}></Weight>
                </p>
            </div>
            <div>
                {isInBasket
                    ? <Button color="secondary" onClick={() => removeFromBasket()}>Remove from basket</Button>
                    : <Button color="success" onClick={() => addToBasket()}>Add to basket</Button>
                }
            </div>
        </div>
    )
}