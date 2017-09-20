import React, { Component } from 'react'
import { database } from '../firebase'
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

export default class Create extends Component {
  state = {
    name: null,
    category: null,
    status: [],
    complete: null
  }

  handleNameUpdate = e => {
    let name = this.state.name
    name = e
    this.setState({ name })
  }

  handleEmailUpdate = e => {
    let email = this.state.email
    email = e
    this.setState({ email })
  }

  handleSubmit = () => {
    const newJobPostKey = database
      .ref(`/jobs/${this.props.match.params.jobId}/applicants`)
      .push().key
    var jobData = {
      id: newJobPostKey,
      name: this.state.name,
      email: this.state.email
    }

    const updates = {}
    updates[newJobPostKey] = jobData
    return database
      .ref(`/jobs/${this.props.match.params.jobId}/applicants`)
      .update(updates)
      .then(this.setState({ complete: true }))
  }

  render() {
    if (this.state.complete) {
      return <Redirect to={'/dashboard'} />
    }

    return (
      <Page
        fullWidth
        title="Create New Job"
        separator
        secondaryActions={[
          {
            content: 'Back to Dashboard',
            onAction: () => this.setState({ to: '/dashboard' })
          }
        ]}
      >
        <Layout>
          <Layout.Section secondary>
            <FormLayout>
              <TextField
                label="Your Name"
                value={this.state.name}
                onChange={this.handleNameUpdate}
              />
              <TextField
                label="Email"
                value={this.state.email}
                onChange={this.handleEmailUpdate}
              />

              <ButtonGroup>
                <Button onClick={() => this.setState({ complete: true })}>
                  Cancel
                </Button>
                <Button primary onClick={this.handleSubmit}>
                  Apply
                </Button>
              </ButtonGroup>
            </FormLayout>
          </Layout.Section>
        </Layout>
      </Page>
    )
  }
}
