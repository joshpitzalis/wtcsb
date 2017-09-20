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
              <Card title="Filter By Education" sectioned>
                <Checkbox label="Associates" />
                <Checkbox label="Bachelors" />
                <Checkbox label="Masters" />
              </Card>
            </FormLayout>
            <FormLayout>
              <Card title="Filter By Location" sectioned>
                <Checkbox label="Suffolk" />
                <Checkbox label="Richmond" />
                <Checkbox label="Hampton" />
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
