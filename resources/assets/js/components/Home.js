import React from 'react'

import Carousel from './home/Carousel'
import Widgets from './home/Widgets'
import QuickView from './home/QuickView'

const Home = () => (
    <div>
		<QuickView />
		<Carousel title="New Products" id="1" />
		<hr/>
		{/* <Carousel title="Top Selling" id="2" /> */}
		<hr/>
        {/* <Widgets /> */}

    </div>
)

export default Home