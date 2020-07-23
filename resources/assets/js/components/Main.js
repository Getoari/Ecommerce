import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from './Home'
import ShoppingCart from './pages/ShoppingCart'
import Checkout from './pages/Checkout'
import Wishlist from './pages/Wishlist'

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/shopping-cart' component={props => <ShoppingCart {...props}/>} />
            <Route exact path='/checkout' component={Checkout} />
            <Route exact path='/wishlist' component={props => <Wishlist {...props}/>} />
        </Switch>
    </main>
)

export default Main
