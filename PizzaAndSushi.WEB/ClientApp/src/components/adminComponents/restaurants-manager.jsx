import React, { useEffect, useState } from 'react';
import { Table, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, CustomInput } from 'reactstrap';
import { DeleteRestoraunt } from '../adminComponents/restorauntActions/delete-restoraunt'
import { CreateRestoraunt } from '../adminComponents/restorauntActions/CreateOrUpdateRestoraunt'

export function RestaurantsManager(props) {
    const [restoraunts, setRestoraunts] = useState([]);

    useEffect(() => {
        refresh();
    }, []);

    const refresh = () => {
        fetch('api/Restoraunt')
            .then((response) => response.json())
            .then(data => setRestoraunts(data))
    }

    return (
        <div>
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
                            <td>{restoraunt.address}</td>
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