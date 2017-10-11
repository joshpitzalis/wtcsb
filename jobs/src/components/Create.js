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
    location: undefined,
    statement: undefined,
    education: undefined,
    salary: undefined,
    info: undefined,
    experience: undefined,
    hours: [],
    licensure: ['None'],
    status: ['open'],
    to: null
  }

  //
  // handleInputChange(event) {
  //   const target = event.target;
  //   const value = target.type === 'checkbox' ? target.checked : target.value;
  //   const name = target.name;
  //
  //   this.setState({
  //     [name]: value
  //   });
  // }

  handleCategoryUpdate = e => {
    let category = this.state.category
    category = e
    this.setState({ category })
  }

  handleLocationUpdate = e => {
    let location = this.state.location
    location = e
    this.setState({ location })
  }

  handleEducationUpdate = e => {
    let education = this.state.education
    education = e
    this.setState({ education })
  }

  handleSalaryUpdate = e => {
    let salary = this.state.salary
    salary = e
    this.setState({ salary })
  }

  handleExperienceUpdate = e => {
    let experience = this.state.experience
    experience = e
    this.setState({ experience })
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

  handleLicensureUpdate = e => {
    let licensure = this.state.licensure
    licensure = e
    this.setState({ licensure })
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

  handleHoursUpdate = e => {
    let hours = []
    hours = e
    this.setState({ hours })
  }

  handleSubmit = () => {
    const newJobPostKey = database.ref(`/jobs`).push().key

    var jobData = {
      id: newJobPostKey,
      name: this.state.name || null,
      category: this.state.category || null,
      position: this.state.position || null,
      location: this.state.location || null,
      statement: this.state.statement || null,
      education: this.state.education || null,
      salary: this.state.salary || null,
      licensure: this.state.licensure || null,
      info: this.state.info || null,
      experience: this.state.experience || null,
      hours: (this.state.hours.length === 0 && ['TBD']) || this.state.hours,
      status: this.state.status,
      to: this.state.to
    }

    var updates = {}
    updates[`/jobs/${newJobPostKey}`] = jobData

    return database
      .ref()
      .update(updates)
      .then(this.setState({ to: '/dashboard' }))
      .catch(error => console.log(error.message))
  }

  render () {
    if (this.state.to) {
      return <Redirect to={this.state.to} />
    }

    return (
      <Page
        fullWidth
        title='Create New Job'
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
            <div className='measure-wide pa4 pl0-l pl0-m'>
              <FormLayout>
                <Select
                  id='createFormCategory'
                  label='Category'
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
                    'Other Categories'
                  ]}
                  placeholder='Pick a Category'
                  value={this.state.category}
                  onChange={this.handleCategoryUpdate}
                  // error={'hello'}
                />
                <TextField
                  id='createFormTitle'
                  label='Job Title'
                  value={this.state.name}
                  onChange={this.handleNameUpdate}
                  type='text'
                />
                <TextField
                  id='createFormPosition'
                  label='Position'
                  value={this.state.position}
                  onChange={this.handlePositionUpdate}
                  type='text'
                />
                <Select
                  id='createFormLocation'
                  label='Location'
                  options={[
                    'Suffolk',
                    'Isle of Wight',
                    'Southampton',
                    'Franklin',
                    'other locations'
                  ]}
                  placeholder='Pick a Location'
                  value={this.state.location}
                  onChange={this.handleLocationUpdate}
                  required
                />
                <TextField
                  id='createFormResponsibilities'
                  label='General Statement of Responsibilities'
                  value={this.state.statement}
                  onChange={this.handleStatementUpdate}
                  multiline={5}
                  type='text'
                />
                <Select
                  id='createFormEducation'
                  label='Education'
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
                  placeholder='Pick a Qualification'
                  value={this.state.education}
                  onChange={this.handleEducationUpdate}
                />
                <ChoiceList
                  allowMultiple
                  title='Hours'
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
                  selected={this.state.hours}
                  onChange={this.handleHoursUpdate}
                />
                <Select
                  id='createFormSalary'
                  label='Salary'
                  options={[
                    'To be decided',
                    'Less than $25K',
                    '$25K - $40K',
                    '$40K - $60K',
                    '$60K – $100K',
                    'More than $100K'
                  ]}
                  placeholder='Pick a Salary'
                  value={this.state.salary}
                  onChange={this.handleSalaryUpdate}
                />
                <ChoiceList
                  id='createFormLicensure'
                  title='Licensure Status'
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
                    },
                    {
                      label: 'None',
                      value: 'None'
                    }
                  ]}
                  selected={this.state.licensure}
                  onChange={this.handleLicensureUpdate}
                />
                <Select
                  id='createFormExperience'
                  label='Experience'
                  options={[
                    'None',
                    '1 year',
                    '3 years',
                    '5 years',
                    'More than 5 years'
                  ]}
                  placeholder='Pick a level of experience'
                  value={this.state.experience}
                  onChange={this.handleExperienceUpdate}
                />
                <TextField
                  id='createFormInfo'
                  label='Additional Information '
                  value={this.state.info}
                  onChange={this.handleInfoUpdate}
                  multiline={3}
                  type='text'
                />

                <ButtonGroup>
                  <Button onClick={() => this.setState({ complete: true })}>
                    Cancel
                  </Button>
                  <Button
                    primary
                    onClick={this.handleSubmit}
                    id='createFormSubmit'
                    disabled={
                      !this.state.name ||
                        !this.state.category ||
                        !this.state.position ||
                        !this.state.location ||
                        !this.state.statement ||
                        !this.state.education ||
                        !this.state.salary ||
                        !this.state.info ||
                        !this.state.experience
                    }
                  >
                    Create Job
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
