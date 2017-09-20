import React, { Component } from 'react'
import { database, auth } from '../firebase'
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

export default class Edit extends Component {
  state = {
    name: null,
    category: null,
    status: [],
    to: null
  }

  componentDidMount() {
    database.ref(`/jobs/${this.props.match.params.jobId}`).on('value', snap =>
      this.setState({
        id: snap.val().id,
        category: snap.val().category,
        name: snap.val().name,
        status: snap.val().status
      })
    )
  }

  handleNameUpdate = e => {
    let name = this.state.name
    name = e
    this.setState({ name })
  }

  handleCategoryUpdate = e => {
    let category = this.state.category
    category = e
    this.setState({ category })
  }

  handleStatusUpdate = e => {
    let status = this.state.status
    status = e
    this.setState({ status })
  }

  handleSubmit = () => {
    // const newJobPostKey = database.ref(`/jobs`).push().key
    var jobData = {
      id: this.state.id,
      name: this.state.name,
      category: this.state.category,
      status: this.state.status
    }

    const updates = {}
    updates[this.state.id] = jobData
    return database
      .ref(`/jobs`)
      .update(updates)
      .then(this.setState({ to: '/dashboard' }))
  }

  render() {
    if (this.state.to) {
      return <Redirect to={this.state.to} />
    }

    return (
      <Page
        fullWidth
        title="Create New Job"
        separator
        primaryAction={{ content: 'Logout', onAction: () => auth.signOut() }}
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
                label="Job Name"
                value={this.state.name}
                onChange={this.handleNameUpdate}
              />
              <TextField
                label="Category"
                value={this.state.category}
                onChange={this.handleCategoryUpdate}
              />
              <ChoiceList
                title="Status"
                selected={this.state.status}
                onChange={this.handleStatusUpdate}
                choices={[
                  {
                    label: 'Open',
                    value: 'open'
                  },
                  {
                    label: 'Closed',
                    value: 'closed'
                  }
                ]}
              />
              <ButtonGroup>
                <Button onClick={() => this.setState({ to: '/dashboard' })}>
                  Cancel
                </Button>
                <Button primary onClick={this.handleSubmit}>
                  Update
                </Button>
              </ButtonGroup>
            </FormLayout>
          </Layout.Section>
        </Layout>
      </Page>
    )
  }
}
