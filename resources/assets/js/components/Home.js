import React from 'react'

import Carousel from './home/Carousel'
import Widgets from './home/Widgets'

const Home = () => (
    <div>

		<Carousel title="New Products" position="1" />
		<hr/>
		<Carousel title="Top Selling" position="2" />
		<hr/>
        <Widgets />

    </div>
)

export default Home