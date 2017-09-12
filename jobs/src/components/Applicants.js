import React, { Component } from 'react'
import { database } from '../firebase'
import { Redirect } from 'react-router-dom'
import {
  Page,
  Layout,
  TextStyle,
  Checkbox,
  DisplayText
} from '@shopify/polaris'

export default class Applicants extends Component {
  state = {
    job: null,
    applicants: [
      {
        name: 'hey',
        email: 'yo@hey.com',
        cv: 'https://workflowy.com/'
      }
    ],
    to: null
  }
  componentDidMount() {
    database
      .ref(`/jobs/${this.props.match.params.jobId}`)
      .on('value', snap => this.setState({ job: Object.values(snap.val()) }))
  }
  render() {
    if (this.state.to) {
      return <Redirect to={this.state.to} />
    }
    return (
      <Page
        fullWidth
        title={this.state.job[0]}
        primaryAction={{ content: 'Logout' }}
        secondaryActions={[
          { content: 'Edit', onAction: () => this.setState({ to: '/create' }) }
        ]}
        breadcrumbs={[
          {
            content: 'Dashboard',
            url: '/dashboard'
          }
        ]}
      >
        <Layout>
          <Layout.Section>
            <ul className="list pl0 mt0 center">
              <li className="flex mxb wrap cxe lh-copy pa3 ph0-l bb b--black-10">
                <DisplayText size="medium">Name</DisplayText>
                <DisplayText size="medium">Contact</DisplayText>
                <DisplayText size="medium">Submissions</DisplayText>
              </li>
            </ul>
            <ul className="list pl0 mt0 center">
              {this.state.applicants &&
                this.state.applicants.map((applicant, index) =>
                  <Applicant
                    name={applicant.name}
                    email={applicant.email}
                    cv={applicant.cv}
                  />
                )}
            </ul>
          </Layout.Section>
        </Layout>
      </Page>
    )
  }
}

const Applicant = ({ name, email, cv }) =>
  <li className="flex mxb wrap cxe lh-copy pa3 ph0-l bb b--black-10">
    <div className="flex cxc">
      <DisplayText size="small">
        {name}
      </DisplayText>
    </div>
    <DisplayText size="small">
      {email}
    </DisplayText>
    <DisplayText size="small">
      {cv}
    </DisplayText>
  </li>
