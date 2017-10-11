import React, { Component } from 'react'
import { database } from '../firebase'
import { Redirect, Link } from 'react-router-dom'
import { Page, Layout, Card, FormLayout, Checkbox } from '@shopify/polaris'
import { Checkbox as Checkbx, CheckboxGroup } from 'react-checkbox-group'

export default class App extends Component {
  state = {
    jobs: null,
    masterJobs: null,
    to: null,
    selected: [],
    categories: [],
    locations: [],
    education: [],
    timings: [],
    licensure: [],
    experience: []
  }

  componentDidMount () {
    database.ref(`/jobs`).on('value', snap => {
      snap.exists() &&
        this.setState({
          jobs: Object.values(snap.val()),
          masterJobs: Object.values(snap.val())
        })
    })
  }

  siftCategories (selection) {
    const joby = [...this.state.jobs]

    const jobs = []

    this.state.categories.forEach(filter => {
      const results = joby.filter(job => job.category === filter)
      jobs.push(...results)
    })

    this.setState({ jobs })
  }

  siftLocations (selection) {
    const joby = [...this.state.jobs]

    const jobs = []

    this.state.locations.forEach(filter => {
      const results = joby.filter(job => job.location === filter)
      jobs.push(...results)
    })

    this.setState({ jobs })
  }

  siftEducation (selection) {
    const joby = [...this.state.jobs]

    const jobs = []

    this.state.education.forEach(filter => {
      const results = joby.filter(job => job.education === filter)
      jobs.push(...results)
    })

    this.setState({ jobs })
  }

  siftTimings (selection) {
    const joby = [...this.state.jobs]

    const jobs = []

    this.state.timings.forEach(filter => {
      const results = joby.filter(job => job.hours.includes(filter))
      jobs.push(...results)
    })

    this.setState({ jobs })
  }

  siftLicensure (selection) {
    const joby = [...this.state.jobs]

    const jobs = []

    this.state.licensure.forEach(filter => {
      const results = joby.filter(job => job.licensure.includes(filter))
      jobs.push(...results)
    })

    this.setState({ jobs })
  }

  siftExperience (selection) {
    const joby = [...this.state.jobs]

    const jobs = []

    this.state.experience.forEach(filter => {
      const results = joby.filter(job => job.experience === filter)
      jobs.push(...results)
    })

    this.setState({ jobs })
  }

  runFilters = () => {
    this.setState({ jobs: [...this.state.masterJobs] }, async () => {
      await this.state.categories.forEach(filter => this.siftCategories(filter))
      await this.state.locations.forEach(filter => this.siftLocations(filter))
      await this.state.education.forEach(filter => this.siftEducation(filter))
      await this.state.timings.forEach(filter => this.siftTimings(filter))
      await this.state.licensure.forEach(filter => this.siftLicensure(filter))
      await this.state.experience.forEach(filter => this.siftExperience(filter))
    })
  }

  categoriesChanged = newCategories => {
    this.setState(
      {
        categories: newCategories
      },
      () => this.runFilters()
    )
  }

  locationsChanged = newLocations => {
    this.setState(
      {
        locations: newLocations
      },
      () => this.runFilters()
    )
  }

  educationChanged = newQualifications => {
    this.setState(
      {
        education: newQualifications
      },
      () => this.runFilters()
    )
  }

  timingsChanged = newTimings => {
    this.setState(
      {
        timings: newTimings
      },
      () => this.runFilters()
    )
  }

  licensureChanged = newLicensure => {
    this.setState(
      {
        licensure: newLicensure
      },
      () => this.runFilters()
    )
  }

  experienceChanged = newExperience => {
    this.setState(
      {
        experience: newExperience
      },
      () => this.runFilters()
    )
  }

