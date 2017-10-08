import React, { Component } from 'react';
import { database } from '../firebase';
import { Redirect, Link } from 'react-router-dom';
import { Page, Layout, Card, FormLayout, Checkbox } from '@shopify/polaris';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: null,
      masterJobs: null,
      to: null,
      selected: []
    };
    this.handleFilter = this.handleFilter.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
  }

  componentDidMount() {
    database.ref(`/jobs`).on('value', snap => {
      snap.exists() &&
        this.setState({
          jobs: Object.values(snap.val()),
          masterJobs: Object.values(snap.val())
        });
    });
  }
  handleSelection(selection) {
    const selected = new Set([...this.state.selected]);
    if (selected.has(selection)) {
      selected.delete(selection);
      this.setState({ jobs: [...this.state.masterJobs] }, () =>
        selected.forEach(filter => this.handleFilter(filter))
      );
    } else {
      selected.add(selection);
      this.setState({ jobs: [...this.state.masterJobs] }, () =>
        selected.forEach(filter => this.handleFilter(filter))
      );
    }
    this.setState({ selected });
  }

  handleFilter(selection) {
    const joby = [...this.state.jobs];

    const jobs = joby.filter(
      job =>
        job.category === selection ||
        job.location === selection ||
        job.education === selection ||
        job.experience === selection ||
        job.hours.includes(selection) ||
        job.licensure.includes(selection)
    );

    this.setState({ jobs });
  }

  render() {
    if (this.state.to) {
      return <Redirect to={this.state.to} />;
    }
    return (
      <article>
        <div className="h-100 bg-blue w-100 ">
          <h1 className="f-headline white b pl5 pt6 lh-copy">
            WTCSB Job Opportinites
          </h1>
        </div>
        <Page fullWidth>
          <Layout>
            <Layout.Section secondary>
              <FormLayout>
                <Card sectioned subdued>
                  <Card.Section title="Filter by Categories">
                    <Checkbox
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
                    />
                    <Checkbox
                      label="Emergency"
                      onChange={() => this.handleSelection('Emergency')}
                    />
                    <Checkbox
                      label="Rehabilitation"
                      onChange={() => this.handleSelection('Rehabilitation')}
                    />
                    <Checkbox
                      label="Residential"
                      onChange={() => this.handleSelection('Residential')}
                    />
                    <Checkbox
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
                    />
                  </Card.Section>

                  <Card.Section title="Filter by Locations" subdued>
                    <Checkbox
                      label="Suffolk"
                      onChange={() => this.handleSelection('Suffolk')}
                    />
                    <Checkbox
                      label="Isle of Wight"
                      onChange={() => this.handleSelection('Isle of Wight')}
                    />
                    <Checkbox
                      label="Southampton"
                      onChange={() => this.handleSelection('Southampton')}
                    />
                    <Checkbox
                      label="Franklin"
                      onChange={() => this.handleSelection('Franklin')}
                    />
                    <Checkbox
                      label="Other"
                      onChange={() => this.handleSelection('other locations')}
                    />
                  </Card.Section>

                  <Card.Section
                    title="Filter by Education Requirements"
                    subdued
                  >
                    <Checkbox
                      label="Associates"
                      onChange={() => this.handleSelection('Associates')}
                    />
                    <Checkbox
                      label="Bachelors"
                      onChange={() => this.handleSelection('Bachelors')}
                    />
                    <Checkbox
                      label="Bachelors in Human Services"
                      onChange={() =>
                        this.handleSelection('Bachelors in Human Services')}
                    />
                    <Checkbox
                      label="HS/GED"
                      onChange={() => this.handleSelection('HS/GED')}
                    />
                    <Checkbox
                      label="Masters"
                      onChange={() => this.handleSelection('Masters')}
                    />
                    <Checkbox
                      label="Ph.D."
                      onChange={() => this.handleSelection('Ph.D.')}
                    />
                    <Checkbox
                      label="MD"
                      onChange={() => this.handleSelection('MD')}
                    />
                    <Checkbox
                      label="DO"
                      onChange={() => this.handleSelection('DO')}
                    />
                    <Checkbox
                      label="NP"
                      onChange={() => this.handleSelection('NP')}
                    />
                    <Checkbox
                      label="PA"
                      onChange={() => this.handleSelection('PA')}
                    />
                  </Card.Section>

                  <Card.Section title="Filter by Timings" subdued>
                    <Checkbox
                      label="Days"
                      onChange={() => this.handleSelection('days')}
                    />
                    <Checkbox
                      label="Evenings"
                      onChange={() => this.handleSelection('evenings')}
                    />
                    <Checkbox
                      label="Rotating"
                      onChange={() => this.handleSelection('rotating')}
                    />
                  </Card.Section>

                  <Card.Section
                    title="Filter by Licensure Requirements"
                    subdued
                  >
                    <Checkbox
                      label="QMHP-A"
                      onChange={() => this.handleSelection('QMHP-A')}
                    />
                    <Checkbox
                      label="QMHP-C"
                      onChange={() => this.handleSelection('QMHP-C')}
                    />
                    <Checkbox
                      label="QDDP"
                      onChange={() => this.handleSelection('QDDP')}
                    />
                    <Checkbox
                      label="CSAC"
                      onChange={() => this.handleSelection('CSAC')}
                    />
                    <Checkbox
                      label="PA"
                      onChange={() => this.handleSelection('PA')}
                    />
                    <Checkbox
                      label="NP"
                      onChange={() => this.handleSelection('NP')}
                    />
                    <Checkbox
                      label="CNA"
                      onChange={() => this.handleSelection('Rotating')}
                    />
                    <Checkbox
                      label="PCA"
                      onChange={() => this.handleSelection('PCA')}
                    />
                    <Checkbox
                      label="Licensed Resident/Supervisee"
                      onChange={() =>
                        this.handleSelection('Licensed Resident/Supervisee')}
                    />
                    <Checkbox
                      label="LPN"
                      onChange={() => this.handleSelection('LPN')}
                    />
                    <Checkbox
                      label="RN"
                      onChange={() => this.handleSelection('RN')}
                    />
                    <Checkbox
                      label="None"
                      onChange={() => this.handleSelection('None')}
                    />
                  </Card.Section>

                  <Card.Section
                    title="Filter by Experience Requirements"
                    subdued
                  >
                    <Checkbox
                      label="None"
                      onChange={() => this.handleSelection('None')}
                    />
                    <Checkbox
                      label="1 year"
                      onChange={() => this.handleSelection('1 year')}
                    />
                    <Checkbox
                      label="3 years"
                      onChange={() => this.handleSelection('3 years')}
                    />
                    <Checkbox
                      label="5 years"
                      onChange={() => this.handleSelection('5 years')}
                    />
                    <Checkbox
                      label="More than 5 years"
                      onChange={() => this.handleSelection('More than 5 years')}
                    />
                  </Card.Section>
                </Card>
              </FormLayout>
            </Layout.Section>
            <Layout.Section>
              {this.state.jobs &&
                this.state.jobs.map((job, index) => (
                  <div className="pb4" key={index}>
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
    );
  }
}

export default App;
