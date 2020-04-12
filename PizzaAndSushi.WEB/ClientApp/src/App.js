import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/home-component/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { AdminComponent } from './components/admin-component/admin-component';
import { BasketReviewComponent } from './components/basket/basket-review'

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/counter' component={Counter} />
                <Route path='/fetch-data' component={FetchData} />
                <Route path='/admin' component={AdminComponent} />
                <Route path='/basket' component={BasketReviewComponent} />
            </Layout>
        );
    }
}
