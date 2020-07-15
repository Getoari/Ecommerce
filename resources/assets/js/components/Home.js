import React from 'react'
<<<<<<< Updated upstream
=======
import HotDeals from './home/HotDeals'
import Checkout from './home/Checkout'

>>>>>>> Stashed changes

import Carousel from './home/Carousel'
import Widgets from './home/Widgets'


const Home = () => (
    <div>

<<<<<<< Updated upstream
		<Carousel title="New Products" id="1" />
		<hr/>
		<Carousel title="Top Selling" id="2" />
=======
       
       <Carousel title="New Products" id="1" />
       <HotDeals />
		<Carousel title="Top Selling" id="1" />
>>>>>>> Stashed changes
		<hr/>
        <Widgets />
        <Checkout />
       

    </div>
)

export default Home