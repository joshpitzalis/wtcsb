const testUser = {
  key: `firebase:authUser:AIzaSyBxgsEU_gRVWHbedeSs659-g9PI8MIx2D0:[DEFAULT]`,
  token: `{"uid":"ZV75WbnIdDetpvl2tfPginw1plX2","displayName":null,"photoURL":null,"email":"test@test.com","emailVerified":false,"phoneNumber":null,"isAnonymous":false,"providerData":[{"uid":"test@test.com","displayName":null,"photoURL":null,"email":"test@test.com","phoneNumber":null,"providerId":"password"}],"apiKey":"AIzaSyBxgsEU_gRVWHbedeSs659-g9PI8MIx2D0","appName":"[DEFAULT]","authDomain":"wtcsb-employment-portal.firebaseapp.com","stsTokenManager":{"apiKey":"AIzaSyBxgsEU_gRVWHbedeSs659-g9PI8MIx2D0","refreshToken":"APRrRCIooPCXYAJKYa9c19hcKJBvD8vQsykjPSFS6LJ8j17_0DzMiwhSpI1on7ZO2Cp5Tj2SBwLG0QkSH2lSVHSe5GVrEKiS2UEObPoK_U6gTAspe-pV6wSqvDOsbdZjgOtwVI_qyrzDf6EGVe3cU_5dNcq-fjka5EWPz8N7yyGsuvdLpJADpBZtUBcdG7XU50EVJ-XP3vBHkP3LoDT_sja-xHs3Lnq-6ymU-C7ngzopxwI0ZOaWJEM","accessToken":"eyJhbGciOiJSUzI1NiIsImtpZCI6ImEyNzcyNmZkZDViNDJmYzg5MDk5ZDlmZTEzMDYzYmNmOWY3ODdhODQifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vd3Rjc2ItZW1wbG95bWVudC1wb3J0YWwiLCJhdWQiOiJ3dGNzYi1lbXBsb3ltZW50LXBvcnRhbCIsImF1dGhfdGltZSI6MTUwNjMxMTYyMSwidXNlcl9pZCI6IlpWNzVXYm5JZERldHB2bDJ0ZlBnaW53MXBsWDIiLCJzdWIiOiJaVjc1V2JuSWREZXRwdmwydGZQZ2ludzFwbFgyIiwiaWF0IjoxNTA2MzExNjIxLCJleHAiOjE1MDYzMTUyMjEsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0QHRlc3QuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.ZCYaIEoB3OpXuhZQyXSH36u60LdXtpgK4qkyFb5nU-2y3iBi_vm6B1zzagGB16y5H-POAp-Mj7UbD389R3uLJsLf5v01SGXz185iV2KUUIz65ypnChBqT7yQSlXnjvbtZ3EdzO5BESrWPn3wSt8ZNaPeyGiN00GR1jT6mpgzK676z67cHI8bi4HBeHBrZGfnVFZQUmAqqLw9rb6XivpTzLilQObZYCbgd8gNX9cfkUYN-sHql2ewcClSFUOchcrMu6uKGedO-GiHhh0YbUqxXpAjOwsMazR-sZ3KpjGUmmustI4WQ6ZdRDAHiqPdG8Xm7wfa2lRu33DLtP4N4gAqQg","expirationTime":1506315221317},"redirectEventId":null}`
}

// cy.fixture('testUser').then(testUser => {
//   cy.visit('/login', {
//     onBeforeLoad: win => {
//       win.localStorage.setItem(testUser.key, testUser.token)
//     }
//   })
// })

describe('Homepage', () => {
  it('successfully loads', () => {
    cy.visit('/')
    cy.get('h1').should('contain', 'Job Opportinites')
  })
})

describe('Login', () => {
  it('successfully loads', () => {
    cy.visit('/login')
    cy.get('h1').should('contain', 'WTCSB EMPLOYMENT PORTAL')
  })

  it.skip('lets you sign in proceduraly', () => {
    cy.visit('/login')
    cy.get('input[type=email]').type(`test@test.com`)
    cy.get('input[type=password]').type(`test123`)
    cy
      .contains('Login')
      .click()
      .wait(3000)
    cy.visit('/dashboard')
    cy.url().should('include', 'dashboard')
  })

  it('logs in automatically with a token', () => {
    cy.visit('/login', {
      onBeforeLoad: win => {
        win.localStorage.setItem(testUser.key, testUser.token)
      }
    })
    cy.url().should('include', 'dashboard')
  })
})

describe('Create, Apply and recieve a Job Application', () => {
  it('lets admin create a new job', () => {
    cy.visit('/dashboard', {
      onBeforeLoad: win => {
        win.localStorage.setItem(testUser.key, testUser.token)
      }
    })
    cy.contains('New').click()
    cy.url().should('include', 'create')
    cy.get('#createFormCategory').select('Other')
    cy.get('#createFormTitle').type('Looking for a head honcho')
    cy.get('#createFormPosition').type('head honcho')
    cy.get('#createFormLocation').select('Other')
    cy.get('#createFormResponsibilities').type('A list of responsibilities')
    cy.get('#createFormEducation').select('Bachelors')
    // cy
    //   .get('input[type="checkbox"]')
    //   .contains('days')
    //   .check()
    cy.get('#createFormSalary').select('More than $100K')
    // cy
    //   .get('input[type="radio"]')
    //   .contains('Licensed Resident/Supervisee')
    //   .check()

    cy.get('#createFormExperience').select('5 years')
    cy.get('#createFormInfo').type('Extra info')
    cy.contains('Create Job').click()
    cy.url().should('include', 'dashboard')
    cy.get('body').should('contain', 'Looking for a head honcho')
  })

  it.skip('not filling out all create job fields creates an error', () => {})

  it('allows users to apply to the new job', () => {
    cy.visit('/')
    cy
      .contains('Looking for a head honcho')
      .parent()
      .click()
    cy.get('h1').should('contain', 'Looking for a head honcho')
    cy.contains('Apply').click()
    cy.get('h1').should('contain', 'Job Application Form')
    cy.get('#jobApplicationName').type('John Doe')
    cy.get('#jobApplicationEmail').type('john@doe.com')
    cy.get('#jobApplicationPhone').type('1234567890')
    cy.get('#jobApplicationAddress').type('A Random Address')
    cy.contains('Apply To Job').click()
    cy.url().should('not.include', 'apply')
    cy.get('h1').should('contain', 'WTCSB Job Opportinites')
  })

  it.skip(
    'not filling out all job application fields creates an error',
    () => {}
  )

  it('makes sure admin recieves application', () => {
    cy.visit('/dashboard', {
      onBeforeLoad: win => {
        win.localStorage.setItem(testUser.key, testUser.token)
      }
    })
    cy
      .contains('Looking for a head honcho')
      .parent()
      .click()
    cy.url().should('include', 'applicants')
    cy.contains('body').should('contain', 'John Doe')
  })
})
