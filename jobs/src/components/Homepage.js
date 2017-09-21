import React, { Component } from 'react'
import { database } from '../firebase'
import { Redirect, Link } from 'react-router-dom'
import {
  Page,
  Layout,
  Card,
  CalloutCard,
  FormLayout,
  Checkbox
} from '@shopify/polaris'

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
              <Card title="Filter By Category" sectioned>
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
              </Card>
            </FormLayout>
            <FormLayout>
              <Card title="Filter By Location" sectioned>
                <Checkbox label="Suffolk" />
                <Checkbox label="Isle of Wight" />
                <Checkbox label="Southampton" />
                <Checkbox label="Franklin" />
                <Checkbox label="Other" />
              </Card>
            </FormLayout>

            <FormLayout>
              <Card title="Filter By Education" sectioned>
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
              </Card>
            </FormLayout>

            <FormLayout>
              <Card title="Filter By Hours" sectioned>
                <Checkbox label="Days" />
                <Checkbox label="Evenings" />
                <Checkbox label="Rotating" />
              </Card>
            </FormLayout>

            <FormLayout>
              <Card title="Filter By Licensure Status" sectioned>
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
              </Card>
            </FormLayout>
            <FormLayout>
              <Card title="Filter By Experience" sectioned>
                <Checkbox label="None" />
                <Checkbox label="1 year" />
                <Checkbox label="3 years" />
                <Checkbox label="5 years" />
                <Checkbox label="More than $100K" />
              </Card>
            </FormLayout>
          </Layout.Section>
          <Layout.Section>
            {this.state.jobs &&
              this.state.jobs.map((job, index) => (
                // <JobItem
                //   key={index}
                //   selected={false}
                //   name={job.name}
                //   category={job.category}
                //   status={job.status[0]}
                //   jobId={job.id}
                // />
                <Link to={`/job/${job.id}`} key={index}>
                  <CalloutCard
                    title={job.name}
                    illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
                    primaryAction={{
                      content: 'View Job'
                    }}
                  >
                    <p>{job.category}</p>
                  </CalloutCard>
                </Link>
              ))}
          </Layout.Section>
        </Layout>
      </Page>
    )
  }
}

export default App
