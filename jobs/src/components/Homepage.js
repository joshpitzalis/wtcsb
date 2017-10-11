import React, { Component } from 'react'
import { database } from '../firebase'
import { Redirect, Link } from 'react-router-dom'
import { Page, Layout, Card, FormLayout, Checkbox } from '@shopify/polaris'
import { Checkbox as Checkbx, CheckboxGroup } from 'react-checkbox-group'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
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
    // this.handleFilter = this.handleFilter.bind(this);
    // this.handleSelection = this.handleSelection.bind(this);
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
  // handleSelection(selection) {
  //   const selected = new Set([...this.state.selected]);
  //   if (selected.has(selection)) {
  //     selected.delete(selection);
  //     this.setState({ jobs: [...this.state.masterJobs] }, () =>
  //       selected.forEach(filter => this.handleFilter(filter))
  //     );
  //   } else {
  //     selected.add(selection);
  //     this.setState({ jobs: [...this.state.masterJobs] }, () =>
  //       selected.forEach(filter => this.handleFilter(filter))
  //     );
  //   }
  //   this.setState({ selected });
  // }

  // handleFilter(selection) {
  //   const joby = [...this.state.jobs];

  //   const jobs = joby.filter(
  //     job =>
  //       job.category === selection ||
  //       job.location === selection ||
  //       job.education === selection ||
  //       job.experience === selection ||
  //       job.hours.includes(selection) ||
  //       job.licensure.includes(selection)
  //   );

  //   this.setState({ jobs });
  // }

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

      // if (this.state.categories) {
      //   this.state.categories.forEach(filter => this.siftCategories(filter))
      // }
      // if (this.state.locations) {
      //   this.state.locations.forEach(filter => this.siftLocations(filter))
      // }
      // if (this.state.education) {
      //   this.state.education.forEach(filter => this.siftEducation(filter))
      // }
      // if (this.state.timings) {
      //   this.state.timings.forEach(filter => this.siftTimings(filter))
      // }
      // if (this.state.licensure) {
      //   this.state.licensure.forEach(filter => this.siftLicensure(filter))
      // }
      // if (this.state.experience) {
      //   this.state.experience.forEach(filter => this.siftExperience(filter))
      // }
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
                    {/* <Checkbox
                        label="Clinical"
                        onChange={() => this.handleSelection('Clinical')}
                        />
                        <Checkbox
                        label="Case Management"
                        onChange={() => this.handleSelection('Case Management')}
                        />
                        <Checkbox
                        label="Child & Family"
                        onChange={() => this.handleSelection('Child & Family')}
                    /> */}
                    {/* <Checkbox
                        label="Emergency"
                        onChange={() => this.handleSelection('Emergency')}
                    /> */}
                    {/* <Checkbox
                        label="Rehabilitation"
                        onChange={() => this.handleSelection('Rehabilitation')}
                    /> */}
                    {/* <Checkbox
                        label="Residential"
                        onChange={() => this.handleSelection('Residential')}
                    /> */}
                    {/* <Checkbox
                        label="Administrative"
                        onChange={() => this.handleSelection('Administrative')}
                        />
                        <Checkbox
                        label="Medical"
                        onChange={() => this.handleSelection('Medical')}
                        />
                        <Checkbox
                        label="Psychiatrist"
                        onChange={() => this.handleSelection('Psychiatrist')}
                        />
                        <Checkbox
                        label="Other"
                        onChange={() => this.handleSelection('Other Categories')}
                    /> */}
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

                    {/*
                        <Checkbox
                        label="Suffolk"
                        onChange={() => this.handleSelection('Suffolk')}
                    /> */}
                    {/* <Checkbox
                        label="Isle of Wight"
                        onChange={() => this.handleSelection('Isle of Wight')}
                    /> */}
                    {/* <Checkbox
                        label="Southampton"
                        onChange={() => this.handleSelection('Southampton')}
                    /> */}
                    {/* <Checkbox
                        label="Franklin"
                        onChange={() => this.handleSelection('Franklin')}
                    /> */}
                    {/* <Checkbox
                        label="Other"
                        onChange={() => this.handleSelection('other locations')}
                    /> */}
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
                    {/* <Checkbox
                        label="Associates"
                        onChange={() => this.handleSelection('Associates')}
                    /> */}
                    {/* <Checkbox
                        label="Bachelors"
                        onChange={() => this.handleSelection('Bachelors')}
                    /> */}
                    {/* <Checkbox
                        label="Bachelors in Human Services"
                        onChange={() =>
                        this.handleSelection('Bachelors in Human Services')}
                    /> */}
                    {/* <Checkbox
                        label="HS/GED"
                        onChange={() => this.handleSelection('HS/GED')}
                    /> */}
                    {/* <Checkbox
                        label="Masters"
                        onChange={() => this.handleSelection('Masters')}
                    /> */}
                    {/* <Checkbox
                        label="Ph.D."
                        onChange={() => this.handleSelection('Ph.D.')}
                    /> */}
                    {/* <Checkbox
                        label="MD"
                        onChange={() => this.handleSelection('MD')}
                    /> */}
                    {/* <Checkbox
                        label="DO"
                        onChange={() => this.handleSelection('DO')}
                    /> */}
                    {/* <Checkbox
                        label="NP"
                        onChange={() => this.handleSelection('NP')}
                    /> */}
                    {/* <Checkbox
                        label="PA"
                        onChange={() => this.handleSelection('PA')}
                    /> */}
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
                    {/* <Checkbox
                        label="Days"
                        onChange={() => this.handleSelection('days')}
                    /> */}
                    {/* <Checkbox
                        label="Evenings"
                        onChange={() => this.handleSelection('evenings')}
                    /> */}
                    {/* <Checkbox
                        label="Rotating"
                        onChange={() => this.handleSelection('rotating')}
                    /> */}
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
                    {/* <Checkbox
                      label="QMHP-A"
                      onChange={() => this.handleSelection('QMHP-A')}
                    /> */}
                    {/* <Checkbox
                      label="QMHP-C"
                      onChange={() => this.handleSelection('QMHP-C')}
                    /> */}
                    {/* <Checkbox
                      label="QDDP"
                      onChange={() => this.handleSelection('QDDP')}
                    /> */}
                    {/* <Checkbox
                      label="CSAC"
                      onChange={() => this.handleSelection('CSAC')}
                    /> */}
                    {/* <Checkbox
                      label="PA"
                      onChange={() => this.handleSelection('PA')}
                      />
                      <Checkbox
                      label="NP"
                      onChange={() => this.handleSelection('NP')}
                    /> */}
                    {/* <Checkbox
                      label="CNA"
                      onChange={() => this.handleSelection('CNA')}
                    /> */}
                    {/* <Checkbox
                      label="PCA"
                      onChange={() => this.handleSelection('PCA')}
                    /> */}
                    {/* <Checkbox
                      label="Licensed Resident/Supervisee"
                      onChange={() =>
                        this.handleSelection('Licensed Resident/Supervisee')}
                    /> */}
                    {/* <Checkbox
                      label="LPN"
                      onChange={() => this.handleSelection('LPN')}
                    /> */}
                    {/* <Checkbox
                      label="RN"
                      onChange={() => this.handleSelection('RN')}
                    /> */}
                    {/* <Checkbox
                      label="None"
                      onChange={() => this.handleSelection('None')}
                    /> */}
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

                    {/* <Checkbox
                      label="None"
                      onChange={() => this.handleSelection('None')}
                    /> */}
                    {/* <Checkbox
                      label="1 year"
                      onChange={() => this.handleSelection('1 year')}
                    /> */}
                    {/* <Checkbox
                      label="3 years"
                      onChange={() => this.handleSelection('3 years')}
                    /> */}
                    {/* <Checkbox
                      label="5 years"
                      onChange={() => this.handleSelection('5 years')}
                    /> */}
                    {/* <Checkbox
                      label="More than 5 years"
                      onChange={() => this.handleSelection('More than 5 years')}
                    /> */}
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

export default App
