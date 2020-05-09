import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux'
import { OrderDetailsModel } from '../basket/OrderDetailsModal';
import { InfoModal } from '../shared/infoModal';

export function BasketMain() {
    const basket = useSelector(state => state.basket);
    //const [items, setItems] = useState(basket);
    const [items, setItems] = useState([{ id: 1, count: 1 }, { id: 2, count: 1 }, { id: 3, count: 1 }, { id: 8, count: 1 }, { id: 9, count: 1 }]);
    const [products, setProducts] = useState([]);

    const [infoModal, setInfoModal] = useState(false);
    const [infoModalText, setInfoModalText] = useState("");

    useEffect(() => {
        console.log(basket);
        if (items.length > 0) {
            let ids = [];
            items.forEach(element => ids.push(element.id))

            fetch('api/product/getByIds',
                {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(ids),
                })
                .then(response => response.json())
                .then(data => setProducts(data))
        }
    }, [])

    const getName = (id) => {
        return products.find(e => e.id == id).name;
    }

    const proccessOrder = (data) => {
        let orderDetails = {
            address: data.address,
            details: data.details,
            phoneNumber: data.phoneNumber,
            isSelfTake: data.isSelfTake
        }
        
        let products = [];
        items.forEach(e => products.push({ key: e.id, value: e.count }));

        fetch('api/order/create', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ orderDetails, products })
        }).
            then(response => response.json())
            .then(data => {
                console.log(data);
                setInfoModal(true);
                setInfoModalText("You can track your order progress, code: " + data)
            })
            .catch(error => console.log(error))
    }

    return (
        <>
            <InfoModal message={infoModalText} open={infoModal} redirectTo={"/"}></InfoModal>
            <Row>
                <Col xs="12">
                    <h4>Welcome to your basket, please review it</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    {items.length === 0 ?
                        <h5>You don't have any items</h5>
                        :
                        <div>
                            {
                                products.length > 0 &&
                                <>
                                    <Table striped>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Count</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                items.map((item, index) =>
                                                    <tr key={item.id}>
                                                        <th scope="row">
                                                            {index + 1}
                                                        </th>
                                                        <td>
                                                            {getName(item.id)}
                                                        </td>
                                                        <td>
                                                            {item.count}
                                                        </td>
                                                        <td>
                                                            <Button color="secondary">+</Button>{' '}
                                                            <Button color="secondary">-</Button>{' '}
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </Table>
                                    <br />
                                    <OrderDetailsModel proccessOrder={proccessOrder}></OrderDetailsModel>
                                </>
                            }
                        </div>
                    }
                </Col>
            </Row>
        </>
    )
}