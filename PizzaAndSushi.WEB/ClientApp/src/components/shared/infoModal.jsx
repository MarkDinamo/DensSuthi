import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalFooter, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { useHistory } from "react-router-dom";

export function InfoModal({ message, open, redirectTo }) {
    let history = useHistory();
    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(false);
        if (redirectTo) {
            history.push(redirectTo);
        }
    }

    useEffect(() => {
        if (open) {
            setModal(true);
        }
    }, [open]);


    return (
        <>
            <Modal isOpen={modal} toggle={() => toggle()}>
                <ModalHeader toggle={() => toggle()}>{message}</ModalHeader>
                <ModalFooter>
                    <Button color="primary" onClick={() => toggle()}>Ok</Button>
                </ModalFooter>
            </Modal>
        </>
        )
}
