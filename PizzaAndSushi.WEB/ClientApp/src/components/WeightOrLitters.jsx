import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';


export function Weight(props) {

    return (
        <span>
            {
                props.product.isLiquid == true
                    ? props.product.weight + " m litters"
                    : props.product.weight + " grams"
            }
        </span>
        )
}
