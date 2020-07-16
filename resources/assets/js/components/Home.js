import React from 'react'
import HotDeals from './home/HotDeals'
import Checkout from './home/Checkout'


import Carousel from './home/Carousel'
import Widgets from './home/Widgets'


const Home = () => (
    <div>

		<Carousel title="New Products" id="1" />
		<hr/>
		<Carousel title="Top Selling" id="2" />
       
       <Carousel title="New Products" id="1" />
       <HotDeals />
		<Carousel title="Top Selling" id="1" />
		<hr/>
        <Widgets />
        
       

    </div>
)

export default Home