import React, { Component } from 'react'
import { database, storage } from '../firebase'
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
import Dropzone from 'react-dropzone'
import upload from '../images/upload.png'
import Recaptcha from 'react-recaptcha'

export default class Application extends Component {
  state = {
    name: undefined,
    category: undefined,
    status: [],
    complete: undefined,
    transferTotal1: undefined,
    transferCurrent1: undefined,
    transferTotal2: undefined,
    transferCurrent2: undefined,
    transferTotal3: undefined,
    transferCurrent3: undefined,
    coverLetter: undefined,
    resume: undefined,
    WTCSApplication: undefined
  }

  componentDidMount () {
    database
      .ref(`/jobs/${this.props.match.params.jobId}`)
      .on('value', snap => this.setState({ job: snap.val() }))
  }

  onDropCoverLetter = files => {
    const file = files[0]
    const uploadTask = storage
      .ref(this.props.match.params.jobId)
      .child(file.name)
      .put(file, { contentType: file.type })
    uploadTask.on('state_changed', snapshot => {
      this.setState({
        transferCurrent: snapshot.bytesTransferred,
        transferTotal: snapshot.totalBytes
      })
    })
    uploadTask
      .then(snapshot =>
        this.setState({
          coverLetter: snapshot.downloadURL
        })
      )
      .catch(error => console.error(error))
  }

  onDropWTCSApplication = files => {
    const file = files[0]
    const uploadTask = storage
      .ref(this.props.match.params.jobId)
      .child(file.name)
      .put(file, { contentType: file.type })
    uploadTask.on('state_changed', snapshot => {
      this.setState({
        transferCurrent: snapshot.bytesTransferred,
        transferTotal: snapshot.totalBytes
      })
    })
    uploadTask
      .then(snapshot =>
        this.setState({
          WTCSApplication: snapshot.downloadURL
        })
      )
      .catch(error => console.error(error))
  }

  onDropResume = files => {
    const file = files[0]
    const uploadTask = storage
      .ref(this.props.match.params.jobId)
      .child(file.name)
      .put(file, { contentType: file.type })
    uploadTask.on('state_changed', snapshot => {
      this.setState({
        transferCurrent: snapshot.bytesTransferred,
        transferTotal: snapshot.totalBytes
      })
    })
    uploadTask
      .then(snapshot =>
        this.setState({
          resume: snapshot.downloadURL
        })
      )
      .catch(error => console.error(error))
  }

  handleNameUpdate = e => {
    let name = this.state.name
    name = e
    this.setState({ name })
  }

  handleEmailUpdate = e => {
    let email = this.state.email
    email = e
    this.setState({ email })
  }
  handlePhoneUpdate = e => {
    let phone = this.state.phone
    phone = e
    this.setState({ phone })
  }
  handleAddressUpdate = e => {
    let address = this.state.address
    address = e
    this.setState({ address })
  }

  handleSubmit = () => {
    const newJobPostKey = database
      .ref(`/jobs/${this.props.match.params.jobId}/applicants`)
      .push().key
    var jobData = {
      id: newJobPostKey,
      name: this.state.name || null,
      email: this.state.email || null,
      phone: this.state.phone || null,
      address: this.state.address || null,
      coverLetter: this.state.coverLetter || null,
      WTCSApplication: this.state.WTCSApplication || null,
      resume: this.state.resume || null
    }

    const updates = {}
    updates[newJobPostKey] = jobData
    return database
      .ref(`/jobs/${this.props.match.params.jobId}/applicants`)
      .update(updates)
      .then(this.setState({ to: '/' }))
  }