  render () {
    if (this.state.to) {
      return <Redirect to={this.state.to} />
    }
    return (
      <article>
        <div className='h-100 bg-blue w-100 '>
          <h1 className='f-headline white b pl5 pt6 lh-copy'>
            WTCSB Job Opportinites
          </h1>
        </div>

        <Page fullWidth>
          <Layout>
            <Layout.Section secondary>
              <FormLayout>
                <Card sectioned subdued>
                  <Card.Section title='Filter by Categories'>
                    <CheckboxGroup
                      name='categories'
                      value={this.state.categories}
                      onChange={this.state.masterJobs && this.categoriesChanged}
                      className='flex col lh-copy'
                    >
                      <label>
                        <Checkbx value='Clinical' /> Clinical
                      </label>
                      <label>
                        <Checkbx value='Case Management' /> Case Management
                      </label>
                      <label>
                        <Checkbx value='Child & Family' /> Child & Family
                      </label>
                      <label>
                        <Checkbx value='Emergency' /> Emergency
                      </label>
                      <label>
                        <Checkbx value='Rehabilitation' /> Rehabilitation
                      </label>
                      <label>
                        <Checkbx value='Residential' /> Residential
                      </label>

                      <label>
                        <Checkbx value='Administrative' /> Administrative
                      </label>
                      <label>
                        <Checkbx value='Medical' /> Medical
                      </label>
                      <label>
                        <Checkbx value='Psychiatrist' /> Psychiatrist
                      </label>

                      <label>
                        <Checkbx value='Other Categories' /> Other
                      </label>
                    </CheckboxGroup>

                  </Card.Section>

                  <Card.Section title='Filter by Locations' subdued>
                    <CheckboxGroup
                      name='categories'
                      value={this.state.locations}
                      onChange={this.state.masterJobs && this.locationsChanged}
                      className='flex col lh-copy'
                    >
                      <label>
                        <Checkbx value='Suffolk' /> Suffolk
                      </label>
                      <label>
                        <Checkbx value='Isle of Wight' /> Isle of Wight
                      </label>
                      <label>
                        <Checkbx value='Southampton' /> Southampton
                      </label>
                      <label>
                        <Checkbx value='Franklin' /> Franklin
                      </label>
                      <label>
                        <Checkbx value='other locations' /> Other
                      </label>
                    </CheckboxGroup>

                  </Card.Section>

                  <Card.Section
                    title='Filter by Education Requirements'
                    subdued
                  >
                    <CheckboxGroup
                      name='education'
                      value={this.state.education}
                      onChange={this.state.masterJobs && this.educationChanged}
                      className='flex col lh-copy'
                    >
                      <label>
                        <Checkbx value='Associates' /> Associates
                      </label>
                      <label>
                        <Checkbx value='Bachelors' /> Bachelors
                      </label>
                      <label>
                        <Checkbx value='Bachelors in Human Services' />{' '}
                        Bachelors in Human Services
                      </label>
                      <label>
                        <Checkbx value='HS/GED' /> HS/GED
                      </label>
                      <label>
                        <Checkbx value='Masters' /> Masters
                      </label>

                      <label>
                        <Checkbx value='Ph.D.' /> Ph.D.
                      </label>
                      <label>
                        <Checkbx value='MD' /> MD
                      </label>
                      <label>
                        <Checkbx value='DO' /> DO
                      </label>

                      <label>
                        <Checkbx value='NP' /> NP
                      </label>
                      <label>
                        <Checkbx value='PA' /> PA
                      </label>
                    </CheckboxGroup>

                  </Card.Section>

                  <Card.Section title='Filter by Timings' subdued>
                    <CheckboxGroup
                      name='timings'
                      value={this.state.timings}
                      onChange={this.state.masterJobs && this.timingsChanged}
                      className='flex col lh-copy'
                    >
                      <label>
                        <Checkbx value='rotating' /> Rotating
                      </label>

                      <label>
                        <Checkbx value='evenings' /> Evenings
                      </label>
                      <label>
                        <Checkbx value='days' /> Days
                      </label>
                    </CheckboxGroup>

                  </Card.Section>

                  <Card.Section
                    title='Filter by Licensure Requirements'
                    subdued
                  >
                    <CheckboxGroup
                      name='licensure'
                      value={this.state.licensure}
                      onChange={this.state.masterJobs && this.licensureChanged}
                      className='flex col lh-copy'
                    >
                      <label>
                        <Checkbx value='QMHP-A' /> QMHP-A
                      </label>

                      <label>
                        <Checkbx value='QMHP-C' /> QMHP-C
                      </label>
                      <label>
                        <Checkbx value='QDDP' /> QDDP
                      </label>

                      <label>
                        <Checkbx value='CSAC' /> CSAC
                      </label>

                      <label>
                        <Checkbx value='PA' /> PA
                      </label>
                      <label>
                        <Checkbx value='NP' /> NP
                      </label>

                      <label>
                        <Checkbx value='CNA' /> CNA
                      </label>

                      <label>
                        <Checkbx value='PCA' /> PCA
                      </label>
                      <label>
                        <Checkbx value='Licensed Resident/Supervisee' />{' '}
                        Licensed Resident/Supervisee
                      </label>

                      <label>
                        <Checkbx value='LPN' /> LPN
                      </label>

                      <label>
                        <Checkbx value='RN' /> RN
                      </label>
                      <label>
                        <Checkbx value='None' /> None
                      </label>
                    </CheckboxGroup>

                  </Card.Section>

                  <Card.Section
                    title='Filter by Experience Requirements'
                    subdued
                  >
                    <CheckboxGroup
                      name='experience'
                      value={this.state.experience}
                      onChange={this.state.masterJobs && this.experienceChanged}
                      className='flex col lh-copy'
                    >
                      <label>
                        <Checkbx value='More than 5 years' /> More than 5 years
                      </label>
                      <label>
                        <Checkbx value='5 years' /> 5 years{' '}
                      </label>

                      <label>
                        <Checkbx value='3 years' /> 3 years
                      </label>

                      <label>
                        <Checkbx value='1 year' /> 1 year
                      </label>
                      <label>
                        <Checkbx value='None' /> None
                      </label>
                    </CheckboxGroup>
                  </Card.Section>
                </Card>
              </FormLayout>

            </Layout.Section>
            <Layout.Section>
              {this.state.jobs &&
                this.state.jobs.map((job, index) => (
                  <div className='pb4' key={index}>
                    <Link to={`/job/${job.id}`}>
                      <Card
                        title={job.name}
                        primaryFooterAction={{ content: 'View Job' }}
                      >
                        <Card.Section>
                          <p>
                            <strong>{job.category}</strong>
                          </p>
                          <p>{job.title}</p>
                        </Card.Section>
                      </Card>
                    </Link>
                  </div>
                ))}
            </Layout.Section>
          </Layout>
        </Page>
      </article>
    )
  }
}
