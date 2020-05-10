import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { HomeComponent } from './components/Home';
import { AdminComponent } from './components/adminComponents/admin'
import { BasketMain } from './components/basket/basketMain'
import { CheckOrderStatus } from './components/CheckMyOrder'

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={HomeComponent} />
                <Route exact path='/admin' component={AdminComponent} />
                <Route exact path='/basket' component={BasketMain} />
                <Route exact path='/checkOrder' component={CheckOrderStatus} />
            </Layout>
        );
    }
}
