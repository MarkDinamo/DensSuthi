import React, { useEffect, useState } from 'react';
import { Label, Input, Form, FormGroup, NavItem, NavLink, Card, Button, Modal, ModalHeader, ModalBody, ModalFooter, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { ConfirmModal } from '../../components/shared/confirmModal'


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function CreateOrUpdateCategory(props) {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const isEdit = props.category != undefined
    const [categoryName, setCategoryName] = useState("");
    const [categoryPriority, setCategoryPriority] = useState(0);
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
            method = 'PUT'
        }
        fetch('api/ProductType', {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, name: categoryName, priority: categoryPriority })
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
                setToastMessage("deleted");
                setOpenSnack(true);
                props.refresh();
            })
    };

    const toggle = () => {
        if (props.category) {
            setCategoryName(props.category.name);
            setCategoryPriority(props.category.priority)
        }
        else {
            setCategoryName("");
            setCategoryPriority(0);
        }
        setModal(!modal);
    }

    const confirmModalCallBack = (confirmed) => {
        setIsOpenModal(false)
        if (confirmed) {
            deleteCategory();
        }
    }

    const OpenIsDeleteModal = () => {
        setIsOpenModal(true)
    }

    return (
        <>
            {isEdit
                ? <>
                    <Button onClick={toggle} color="primary">Edit</Button> {' '}
                    <ConfirmModal open={isOpenModal} message="Are you sure to remove category" resultCallBack={confirmModalCallBack}></ConfirmModal>
                    <Button onClick={OpenIsDeleteModal} color="danger">Delete</Button> {' '}
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
                        <Form>
                            <FormGroup>
                                <Label for="categoryName">Category name</Label>
                                <Input type="text" name="category" id="categoryName" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="Category name" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="categoryPriority">Category priority</Label>
                                <Input type="number" name="priority" id="categoryPriority" value={categoryPriority} onChange={(e) => setCategoryPriority(e.target.value)} placeholder="Category priority" />
                            </FormGroup>
                        </Form>
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