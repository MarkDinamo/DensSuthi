import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { HomeComponent } from './components/Home';
import { AdminComponent } from './components/adminComponents/admin'

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={HomeComponent} />
                <Route exact path='/admin' component={AdminComponent} />
            </Layout>
        );
    }
}
