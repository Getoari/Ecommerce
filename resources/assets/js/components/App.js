import React from 'react'

import Header from './Header'
import Nav from './Nav'
import Main from './Main'
import Footer from './Footer'
import NewsLetter from './NewsLetter'
import QuickView from './home/QuickView'


const App = () => (
    <div>
        <QuickView />
        <Header/>
        <Nav/>
        <Main/>
        <NewsLetter/>
        <Footer/>
    </div>

)

export default App

