import React, { Component } from 'react'
import { database, auth } from '../firebase'
import { Redirect, Link } from 'react-router-dom'
import {
  Page,
  Layout,
  TextStyle,
  Checkbox,
  DisplayText
} from '@shopify/polaris'

export default class Dashboard extends Component {
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
      <Page
        fullWidth
        title="WTCSB Employment Portal"
        primaryAction={{ content: 'Logout', onAction: () => auth.signOut() }}
        secondaryActions={[
          { content: 'New', onAction: () => this.setState({ to: '/create' }) },
          { content: 'Close' },
          { content: 'Delete' }
        ]}
      >
        <Layout>
          <Layout.Section>
            <ul className="list pl0 mt0 center">
              <li className="flex mxb wrap cxe lh-copy pa3 ph0-l bb b--black-10">
                <DisplayText size="medium">Description</DisplayText>

                <DisplayText size="medium">Category</DisplayText>
                <DisplayText size="medium">Status</DisplayText>
              </li>
            </ul>
            <ul className="list pl0 mt0 center">
              {this.state.jobs &&
                this.state.jobs.map((job, index) =>
                  <JobItem
                    key={index}
                    selected={false}
                    name={job.name}
                    category={job.category}
                    status={job.status[0]}
                    jobId={job.id}
                  />
                )}
            </ul>
          </Layout.Section>
        </Layout>
      </Page>
    )
  }
}

const JobItem = ({ selected, name, category, status, jobId }) =>
  <li className="flex wrap cxe lh-copy pa3 ph0-l bb b--black-10">
    <Checkbox />
    <Link to={`/applicants/${jobId}`} className="flex mxb fgrow">
      <DisplayText size="small">
        {name}
      </DisplayText>
      <DisplayText size="small">
        {category}
      </DisplayText>
      <DisplayText size="small">
        {status}
      </DisplayText>
    </Link>
  </li>
