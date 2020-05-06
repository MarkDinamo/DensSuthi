import React, { useEffect, useState } from 'react';
import { Table, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, CustomInput } from 'reactstrap';
import { DeleteProduct } from '../adminComponents/productManagerActions/deleteProduct'

export function ProductManager(props) {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('api/ProductType')
            .then((responce) => responce.json())
            .then((data) => setCategories(data));

        refresh();
    }, []);

    const refresh = () => {
        fetch('api/product/get/0/100')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data.items);
            });
    }

    const getCategoryName = (id) => {
        let category = categories.find(e => e.id == id);
        return category.name;
    }

    return (
        <div>
            <Table striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Is hidden</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) =>
                        <tr key={product.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{product.name}</td>
                            <td>
                                {getCategoryName(product.id)}
                            </td>
                            <td>{product.price}</td>
                            <td><CustomInput  type="checkbox" disabled checked={product.isHidden} /></td>
                            <td>
                                <DeleteProduct product={product}></DeleteProduct>
                            </td>
                        </tr>
                    )
                    }
                </tbody>
            </Table>
        </div>
    )
}