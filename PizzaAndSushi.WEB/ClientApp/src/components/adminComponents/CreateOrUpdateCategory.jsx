import React, { useEffect, useState } from 'react';
import { Label, Input, TabPane, Nav, NavItem, NavLink, Card, Button, Modal, ModalHeader, ModalBody, ModalFooter, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function CreateOrUpdateCategory(props) {
    const isEdit = props.category != undefined
    const [categoryName, setCategoryName] = useState("");
    const [toastMessage, setToastMessage] = useState("");
    const [modal, setModal] = useState(false);
    const [openSnack, setOpenSnack] = useState(false);
    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };

    const closeModalPrepation = () => {
        setModal(!modal)
        setOpenSnack(true);
        setCategoryName("");
        props.refresh();
    }

    const createOrUpdate = () => {
        let id = 0;
        let method = 'POST'
        if (props.category) {
            id = props.category.id;
            method ='PUT'
        }
        fetch('api/ProductType', {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, name: categoryName })
        })
            .then((response) => {
                closeModalPrepation();
                if (isEdit) {
                    setToastMessage("updated");
                } else {
                    setToastMessage("created");
                }
            })
    }

    const deleteCategory = () => {
        fetch('api/ProductType/' + props.category.id, {
            method: 'DELETE',

        })
            .then((response) => {
                setOpenSnack(true);
                setToastMessage("deleted");
                props.refresh();
            })
    };

    const toggle = () => {
        if (props.category) {
            setCategoryName(props.category.name);
        }
        else {
            setCategoryName("");
        }
        setModal(!modal);
    }

    return (
        <>
            {isEdit
                ? <>
                    <Button onClick={toggle} color="primary">Edit</Button> {' '}
                    <Button onClick={deleteCategory} color="danger">Delete</Button> {' '}
                </>
                : <Button onClick={toggle} color="success">Create</Button>
            }

            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
                <Alert onClose={handleCloseSnack} severity="success">
                    Category was {toastMessage} successfully
                </Alert>
            </Snackbar>

            <div>
                <Modal isOpen={modal} toggle={toggle}>
                    {
                        isEdit ? <ModalHeader toggle={toggle}>Edit category</ModalHeader> : <ModalHeader toggle={toggle}>Create category</ModalHeader>
                    }
                    <ModalBody>
                        <Label for="categoryName">Category name</Label>
                        <Input type="text" name="category" id="categoryName" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="Category name" />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                        <Button color="success" onClick={createOrUpdate}>{isEdit ? 'Update' : 'Create'}</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        </>
    )
}