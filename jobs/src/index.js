import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Dashboard from './components/Dashboard'
import Home from './components/Homepage'
import Create from './components/Create'
import Edit from './components/Edit'
import Applicants from './components/Applicants'
import Job from './components/Job'
import JobApplication from './components/JobApplication'
import Login from './components/Login'
import { auth } from './firebase'

import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom'

// These hoc components allow you to pass props into a route component
const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest)
  return React.createElement(component, finalProps)
}

const PrivateRoute = ({ component, authed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps =>
        authed === true ? (
          renderMergedProps(component, routeProps, rest)
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: routeProps.location } }}
          />
        )}
    />
  )
}

class App extends Component {
  state = {
    authed: false
  }
  componentDidMount() {
    this.removeListener = auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authed: true
        })
      } else {
        this.setState({
          authed: false
        })
      }
    })
  }
  componentWillUnmount() {
    this.removeListener()
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Home} />
          <PrivateRoute
            exact
            path="/dashboard"
            component={Dashboard}
            authed={this.state.authed}
          />
          <PrivateRoute
            exact
            path="/create"
            component={Create}
            authed={this.state.authed}
          />
          <PrivateRoute
            exact
            path="/edit/:jobId"
            component={Edit}
            authed={this.state.authed}
          />
          <PrivateRoute
            exact
            path="/applicants/:jobId"
            component={Applicants}
            authed={this.state.authed}
          />
          <Route exact path="/job/:jobId" component={Job} />
          <Route exact path="/apply/:jobId" component={JobApplication} />
          <Route exact path="/login" component={Login} />
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
