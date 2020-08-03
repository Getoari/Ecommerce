import React from 'react'

import Main from './Main'
import Sidebar from './container/Sidebar'
import Topbar from './container/Topbar'
import Footer from './container/Footer'

const App = () => (
    <React.Fragment>
        <Sidebar />

        {/* <!-- Content Wrapper --> */}
        <div id="content-wrapper" className="d-flex flex-column">
            {/* <!-- Main Content --> */}
            <div id="content">
                <Topbar />
                <Main />
            </div>
        <Footer />
        </div>
    </React.Fragment>
)

export default App

