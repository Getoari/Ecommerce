import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Products from './pages/Products'
import NewProduct from './pages/NewProduct'

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/dashboard/' component={Home}/>
            <Route exact path='/dashboard/products' component={Products}/>
            <Route exact path='/dashboard/new-product' component={NewProduct}/>
        </Switch>
    </main>
)

export default Main
