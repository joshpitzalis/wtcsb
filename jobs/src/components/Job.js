import React, { Component } from 'react'
import { database } from '../firebase'
import {
  Page,
  Layout,
  FormLayout,
  TextField,
  ChoiceList,
  ButtonGroup,
  Button
} from '@shopify/polaris'
import { Redirect } from 'react-router-dom'

export default class JobPage extends Component {
  state = {
    job: null,
    to: null
  }

  componentDidMount() {
    database
      .ref(`/jobs/${this.props.match.params.jobId}`)
      .on('value', snap => this.setState({ job: snap.val() }))
  }

  render() {
    if (this.state.to) {
      return <Redirect to={this.state.to} />
    }

    return (
      <Page
        fullWidth
        title={this.state.job && this.state.job.name}
        separator
        secondaryActions={[
          {
            content: 'Back to Dashboard',
            onAction: () => this.setState({ to: '/dashboard' })
          }
        ]}
      >
        <Layout>
          <Layout.Section secondary>
            {this.state.job && this.state.job.category}
            <ButtonGroup>
              <Button onClick={() => this.setState({ to: '/' })}>Cancel</Button>
              <Button
                primary
                onClick={() =>
                  this.setState({
                    to: `/apply/${this.props.match.params.jobId}`
                  })}
              >
                Apply
              </Button>
            </ButtonGroup>
          </Layout.Section>
        </Layout>
      </Page>
    )
  }
}
