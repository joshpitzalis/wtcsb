import React, { Component } from 'react'
import { database } from '../firebase'
import { Redirect, Link } from 'react-router-dom'
import { Page, Layout, Card, FormLayout, Checkbox } from '@shopify/polaris'

class App extends Component {
  state = {
    jobs: null,
    to: null
  }
  componentDidMount() {
    database
      .ref(`/jobs`)
      .on('value', snap => this.setState({ jobs: Object.values(snap.val()) }))
  }
  render() {
    if (this.state.to) {
      return <Redirect to={this.state.to} />
    }
    return (
      <Page fullWidth title="WTCSB Job Opportinites">
        <Layout>
          <Layout.Section secondary>
            <FormLayout>
              <Card sectioned subdued>
                <Card.Section title="Filter By Category">
                  <Checkbox label="Clinical" />
                  <Checkbox label="Case Management" />
                  <Checkbox label="Child & Family" />
                  <Checkbox label="Emergency" />
                  <Checkbox label="Rehabilitation" />
                  <Checkbox label="Residential" />
                  <Checkbox label="Administrative" />
                  <Checkbox label="Medical" />
                  <Checkbox label="Psychiatrist" />
                  <Checkbox label="Other" />
                </Card.Section>

                <Card.Section title="Filter By Location" subdued>
                  <Checkbox label="Suffolk" />
                  <Checkbox label="Isle of Wight" />
                  <Checkbox label="Southampton" />
                  <Checkbox label="Franklin" />
                  <Checkbox label="Other" />
                </Card.Section>

                <Card.Section title="Filter By Education" subdued>
                  <Checkbox label="Associates" />
                  <Checkbox label="Bachelors" />
                  <Checkbox label="Bachelors in Human Services" />
                  <Checkbox label="HS/GED" />
                  <Checkbox label="Masters" />
                  <Checkbox label="Ph.D." />
                  <Checkbox label="MD" />
                  <Checkbox label="DO" />
                  <Checkbox label="NP" />
                  <Checkbox label="PA" />
                </Card.Section>

                <Card.Section title="Filter By Hours" subdued>
                  <Checkbox label="Days" />
                  <Checkbox label="Evenings" />
                  <Checkbox label="Rotating" />
                </Card.Section>

                <Card.Section title="Filter By Licensure Status" subdued>
                  <Checkbox label="QMHP-A" />
                  <Checkbox label="QMHP-C" />
                  <Checkbox label="QDDP" />
                  <Checkbox label="CSAC" />
                  <Checkbox label="PA" />
                  <Checkbox label="NP" />
                  <Checkbox label="CNA" />
                  <Checkbox label="PCA" />
                  <Checkbox label="Licensed Resident/Supervisee" />
                  <Checkbox label="LPN" />
                  <Checkbox label="RN" />
                </Card.Section>

                <Card.Section title="Filter By Experience" subdued>
                  <Checkbox label="None" />
                  <Checkbox label="1 year" />
                  <Checkbox label="3 years" />
                  <Checkbox label="5 years" />
                  <Checkbox label="More than $100K" />
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
    )
  }
}

export default App
