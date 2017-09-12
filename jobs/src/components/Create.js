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
    const newJobPostKey = database.ref(`/jobs`).push().key
    var jobData = {
      id: newJobPostKey,
      name: this.state.name,
      category: this.state.category,
      status: this.state.status
    }

    const updates = {}
    updates[newJobPostKey] = jobData
    return database
      .ref(`/jobs`)
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
        breadcrumbs={[
          {
            content: 'Dashboard',
            url: '/dashboard'
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
                <Button onClick={() => this.setState({ complete: true })}>
                  Cancel
                </Button>
                <Button primary onClick={this.handleSubmit}>
                  Create
                </Button>
              </ButtonGroup>
            </FormLayout>
          </Layout.Section>
        </Layout>
      </Page>
    )
  }
}
