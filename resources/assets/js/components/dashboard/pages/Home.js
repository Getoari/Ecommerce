import React, { Component } from 'react'
import axios from 'axios'

import { numberWithComma } from '../functions/NumberFunctions'
import LineChart from '../charts/LineChart'
import PieChart from '../charts/PieChart'


class Home extends Component {
  constructor() {
    super()

    this.state = {
      annualEarning: [],
      monthlyEarning: [],
      ordersCompletedRato: 0,
      ordersPending: 0,
      revenueSources: [] 
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    axios.get('/api/dashboard').then( result => {
      console.log(result.data.revenue_sources)
      this.setState({
        annualEarning: result.data.annual_earnings,
        monthlyEarning: result.data.monthly_earnings,
        ordersCompletedRato: result.data.orders_completed_ratio.toFixed(2)*100,
        ordersPending: result.data.orders_pending,
        revenueSources: result.data.revenue_sources
      })
    }
    )
  }

  render() {

    let sum = 0
    let annualEarningAvg = 0
    let monthlyEarningAvg = 0

    if(this.state.annualEarning) {
      this.state.annualEarning.map(y => sum += y.sums)
      annualEarningAvg = sum / this.state.annualEarning.length
    } 

    
    if(this.state.monthlyEarning) {
      sum = 0
      this.state.monthlyEarning.map(m => sum += m.sums)
      monthlyEarningAvg = sum / this.state.monthlyEarning.length 
    }
    
    const sourceNames = this.state.revenueSources.map(s => s.name)

    return (
      <div className="container-fluid">
        {/* <!-- Page Heading --> */}
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
          <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i className="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
        </div>

        {/* <!-- Content Row --> */}
        <div className="row">

          {/* <!-- Earnings (Monthly) Card Example --> */}
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Earnings (Monthly)</div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">${monthlyEarningAvg ? numberWithComma(monthlyEarningAvg.toFixed(0)) : 0}</div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Earnings (Monthly) Card Example --> */}
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-success shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Earnings (Annual)</div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">${annualEarningAvg ? numberWithComma(annualEarningAvg.toFixed(0)) : 0}</div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Earnings (Monthly) Card Example --> */}
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-info shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Orders Completed</div>
                    <div className="row no-gutters align-items-center">
                      <div className="col-auto">
                        <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{this.state.ordersCompletedRato}%</div>
                      </div>
                      <div className="col">
                        <div className="progress progress-sm mr-2">
                          <div className="progress-bar bg-info" role="progressbar" style={{width: `${this.state.ordersCompletedRato}%`}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Pending Requests Card Example --> */}
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-warning shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Pending Orders</div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.ordersPending}</div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-comments fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Content Row --> */}

        <div className="row">

          {/* <!-- Area Chart --> */}
          <div className="col-xl-8 col-lg-7">
            <div className="card shadow mb-4">
              {/* <!-- Card Header - Dropdown --> */}
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Earnings Overview</h6>
                <div className="dropdown no-arrow">
                  <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                    <div className="dropdown-header">Dropdown Header:</div>
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">Something else here</a>
                  </div>
                </div>
              </div>
              {/* <!-- Card Body --> */}
              <div className="card-body">
                <div className="chart-area">
                  {this.state.monthlyEarning.length > 0 && <LineChart data={this.state.monthlyEarning} />}
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Pie Chart --> */}
          <div className="col-xl-4 col-lg-5">
            <div className="card shadow mb-4">
              {/* <!-- Card Header - Dropdown --> */}
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Revenue Sources</h6>
                <div className="dropdown no-arrow">
                  <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                    <div className="dropdown-header">Dropdown Header:</div>
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">Something else here</a>
                  </div>
                </div>
              </div>
              {/* <!-- Card Body --> */}
              <div className="card-body">
                <div className="chart-pie pt-4 pb-2">
                  {this.state.revenueSources.length > 0 && <PieChart data={this.state.revenueSources} />}
                </div>
                <div className="mt-4 text-center small">
                  {sourceNames.length > 0 && 
                  <span className="mr-2">
                        <i className="fas fa-circle text-primary"></i> {sourceNames[0]}
                  </span>
                  }
                  {sourceNames.length > 1 && 
                  <span className="mr-2">
                    <i className="fas fa-circle text-success"></i> {sourceNames[1]}
                  </span>
                  }
                  {sourceNames.length > 2 &&
                  <span className="mr-2">
                    <i className="fas fa-circle text-info"></i> {sourceNames[2]}
                  </span>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

} 
  


export default Home