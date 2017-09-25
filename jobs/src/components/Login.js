import React, { Component } from 'react'
import { auth } from '../firebase'
import firebase from 'firebase'
import {
  Page,
  Layout,
  FormLayout,
  TextField,
  ChoiceList,
  ButtonGroup,
  Button
} from '@shopify/polaris'
import { Redirect } from 'react-router-dom'

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    error: null,
    to: null
  }

  handleEmailUpdate = e => {
    let email = this.state.email
    email = e
    this.setState({ email })
  }

  handlePasswordUpdate = e => {
    let password = this.state.password
    password = e
    this.setState({ password })
  }

  handleSubmit = () => {
    auth
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        return auth
          .signInWithEmailAndPassword(this.state.email, this.state.password)
          .then(this.setState({ to: '/dashboard' }))
          .catch(error => this.setState({ error: error.message }))
      })
      .catch(error => this.setState({ error: error.message }))
  }

  render() {
    if (this.state.to) {
      return <Redirect to={this.state.to} />
    }

    if (this.props.authed) {
      return <Redirect to={'/dashboard'} />
    }

    return (
      <Page
        fullWidth
        title="WTCSB EMPLOYMENT PORTAL"
        separator
        secondaryActions={[
          {
            content: 'Back to Homepage',
            onAction: () => this.setState({ to: '/' })
          }
        ]}
      >
        <Layout>
          <Layout.Section secondary>
            <FormLayout>
              <TextField
                label="Email"
                type="email"
                value={this.state.email}
                onChange={this.handleEmailUpdate}
              />
              <TextField
                label="Password"
                value={this.state.password}
                type="password"
                onChange={this.handlePasswordUpdate}
              />
              {this.state.error && <p>{this.state.error}</p>}
              <ButtonGroup>
                <Button onClick={() => this.setState({ to: '/' })}>
                  Cancel
                </Button>
                <Button primary onClick={this.handleSubmit}>
                  Login
                </Button>
              </ButtonGroup>
            </FormLayout>
          </Layout.Section>
        </Layout>
      </Page>
    )
  }
}
