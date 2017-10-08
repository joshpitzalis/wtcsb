import React, { Component } from 'react';
import { database } from '../firebase';
import {
  Page,
  Layout,
  FormLayout,
  TextField,
  ChoiceList,
  ButtonGroup,
  Button,
  Card
} from '@shopify/polaris';
import { Redirect } from 'react-router-dom';

export default class JobPage extends Component {
  state = {
    job: null,
    to: null
  };

  componentDidMount() {
    database
      .ref(`/jobs/${this.props.match.params.jobId}`)
      .on('value', snap => this.setState({ job: snap.val() }));
  }

  render() {
    if (this.state.to) {
      return <Redirect to={this.state.to} />;
    }

    return (
      <article>
        <div className="h-100 bg-blue w-100 ">
          <h1 className="f-headline white b pl5 pt5 lh-copy">
            {this.state.job && this.state.job.name}
          </h1>
        </div>
        <Page
          fullWidth
          separator
          secondaryActions={[
            {
              content: 'Back to Homepage',
              onAction: () => this.setState({ to: '/' })
            }
          ]}
        >
          <Layout>
            <Layout.Section>
              <div className="measure-wide pa4 pl0-l pl0-m">
                {this.state.job && (
                  <Card>
                    {this.state.job.category && (
                      <Card.Section title="category">
                        <p>{this.state.job && this.state.job.category}</p>
                      </Card.Section>
                    )}

                    {this.state.job.position && (
                      <Card.Section title="position">
                        <p>{this.state.job && this.state.job.position}</p>
                      </Card.Section>
                    )}

                    {this.state.job.location && (
                      <Card.Section title="location">
                        <p>{this.state.job && this.state.job.location}</p>
                      </Card.Section>
                    )}

                    {this.state.job.statement && (
                      <Card.Section title="statement">
                        <p>{this.state.job && this.state.job.statement}</p>
                      </Card.Section>
                    )}

                    {this.state.job.education && (
                      <Card.Section title="education">
                        <p>{this.state.job && this.state.job.education}</p>
                      </Card.Section>
                    )}

                    {this.state.job.salary && (
                      <Card.Section title="salary">
                        <p>{this.state.job && this.state.job.salary}</p>
                      </Card.Section>
                    )}

                    {this.state.job.licensure && (
                      <Card.Section title="licensure">
                        <p>{this.state.job && this.state.job.licensure}</p>
                      </Card.Section>
                    )}

                    {this.state.job.info && (
                      <Card.Section title="info">
                        <p>{this.state.job && this.state.job.info}</p>
                      </Card.Section>
                    )}

                    {this.state.job.experience && (
                      <Card.Section title="experience">
                        <p>{this.state.job && this.state.job.experience}</p>
                      </Card.Section>
                    )}

                    {this.state.job.hours && (
                      <Card.Section title="hours">
                        <p>{this.state.job && this.state.job.hours}</p>
                      </Card.Section>
                    )}
                  </Card>
                )}

                <br />
                <div>
                  Download, Print, comple and scan the application form before
                  applying.{' '}
                  <a
                    href="https://firebasestorage.googleapis.com/v0/b/wtcsb-employment-portal.appspot.com/o/WTCSB_Application_Form.docx?alt=media&token=a33e74ab-2ffd-46e7-b235-043219156cd9"
                    download
                  >
                    Download the Application Form by clicking here.
                  </a>
                </div>
                <br />

                <ButtonGroup>
                  <Button onClick={() => this.setState({ to: '/' })}>
                    Cancel
                  </Button>
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
              </div>
            </Layout.Section>
          </Layout>
        </Page>
      </article>
    );
  }
}
