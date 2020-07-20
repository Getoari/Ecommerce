import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home'
import ShoppingCart from './pages/ShoppingCart'


const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/shopping-cart' component={props => <ShoppingCart {...props}/>} />
        </Switch>
    </main>

  
)



export default Main
