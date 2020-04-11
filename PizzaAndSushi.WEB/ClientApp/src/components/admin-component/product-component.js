import React, { useState, useEffect } from 'react';
import { ListGroup, ListGroupItem, Button, Col, Form, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Input, Row, Label } from 'reactstrap';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import './admin-styles.css'
import EditIcon from '@material-ui/icons/Edit';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function ProductComponent(props) {
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
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

    const updateModalEntity = (prop, value) => {
        console.log(prop + "--" + value);
        let modalEntityOld = modalEntity;
        modalEntityOld[prop] = value;
        console.log(modalEntityOld);
        setModalEntity(modalEntityOld);
    }

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackBar(false);
    };

    useEffect(() => {
        fetchData();
        fetch('api/ProductType')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setCategories(data)
            });
    }, []);

    const toggle = () => setModal(!modal);
    const Ok = () => {
        fetch('api/product', {
            method: modalEntity.id === 0 ? 'POST' : 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(modalEntity)
        }).then((response) => {
            setOpenSnackBar(true);
            fetchData();
        });
    };

    const fetchData = () => {
        fetch('api/Product/get/0/100')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setItems(data.items)
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
                                <Input type="text" name="name" onChange={(e) => updateModalEntity("name", e.target.value)} placeholder="Name" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleSelect">Category</Label>
                                <Input type="select" name="productTypeId" onChange={(e) => updateModalEntity("productTypeId", parseInt(e.target.value))}>
                                    {categories.map((category) =>
                                        <option value={category.id} key={category.id}>{category.name}</option>
                                    )}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="details">Details</Label>
                                <Input type="textarea" name="details" onChange={(e) => updateModalEntity("details", e.target.value)} placeholder="Details" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="price">Price</Label>
                                <Input type="number" name="price" onChange={(e) => updateModalEntity("price", parseInt(e.target.value))} placeholder="Price" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="weight">Weight in grams or m. litters</Label>
                                <Input type="number" name="weight" onChange={(e) => updateModalEntity("weight", parseInt(e.target.value))} placeholder="Weight" />
                            </FormGroup>
                            <FormGroup>
                                <div className="form-label">
                                    <Label check>
                                        <Input type="checkbox" onChange={(e) => updateModalEntity("isLiquid", e.target.checked)} />{' '}
                                         Is Liquid
                                    </Label>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <div className="form-label">
                                    <Label check>
                                        <Input type="checkbox" onChange={(e) => updateModalEntity("isHidden", e.target.checked)} />{' '}
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
                <Snackbar open={openSnackBar} autoHideDuration={2000} onClose={handleCloseSnackBar}>
                    <Alert onClose={handleCloseSnackBar} severity="success">
                        Entity created sussefully
                    </Alert>
                </Snackbar>
            </Col>
            <Col xs="12">
                <ListGroup>
                    {items.map((item, index) =>
                        <ListGroupItem key={item.id}>{item.name}</ListGroupItem>
                    )}
                </ListGroup>

            </Col>
        </>
    )

}