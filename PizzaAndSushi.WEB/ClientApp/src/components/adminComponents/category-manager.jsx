import React, { useEffect, useState } from 'react';
import { Table, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { CreateOrUpdateCategory } from '../adminComponents/CreateOrUpdateCategory'

export function CategoryManager(props) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        fetch('api/ProductType')
            .then((responce) => responce.json())
            .then((data) => setCategories(data))
    }

    return (
        <div>
            <br />
            <CreateOrUpdateCategory refresh={fetchData}></CreateOrUpdateCategory>
            <br />
            <Table striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Category Name</th>
                        <th>Priority</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) =>
                        <tr key={category.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{category.name}</td>
                            <td>{category.priority}</td>
                            <td>
                                <CreateOrUpdateCategory refresh={fetchData} category={category}></CreateOrUpdateCategory>
                            </td>
                        </tr>
                    )
                    }
                </tbody>
            </Table>
        </div>
    )
}