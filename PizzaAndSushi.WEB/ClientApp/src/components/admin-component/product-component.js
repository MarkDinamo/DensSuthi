import React, { useState, useEffect } from 'react';
import { ListGroup, ListGroupItem, Button, Col, Modal, ModalHeader, ModalBody, ModalFooter, Input, Row } from 'reactstrap';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import './admin-styles.css'
import EditIcon from '@material-ui/icons/Edit';

export function ProductComponent(props) {
    const [items, setItems] = useState([]);
    const [modal, setModal] = useState(false);
    const [newCategoryName, setnewCategoryName] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [modalCateoryId, setModalCateoryId] = useState(0);
    const [okButtonName, setOkButtonName] = useState("");
    const [categoryToRemove, setCategoryToRemove] = useState("");
    const [configModal, setConfigModal] = useState(false);

    const createProduct = () => {

    }

    useEffect(() => {
        fetchData();
    }, []);

    const toggle = () => setModal(!modal);
    const Ok = () => {
        setModal(!modal);
        fetch('api/Product', {
            method: modalCateoryId == 0 ? 'POST' : 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: newCategoryName, id: modalCateoryId })
        }).then((response) => {
            fetchData();
        });
    };

    const fetchData = () => {
        fetch('api/Product/0/200')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setItems(data)
            });
    };

    return (
        <>
            <Col xs="12">
                <Button color="primary" onClick={createProduct}>Add Product</Button>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
                    <ModalBody>
                        <Input type="text" name="email" value={newCategoryName}  placeholder="Category name" />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                        <Button color="primary" onClick={Ok}>{okButtonName}</Button>
                    </ModalFooter>
                </Modal>
            </Col>
            <Col xs="12">
            </Col>
        </>
    )

}