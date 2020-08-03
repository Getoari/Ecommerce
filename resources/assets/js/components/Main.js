import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from './Home'
import ShoppingCart from './pages/ShoppingCart'
import Checkout from './pages/Checkout'
import Wishlist from './pages/Wishlist'
import Product from './pages/Product'

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/shopping-cart' component={props => <ShoppingCart {...props}/>} />
            <Route exact path='/checkout' component={props => <Checkout {...props}/>} />
            <Route exact path='/wishlist' component={props => <Wishlist {...props}/>} />
            <Route exact path='/products' component={Product} />
        </Switch>
    </main>
)

export default Main
