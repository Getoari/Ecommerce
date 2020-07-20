import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home'
import ShoppingCart from './pages/ShoppingCart'
import Checkout from './pages/Checkout'


const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/shopping-cart' component={props => <ShoppingCart {...props}/>} />
            <Route exact path='/checkout' component={Checkout} />
        </Switch>
    </main>
)

export default Main
