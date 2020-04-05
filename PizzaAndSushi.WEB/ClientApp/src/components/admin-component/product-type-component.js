import React, { useState, useEffect } from 'react';
import { ListGroup, ListGroupItem, Button, Col, Modal, ModalHeader, ModalBody, ModalFooter, Input, Row } from 'reactstrap';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import './admin-styles.css'
import EditIcon from '@material-ui/icons/Edit';

export function ProductTypeComponent(props) {
    const [items, setItems] = useState([]);
    const [modal, setModal] = useState(false);
    const [newCategoryName, setnewCategoryName] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [modalCateoryId, setModalCateoryId] = useState(0);
    const [okButtonName, setOkButtonName] = useState("");
    const [categoryToRemove, setCategoryToRemove] = useState("");
    const [configModal, setConfigModal] = useState(false);

    const toggleConfirmModal = (name, event) => {
        event.preventDefault();
        setCategoryToRemove(name);
        setConfigModal(!configModal);
    }
    const cancelRemove = () => setConfigModal(!configModal);
    const removeCategory = () => {
        var item = items.find(e => e.name == categoryToRemove);
        setConfigModal(!configModal);
        fetch('api/ProductType/' + item.id, {
            method: 'DELETE',
        }).then((response) => {
            fetchData();
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const toggle = () => setModal(!modal);
    const Ok = () => {
        setModal(!modal);
        fetch('api/ProductType', {
            method: modalCateoryId == 0 ?'POST' : 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: newCategoryName, id: modalCateoryId })
        }).then((response) => {
            fetchData();
        });
    };

    const editProductType = (id, event) => {
        event.preventDefault();
        var item = items.find(e => e.id == id);
        setnewCategoryName(item.name);
        setModalTitle("Edit category name");
        setModalCateoryId(item.id);
        setOkButtonName("Update");
        toggle();
    }

    const createCategory = () => {
        setnewCategoryName("");
        setModalTitle("Create category");
        setModalCateoryId(0);
        setOkButtonName("Create");
        toggle();
    }

    const handleChange = (event) =>
        setnewCategoryName(event.target.value);


    const fetchData = () => {
        fetch('api/ProductType')
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
                <div>
                    <br />
                    <Button color="primary" onClick={createCategory}>Add Category</Button>
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
                        <ModalBody>
                            <Input type="text" name="email" value={newCategoryName} onChange={handleChange} placeholder="Category name" />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={toggle}>Cancel</Button>
                            <Button color="primary" onClick={Ok}>{okButtonName}</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal isOpen={configModal} toggle={toggleConfirmModal}>
                        <ModalHeader toggle={toggle}>Are you sure that you would like to remove category: "{categoryToRemove}"</ModalHeader>
                        <ModalFooter>
                            <Button color="secondary" onClick={cancelRemove}>No</Button>
                            <Button color="primary" onClick={removeCategory}>Yes</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </Col>
            <br />
            <Col xs="12">
                <br />
                <ListGroup>
                    {items.map((item, index) =>
                        <ListGroupItem key={item.id}>
                            <Row>
                                <Col xs="9">
                                    #{index + 1} {item.name}
                                </Col>
                                <Col xs="3">
                                    <div className="actions-container">
                                        <span onClick={(e) => editProductType(item.id, e)} className="click-span"><EditIcon></EditIcon></span>
                                        <span onClick={(e) => toggleConfirmModal(item.name, e)} className="click-span"><DeleteForeverIcon></DeleteForeverIcon></span>
                                    </div>
                                </Col>
                            </Row>
                        </ListGroupItem>
                    )}
                </ListGroup>
            </Col>
        </>
    );
}