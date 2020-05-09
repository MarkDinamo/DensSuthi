import React, { useEffect, useState } from 'react';
import { Table, Input, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, CustomInput } from 'reactstrap';
import { DeleteRestoraunt } from '../adminComponents/restorauntActions/delete-restoraunt'
import { CreateRestoraunt } from '../adminComponents/restorauntActions/CreateOrUpdateRestoraunt'
import { SuchiSnackBar } from '../shared/sushiSnackbar';
import * as _ from 'lodash';

export function RestaurantsManager(props) {
    const [restoraunts, setRestoraunts] = useState([]);
    const [snack, setSnack] = useState(false);

    useEffect(() => {
        refresh();
    }, []);

    const refresh = () => {
        fetch('api/Restoraunt')
            .then((response) => response.json())
            .then(data => setRestoraunts(data))
    }

    const onChangeHandler = (id, value) => {
        console.log(1);
        let copy = _.cloneDeep(restoraunts);
        let restoraunt = copy.find(e => e.id == id);
        restoraunt.address = value;
        setRestoraunts(copy);
        
    }

    const confirm = (restoraunt) => {
        setSnack(false);
        fetch('api/Restoraunt',
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(restoraunt)
            })
            .then((response) => response.text())
            .then(data => {
                setSnack(true);
            })
    }

    return (
        <div>
            <SuchiSnackBar isOpen={snack} message={"Address updated"} ></SuchiSnackBar>
            <CreateRestoraunt refresh={refresh}></CreateRestoraunt>
            <Table striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {restoraunts.map((restoraunt, index) =>
                        <tr key={restoraunt.id}>
                            <th scope="row">{index + 1}</th>
                            <td>
                                <Row>
                                    <Col xs="9">
                                        <Input type="text" name="resturaunt" id="resturaunt" onChange={(e) => onChangeHandler(restoraunt.id, e.target.value)} value={restoraunt.address} placeholder="Address" />
                                    </Col>
                                    <Col xs="3">
                                        <Button color="success" onClick={() => confirm(restoraunt)}>Update</Button>
                                    </Col>
                                </Row>
                            </td>

                            <td>
                                <DeleteRestoraunt refresh={refresh} restoraunt={restoraunt}></DeleteRestoraunt>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}