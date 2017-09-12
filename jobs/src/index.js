import React from 'react'
import ReactDOM from 'react-dom'
import Dashboard from './components/Dashboard'
import Home from './components/Homepage'
import Create from './components/Create'
import Applicants from './components/Applicants'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter, Route, Link } from 'react-router-dom'

const App = () =>
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/dashboard" component={Home} />
      <Route exact path="/create" component={Create} />
      <Route exact path="/job/:jobId" component={Applicants} />
    </div>
  </BrowserRouter>

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
