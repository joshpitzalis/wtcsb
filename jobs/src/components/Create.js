import React, { Component } from 'react'
import { database, auth } from '../firebase'
import {
  Page,
  Layout,
  FormLayout,
  TextField,
  ChoiceList,
  ButtonGroup,
  Button,
  Select
} from '@shopify/polaris'
import { Redirect } from 'react-router-dom'

export default class Create extends Component {
  state = {
    category: undefined,
    name: undefined,
    position: undefined,
    status: [],
    to: undefined,
    location: undefined,
    statement: undefined,
    education: undefined,
    salary: undefined,
    info: undefined
  }

  handleNameUpdate = e => {
    let name = this.state.name
    name = e
    this.setState({ name })
  }

  handlePositionUpdate = e => {
    let position = this.state.position
    position = e
    this.setState({ position })
  }

  handleStatusUpdate = e => {
    let status = this.state.status
    status = e
    this.setState({ status })
  }

  handleStatementUpdate = e => {
    let statement = this.state.statement
    statement = e
    this.setState({ statement })
  }

  handleInfoUpdate = e => {
    let info = this.state.info
    info = e
    this.setState({ info })
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
            <div className="measure-wide pa4 pl0-l pl0-m">
              <FormLayout>
                <Select
                  label="Category"
                  options={[
                    'Clinical',
                    'Case Management',
                    'Child & Family',
                    'Emergency',
                    'Rehabilitation',
                    'Residential',
                    'Administrative',
                    'Medical',
                    'Psychiatrist',
                    'Other'
                  ]}
                  placeholder="Pick a Category"
                  value={this.state.category}
                />
                <TextField
                  label="Job Title"
                  value={this.state.name}
                  onChange={this.handleNameUpdate}
                />
                <TextField
                  label="Position"
                  value={this.state.position}
                  onChange={this.handlePositionUpdate}
                />
                <Select
                  label="Location"
                  options={[
                    'Suffolk',
                    'Isle of Wight',
                    'Southampton',
                    'Franklin',
                    'Other'
                  ]}
                  placeholder="Pick a Location"
                  value={this.state.location}
                />
                <TextField
                  label="General Statement of Responsibilities"
                  value={this.state.statement}
                  onChange={this.handleStatementUpdate}
                  multiline={5}
                />
                <Select
                  label="Education"
                  options={[
                    'Associates',
                    'Bachelors',
                    'Bachelors in Human Services',
                    'HS/GED',
                    'Masters',
                    'Ph.D.',
                    'MD',
                    'DO',
                    'NP',
                    'PA'
                  ]}
                  placeholder="Pick a Location"
                  value={this.state.education}
                />
                <ChoiceList
                  allowMultiple
                  title="Hours"
                  choices={[
                    {
                      label: 'Days',
                      value: 'days'
                    },
                    {
                      label: 'Evenings',
                      value: 'evenings'
                    },
                    {
                      label: 'Rotating',
                      value: 'rotating'
                    }
                  ]}
                  selected={[]}
                />
                <Select
                  label="Salary"
                  options={[
                    'Less than $25K',
                    '$25K - $40K',
                    '$40K - $60K',
                    '$60K – $100K',
                    'More than $100K'
                  ]}
                  placeholder="Pick a Salary"
                  value={[]}
                />
                <ChoiceList
                  title="Licensure Status"
                  choices={[
                    {
                      label: 'QMHP-A',
                      value: 'QMHP-A'
                    },
                    {
                      label: 'QMHP-C',
                      value: 'QMHP-C'
                    },
                    {
                      label: 'QDDP',
                      value: 'QDDP'
                    },
                    {
                      label: 'CSAC',
                      value: 'CSAC'
                    },
                    {
                      label: 'PA',
                      value: 'PA'
                    },
                    {
                      label: 'NP',
                      value: 'NP'
                    },
                    {
                      label: 'CNA',
                      value: 'CNA'
                    },
                    {
                      label: 'PCA',
                      value: 'PCA'
                    },
                    {
                      label: 'Licensed Resident/Supervisee',
                      value: 'Licensed Resident/Supervisee'
                    },
                    {
                      label: 'LPN',
                      value: 'LPN'
                    },
                    {
                      label: 'RN',
                      value: 'RN'
                    }
                  ]}
                  selected={[]}
                />
                <Select
                  label="Experience"
                  options={[
                    'None',
                    '1 year',
                    '3 years',
                    '5 years',
                    'More than $100K'
                  ]}
                  placeholder="Pick a Salary"
                  value={[]}
                />
                <TextField
                  label="Additional Information "
                  value={this.state.info}
                  onChange={this.handleInfoUpdate}
                  multiline={3}
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
            </div>
          </Layout.Section>
        </Layout>
      </Page>
    )
  }
}
