import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { SuchiSnackBar } from '../../shared/sushiSnackbar'

export function CreateRestoraunt({ refresh }) {
    console.log(refresh);
    const [address, setAddress] = useState("");
    const [open, setOPen] = useState(false);

    const createRestoraunt = () => {
        setOPen(false);
        fetch('api/Restoraunt',
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: 0, address: address })
            })
            .then((response) => response.text())
            .then(data => {
                setOPen(true);
                refresh();
            })
    }

    return (
        <>
            <SuchiSnackBar isOpen={open} message={"Restoraunt created"}></SuchiSnackBar>
            <Form>
                <FormGroup>
                    <Label for="resturaunt">Address</Label>
                    <Input type="text" name="resturaunt" id="resturaunt" onChange={(e) => setAddress(e.target.value)} value={address} placeholder="Address" />
                </FormGroup>
                <Button color="success" onClick={createRestoraunt}>Create</Button>
            </Form>
        </>
    )
}