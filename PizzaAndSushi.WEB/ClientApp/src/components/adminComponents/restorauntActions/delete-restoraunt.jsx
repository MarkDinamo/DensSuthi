import React, { useEffect, useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { SuchiSnackBar } from '../../shared/sushiSnackbar'
import { ConfirmModal } from '../../shared/confirmModal'

export function DeleteRestoraunt(props) {
    const [isOpenSnack, setIsOpenSnack] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const deleteRestoraunt = () => {
        setIsOpenSnack(false);
        fetch(`api/restoraunt/${props.restoraunt.id}`)
            .then(response => response.text())
            .then(text => {
                setIsOpenSnack(true);
                props.refresh();
            });
    }

    const confirmModalCallBack = (confirmed) => {
        console.log(confirmed);
    }

    return (
        <>
            <SuchiSnackBar isOpen={isOpenSnack} message="Restoraunt was removed successfully" ></SuchiSnackBar>
            <ConfirmModal open={isOpenModal} message="Are you sure to remove restoraunt" resultCallBack={confirmModalCallBack}></ConfirmModal>
            <Button onClick={deleteRestoraunt} color="danger">Delete</Button>
        </>
        )
}