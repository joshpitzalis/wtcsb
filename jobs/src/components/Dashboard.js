import React, { Component } from 'react';
import { database, auth } from '../firebase';
import { Redirect, Link } from 'react-router-dom';
import {
  Page,
  Layout,
  TextStyle,
  Checkbox,
  DisplayText
} from '@shopify/polaris';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: null,
      to: null,
      selected: []
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleClosing = this.handleClosing.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    database
      .ref(`/jobs`)
      .on('value', snap => this.setState({ jobs: Object.values(snap.val()) }));
  }

  handleSelect(jobId) {
    const selected = new Set([...this.state.selected]);

    if (selected.has(jobId)) {
      selected.delete(jobId);
    } else {
      selected.add(jobId);
    }
    this.setState({ selected });
  }
  handleClosing() {
    this.state.selected.forEach(jobId => {
      database.ref(`jobs/${jobId}`).update({ status: ['closed'] });
    });
    this.setState({ selected: [] });
  }

  handleDelete() {
    this.state.selected.forEach(jobId => {
      database.ref(`jobs/${jobId}`).remove();
    });
    this.setState({ selected: [] });
  }

  render() {
    if (this.state.to) {
      <Redirect to={this.state.to} />;
    }
    return (
      <Page
        fullWidth
        title="WTCSB Employment Portal"
        primaryAction={{ content: 'Logout', onAction: () => auth.signOut() }}
        secondaryActions={[
          { content: 'New', onAction: () => this.setState({ to: '/create' }) },
          { content: 'Close', onAction: () => this.handleClosing() },
          { content: 'Delete', onAction: () => this.handleDelete() }
        ]}
      >
        <Layout>
          <Layout.Section>
            <div className="w-100 flex">
              <div className="w-33 tl pl4">
                <DisplayText size="small">Description</DisplayText>
              </div>
              <div className="w-33 tl pl4">
                <DisplayText size="small">Category</DisplayText>
              </div>
              <div className="w-33 tl pl4">
                <DisplayText size="small">Status</DisplayText>
              </div>
            </div>
            <ul className="list pl0 mt0 center">
              {this.state.jobs &&
                this.state.jobs.map((job, index) => (
                  <JobItem
                    key={index}
                    name={job.name}
                    category={job.category}
                    status={job.status[0]}
                    jobId={job.id}
                    handleSelect={this.handleSelect}
                    selected={new Set([...this.state.selected])}
                  />
                ))}
            </ul>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }
}

const JobItem = ({ selected, name, category, status, jobId, handleSelect }) => (
  <li className="flex wrap cxc lh-copy pa3 ph0-l bb b--black-10">
    <Checkbox
      onChange={() => handleSelect(jobId)}
      checked={selected.has(jobId)}
    />
    <Link to={`/applicants/${jobId}`} className="flex mxb fgrow">
      <div className="w-33-l w-33-m w-100 overflow-hidden">
        <DisplayText>{name}</DisplayText>
      </div>
      <div className="w-33-l w-33-m w-100 overflow-hidden">
        <DisplayText>{category}</DisplayText>
      </div>
      <div className="w-33-l w-33-m w-100 overflow-hidden">
        <DisplayText>{status}</DisplayText>
      </div>
    </Link>
  </li>
);
