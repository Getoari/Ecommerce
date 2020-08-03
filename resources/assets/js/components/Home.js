import React from 'react'
import HotDeals from './home/HotDeals'

import Collections from './home/Collections'
import Carousel from './home/Carousel'
import Widgets from './home/Widgets'
import ToastMessage from './home/ToastMessage'

function Home(props) {

    return (
        <div>
            <Collections />
            <ToastMessage />
            <Carousel title="New Products" id="1" />
            
            <HotDeals />
    
            <Carousel title="Top Selling" id="2" />
            <Widgets />    
        </div>
    )
} 


export default Home