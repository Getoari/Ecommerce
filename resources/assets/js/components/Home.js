import React from 'react'

import Carousel from './home/Carousel'
import Widgets from './home/Widgets'

const Home = () => (
    <div>

		<Carousel title="New Products" id="1" />
		<hr/>
		<Carousel title="Top Selling" id="2" />
		<hr/>
        {/* <Widgets /> */}

    </div>
)

export default Home