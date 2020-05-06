import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, NavItem, NavLink, Card, Button, Form, FormGroup, Label, Input, FormText, CardTitle, CardText, Row, Col, CustomInput } from 'reactstrap';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function CreateOrUpdateProduct(props) {
    console.log(props);
    const [productModel, setProductModel] = useState({});
    const [isCreate, setIsCreate] = useState(true);
    const [modal, setModal] = useState(false);
    const [snack, setSnack] = useState(false);
    const [snackSuccess, setSnackSuccess] = useState(false);
    

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnack(false);
    };

    const toggle = () => setModal(!modal);

    const openDialog = () => {
        setModal(true);
    }

    useEffect(() => {
        if (props && props.product) {
            setProductModel(props.product);
            setIsCreate(false);
        }
        else {
            setProductModel({
                id: 0,
                name: "",
                details: '',
                price: 0,
                weight: 0,
                isHidden: false,
                isLiquid: false,
                productTypeId: 0
            })
        }
    }, [])

    const createOrUpdate = () => {
        fetch('api/product', {
            method: productModel.id == 0 ? "POST" : "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productModel),
        })
            .then((response => response.text()))
            .then(text => {
                setSnack(true);
                props.refresh();
            })
            .catch((error) => console.log(error));
    }

    const onChangeHandler = (property, value) => {
        console.log(property, value);
        let copy = { ...productModel };
        copy[property] = value;
        setProductModel(copy);
    }
    return (
        <>
            {
                isCreate
                    ? <Button onClick={openDialog} color="primary">Create</Button>
                    : <Button onClick={openDialog} color="success">Edit</Button>
            }
            <Snackbar open={snack} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity="success">
                    Product {isCreate ?"created" :'updated'} successfully
                </Alert>
            </Snackbar>
            <Modal isOpen={modal} toggle={toggle}>
                {
                    isCreate
                        ? <ModalHeader toggle={toggle}>Create new product</ModalHeader>
                        : <ModalHeader toggle={toggle}>Edit product {productModel.name} </ModalHeader>
                }
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" name="name" id="name" value={productModel.name} onChange={(e) => onChangeHandler(e.target.name, e.target.value)} placeholder="Product name" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="pro">Category</Label>
                            <Input type="select" name="productTypeId" id="productTypeId" value={productModel.productTypeId} onChange={(e) => onChangeHandler(e.target.name, parseInt(e.target.value))}>
                                <option value={0}>None</option>
                                {props.categories.map((category) =>
                                    <option value={category.id} key={category.id}>{category.name}</option>)
                                }
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">Details</Label>
                            <Input type="textarea" name="details" id="details" value={productModel.details} onChange={(e) => onChangeHandler(e.target.name, e.target.value)} placeholder="Product details" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">Price</Label>
                            <Input type="number" name="price" id="price" value={productModel.price} onChange={(e) => onChangeHandler(e.target.name, e.target.value)} placeholder="Product price" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">Weight</Label>
                            <Input type="number" name="weight" id="weight" value={productModel.weight} onChange={(e) => onChangeHandler(e.target.name, e.target.value)} placeholder="Product weight" />
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input name="isLiquid" checked={productModel.isLiquid} onChange={(e) => onChangeHandler(e.target.name, e.target.checked)} type="checkbox" />{' '}
                                Is liquild
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input name="isHidden" checked={productModel.isHidden} onChange={(e) => onChangeHandler(e.target.name, e.target.checked)} type="checkbox" />{' '}
                                Is hidden
                            </Label>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>{' '}
                    <Button color="primary" onClick={createOrUpdate}>{isCreate ? "Create" : "Update"}</Button>
                </ModalFooter>
            </Modal>

        </>
    )
}