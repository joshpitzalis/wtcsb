import React, { Component } from 'react'

import { Page, Layout, Card } from '@shopify/polaris'

class App extends Component {
  render() {
    return (
      <Page fullWidth title="Job Opportinites">
        <Layout>
          <Layout.Section secondary>
            <Card title="Order details" sectioned>
              <p>View a summary of your order.</p>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card title="Tags" sectioned>
              <p>Add tags to your order.</p>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    )
  }
}

export default App
