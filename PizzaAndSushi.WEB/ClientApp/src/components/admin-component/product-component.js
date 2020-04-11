import React, { useState, useEffect } from 'react';
import { ListGroup, ListGroupItem, Button, Col, Form, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Input, Row, Label } from 'reactstrap';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import './admin-styles.css'
import EditIcon from '@material-ui/icons/Edit';

export function ProductComponent(props) {
    const [items, setItems] = useState([]);
    const [modalEntity, setModalEntity] = useState({});
    const [modal, setModal] = useState(false);
    const [newCategoryName, setnewCategoryName] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [modalCateoryId, setModalCateoryId] = useState(0);
    const [okButtonName, setOkButtonName] = useState("");
    const [categoryToRemove, setCategoryToRemove] = useState("");
    const [configModal, setConfigModal] = useState(false);

    const createProduct = () => {
        setModalEntity({
            id: 0,
            name: "Product name",
            details: "",
            price: 0,
            weight: 0,
            isLiquid: false,
            isHidden: false,
            productTypeId: 0
        });
        setOkButtonName("Create product");
        toggle();
    }

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setModalEntity({ [name]: value })

    }

    const updateModalEntity = (prop, value) => {
        console.log(prop + "--" + value);
        let modalEntityOld = modalEntity;
        modalEntityOld[prop] = value;
        console.log(modalEntityOld);
        setModalEntity(modalEntityOld);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const toggle = () => setModal(!modal);
    const Ok = () => {
        console.log(modalEntity);
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
                        <Form>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input type="text" name="name" value={modalEntity.name} onChange={(e) => handleInputChange(e)} placeholder="Name" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleSelect">Category</Label>
                                <Input type="select" name="select" id="exampleSelect">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="details">Details</Label>
                                <Input type="textarea" name="details" value={modalEntity.details} onChange={(e) => updateModalEntity("details", e.target.value)} placeholder="Details" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="price">Price</Label>
                                <Input type="number" name="price" value={modalEntity.price} onChange={(e) => updateModalEntity("price", e.target.value)} placeholder="Price" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="weight">Weight</Label>
                                <Input type="number" name="weight" value={modalEntity.weight} onChange={(e) => updateModalEntity("weight", e.target.value)} placeholder="Weight" />
                            </FormGroup>
                            <FormGroup>
                                <div className="form-label">
                                    <Label check>
                                        <Input type="checkbox" value={modalEntity.isLiquid} onChange={(e) => updateModalEntity("isLiquid", e.target.checked)} />{' '}
                                         Is Liquid
                                    </Label>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <div className="form-label">
                                    <Label check>
                                        <Input type="checkbox" value={modalEntity.isHidden} onChange={(e) => updateModalEntity("isHidden", e.target.checked)} />{' '}
                                         Is Hidden
                                    </Label>
                                </div>
                            </FormGroup>
                        </Form>


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