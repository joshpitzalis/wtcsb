import React, { Component } from 'react'
import { database, auth } from '../firebase'
import { Redirect } from 'react-router-dom'
import {
  Page,
  Layout,
  TextStyle,
  Checkbox,
  DisplayText,
  Button
} from '@shopify/polaris'

export default class Applicants extends Component {
  state = {
    applicants: null,
    to: null
  }
  componentDidMount() {
    database
      .ref(`jobs/${this.props.match.params.jobId}/applicants`)
      .on('value', snap => {
        if (snap.val()) {
          this.setState({ applicants: Object.values(snap.val()) })
        }
      })
  }
  render() {
    if (this.state.to) {
      return <Redirect to={this.state.to} />
    }
    return (
      <Page
        fullWidth
        title={this.state.job && this.state.job[0]}
        primaryAction={{ content: 'Logout', onAction: () => auth.signOut() }}
        secondaryActions={[
          {
            content: 'Back to Dashboard',
            onAction: () => this.setState({ to: '/dashboard' })
          },
          {
            content: 'Edit this Job',
            onAction: () =>
              this.setState({ to: `/edit/${this.props.match.params.jobId}` })
          }
        ]}
      >
        <Layout>
          <Layout.Section>
            <div className="w-100 flex">
              <div className="w-33 tl ">
                <DisplayText size="small">Name</DisplayText>
              </div>
              <div className="w-33 tl">
                <DisplayText size="small">Contact</DisplayText>
              </div>
              <div className="w-33 tl">
                <DisplayText size="small">Submissions</DisplayText>
              </div>
            </div>
            <ul className="list pl0 mt0 center">
              {this.state.applicants ? (
                this.state.applicants.map((applicant, index) => (
                  <Applicant
                    name={applicant.name}
                    email={applicant.email}
                    cv={applicant.coverLetter}
                    application={applicant.WTCSApplication}
                    resume={applicant.resume}
                    address={applicant.address}
                  />
                ))
              ) : (
                <div className="pt5 tc">
                  <DisplayText size="large">No Applicants yet</DisplayText>
                </div>
              )}
            </ul>
          </Layout.Section>
        </Layout>
      </Page>
    )
  }
}

const Applicant = ({ name, email, cv, application, resume, address }) => (
  <li className="flex wrap mxb cxs lh-copy pa3 ph0-l bb b--black-10">
    <div className="w-33-l w-33-m w-100">
      <DisplayText>{name}</DisplayText>
    </div>
    <div className="w-33-l w-33-m w-100 overflow-hidden">
      <DisplayText>{email}</DisplayText>
      <DisplayText>{address}</DisplayText>
    </div>

    <div className="flex col h5 mxa w-33-l w-33-m w-100">
      <div>
        {cv && (
          <Button size="slim">
            <a href={cv} download>
              Download Cover Letter
            </a>
          </Button>
        )}
      </div>
      <div>
        {application && (
          <Button size="slim">
            <a href={application} download>
              Download Application
            </a>
          </Button>
        )}
      </div>
      <div>
        {resume && (
          <Button size="slim">
            <a href={resume} download>
              Download Resume
            </a>
          </Button>
        )}
      </div>
    </div>
  </li>
)
