import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { ProductGrid } from '../components/product-grid'

export function CategoriesView(props) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('api/ProductType/getWithProducts')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setItems(data);
            });
    }, [])

    return (
        <>
            {
                items.map((category) =>
                    <div key={category.id}>
                        <div className="center-flex marging-top-10">
                            <h4>
                                {category.name}
                            </h4>
                        </div>

                        <ProductGrid products={category.products}></ProductGrid>
                    </div>
                )
            }
        </>
    )
}