  render () {
    if (this.state.to) {
      return <Redirect to={this.state.to} />
    }

    return (
      <article>
        <div className='h-100 bg-blue w-100 '>
          <h1 className='f-headline white b pl5 pt5 lh-copy'>
            Job Application Form
          </h1>
        </div>
        <Page
          fullWidth
          title={this.state.job && this.state.job.name}
          separator
          secondaryActions={[
            {
              content: 'Back to Homepage',
              onAction: () => this.setState({ to: '/' })
            }
          ]}
        >
          <Layout>
            <Layout.Section secondary>
              <div className='measure-wide pa4 pl0-l pl0-m'>
                <FormLayout>
                  <TextField
                    id='jobApplicationName'
                    label='Your Name'
                    value={this.state.name}
                    onChange={this.handleNameUpdate}
                  />
                  <TextField
                    id='jobApplicationEmail'
                    label='Email'
                    type='email'
                    value={this.state.email}
                    onChange={this.handleEmailUpdate}
                  />
                  <TextField
                    id='jobApplicationPhone'
                    label='Phone Number'
                    type='tel'
                    value={this.state.phone}
                    onChange={this.handlePhoneUpdate}
                  />
                  <TextField
                    id='jobApplicationAddress'
                    label='Address'
                    multiline={3}
                    value={this.state.address}
                    onChange={this.handleAddressUpdate}
                  />

                  <CoverLetter
                    onDrop={this.onDropCoverLetter}
                    coverLetter={this.state.coverLetter}
                    transferCurrent={this.state.transferCurrent1}
                    transferTotal={this.state.transferTotal1}
                  />
                  <WTCSApplication
                    onDrop={this.onDropWTCSApplication}
                    WTCSApplication={this.state.WTCSApplication}
                    transferCurrent={this.state.transferCurrent2}
                    transferTotal={this.state.transferTotal2}
                  />
                  <Resume
                    onDrop={this.onDropResume}
                    resume={this.state.resume}
                    transferCurrent={this.state.transferCurrent3}
                    transferTotal={this.state.transferTotal3}
                  />
                  <Recaptcha
                    sitekey='6LdcgjMUAAAAAGFYGFNcufCm645bsNXEuZ6bmE1w'
                    verifyCallback={() => this.setState({ captcha: true })}
                  />

                  <ButtonGroup>
                    <Button onClick={() => this.setState({ to: '/' })}>
                      Cancel
                    </Button>
                    {process.env.NODE_ENV === 'production'
                      ? <Button
                        primary
                        onClick={this.handleSubmit}
                        disabled={
                            !this.state.name ||
                              !this.state.email ||
                              !this.state.phone ||
                              !this.state.address ||
                              !this.state.coverLetter ||
                              !this.state.WTCSApplication ||
                              !this.state.resume ||
                              !this.state.captcha
                          }
                        >
                          Apply To Job
                        </Button>
                      : <Button
                        primary
                        onClick={this.handleSubmit}
                        disabled={
                            !this.state.name ||
                              !this.state.email ||
                              !this.state.phone ||
                              !this.state.address ||
                              !this.state.coverLetter ||
                              !this.state.WTCSApplication ||
                              !this.state.resume
                          }
                        >
                          Apply To Job
                        </Button>}

                  </ButtonGroup>
                </FormLayout>
              </div>
            </Layout.Section>
          </Layout>
        </Page>
      </article>
    )
  }
}

const CoverLetter = ({
  onDrop,
  coverLetter,
  transferCurrent,
  transferTotal
}) => (
  <Dropzone
    className='ba w5 br3 pa3 flex col mxc cxc h-100 pointer dim w-100 dim-hover'
    style={{ borderColor: '#c4cdd5' }}
    onDrop={onDrop}
  >
    {coverLetter
      ? <p>Cover letter uploaded. Click here to upload a new one.</p>
      : <div className='tc'>
        <img
          src={upload}
          alt='Drag COVER LETTER here to upload.'
          className='respond'
          />
        <p className='tc pt3'>Drag COVER LETTER here to upload.</p>
      </div>}

    {transferCurrent !== 0 &&
      transferCurrent !== transferTotal &&
      <progress value={transferCurrent} max={transferTotal} />}
  </Dropzone>
)

const WTCSApplication = ({
  onDrop,
  WTCSApplication,
  transferCurrent,
  transferTotal
}) => (
  <Dropzone
    className='ba w5 br3 pa3 flex col mxc cxc h-100 pointer dim w-100 dim-hover'
    style={{ borderColor: '#c4cdd5' }}
    onDrop={onDrop}
  >
    {WTCSApplication
      ? <p>WTCS Application uploaded. Click here to upload a new one.</p>
      : <div className='tc'>
        <img
          src={upload}
          alt='Drag WTCS Application here to upload.'
          className='respond'
          />
        <p className='tc pt3'>Drag WTCS Application here to upload.</p>
      </div>}

    {transferCurrent !== 0 &&
      transferCurrent !== transferTotal &&
      <progress value={transferCurrent} max={transferTotal} />}
  </Dropzone>
)

const Resume = ({ onDrop, resume, transferCurrent, transferTotal }) => (
  <Dropzone
    className='ba w5 br3 pa3 flex col mxc cxc h-100 pointer dim w-100 dim-hover'
    style={{ borderColor: '#c4cdd5' }}
    onDrop={onDrop}
  >
    {resume
      ? <p>Resume uploaded. Click here to upload a new one.</p>
      : <div className='tc'>
        <img
          src={upload}
          alt='Drag your resume here to upload.'
          className='respond'
          />
        <p className='tc pt3'>Drag your resume here to upload.</p>
      </div>}

    {transferCurrent !== 0 &&
      transferCurrent !== transferTotal &&
      <progress value={transferCurrent} max={transferTotal} />}
  </Dropzone>
)
