import React, { Component } from 'react'
import { auth } from '../firebase'
import { Redirect } from 'react-router-dom'

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    to: null
  }

  handleEmailUpdate = e => {
    let email = this.state.email
    email = e.target.value
    this.setState({ email })
  }

  handlePasswordUpdate = e => {
    let password = this.state.password
    password = e.target.value
    this.setState({ password })
  }

  handleSubmit = () => {
    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(this.setState({ to: '/dashboard' }))
      .catch(error => this.setState({ error: error.message }))
  }

  render() {
    if (this.state.to) {
      return <Redirect to={this.state.to} />
    }

    return (
      <main className="pa4 black-80">
        <h1>WTCSB EMPLOYMENT PORTAL</h1>
        <form className="measure center" onSubmit={this.handleSubmit}>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend
              className="f4 fw6 ph0 mh0"
              onClick={() => this.setState({ to: '/' })}
            >
              Back to Homepage
            </legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                value={this.state.email}
                onChange={e => this.handleEmailUpdate(e)}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                value={this.state.password}
                onChange={this.handlePasswordUpdate}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Login"
              onClick={this.handleSubmit}
            />
          </div>
        </form>
      </main>
    )
  }
}
