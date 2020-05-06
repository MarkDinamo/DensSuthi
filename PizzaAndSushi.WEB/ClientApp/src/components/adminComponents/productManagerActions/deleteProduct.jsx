import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, CustomInput } from 'reactstrap';

export function DeleteProduct(props) {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const deleteProduct = () => {
        fetch('api/product/' + props.product.id, {
            method: 'DELETE'
        });

        toggle();
    }

    const openDialog = () => {
        toggle();
    }

    return (
        <>
            <Button onClick={openDialog} color="danger">Delete</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Are you sure that you want to delete product {props.product.name}</ModalHeader>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>No</Button>{' '}
                    <Button color="primary" onClick={deleteProduct}>Yes</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}