import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalFooter, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

export function ConfirmModal({ message, open, resultCallBack }) {
    const [modal, setModal] = useState(false);
    const toggle = (isConfirmed) => {
        setModal(false);
        resultCallBack(isConfirmed);
    }

    useEffect(() => {
        if (open) {
            setModal(true);
        }
    }, [open]);


    return (
        <>
            <Modal isOpen={modal} toggle={() => toggle(false)}>
                <ModalHeader toggle={() => toggle(false)}>{message}</ModalHeader>
                <ModalFooter>
                    <Button color="secondary" onClick={() => toggle(false)}>No</Button>{' '}
                    <Button color="primary" onClick={() => toggle(true)}>Yes</Button>
                </ModalFooter>
            </Modal>
        </>
        )
} 
