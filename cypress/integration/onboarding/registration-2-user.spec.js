import credentials from '../../fixtures/credentials.json'
import locators from '../../fixtures/locators.json'
import {randomEmail, randomPassword, randomAlphabeticalString} from '../../utils/index.js'


describe('Registration User module', () => {

  beforeEach(() => {
    cy
      .server()
      .route('POST', '/api/preonboarding/user').as('Company')
    })

    before(() => {
      cy
        .visit('/preonboarding/language')
        .server()
        .route('POST', '/api/preonboarding/user').as('Company')
        .get(locators.REGISTRATION.LANGUAGE).select('English')
        .get(locators.REGISTRATION.SUBMIT).click()
      })
  
  it('Layout - User', () => {
    cy
      .get(locators.REGISTRATION.WELCOME).contains('Welcome to Conformio!')
        .should('be.visible')
      .get(locators.REGISTRATION.INITIALSETUP).contains('Initial Setup')
        .should('be.visible')
      .get(locators.REGISTRATION.INPUTNAME).contains('Email address')
        .should('be.visible').click()
      .get(locators.REGISTRATION.INPUTNAME).contains('First name')
        .should('be.visible').click()
      .get(locators.REGISTRATION.INPUTNAME).contains('Last name')
        .should('be.visible').click()
      .get(locators.REGISTRATION.INPUTNAME).contains('Password')
        .should('be.visible').click()
      .get(locators.REGISTRATION.INPUTNAME).contains('Retype Password')
        .should('be.visible').click()
      .get(locators.REGISTRATION.SUBMIT)
        .should('be.visible')
  })

  it('User - Unuccessful user creation - all fields empty', () => {
    cy
      .get(locators.REGISTRATION.SUBMIT).click()
      .get(locators.REGISTRATION.EMAIL).then(($input) => {
        expect($input[0].validationMessage).to.contain('Please fill in this field.')
      })    
  })

  it('User - Unuccessful user creation - Only email field filled', () => {
    cy
      .get(locators.REGISTRATION.EMAIL).eq('0').clear().type(randomEmail)
      .get(locators.REGISTRATION.SUBMIT).click()
      .get(locators.REGISTRATION.FIRSTNAME).then(($input) => {
        expect($input[1].validationMessage).to.contain('Please fill in this field.')
      })    
  })

  it('User - Unuccessful user creation - First two fields filled', () => {
    cy
      .get(locators.REGISTRATION.EMAIL).eq('0').clear().type(randomEmail)
      .get(locators.REGISTRATION.FIRSTNAME).eq('1').clear().type(credentials.REGISTRATION.FIRSTNAME)
      .get(locators.REGISTRATION.SUBMIT).click()
      .get(locators.REGISTRATION.LASTNAME).then(($input) => {
        expect($input[2].validationMessage).to.contain('Please fill in this field.')
      })    
  })

  it('User - Unuccessful user creation - First three fields filled', () => {
    cy
      .get(locators.REGISTRATION.EMAIL).eq('0').clear().type(randomEmail)
      .get(locators.REGISTRATION.FIRSTNAME).eq('1').clear().type(credentials.REGISTRATION.FIRSTNAME)
      .get(locators.REGISTRATION.LASTNAME).eq('2').clear().type(credentials.REGISTRATION.LASTNAME)
      .get(locators.REGISTRATION.SUBMIT).click()
      .get(locators.REGISTRATION.PASSWORD).then(($input) => {
        expect($input[3].validationMessage).to.contain('Please fill in this field.')
      })    
  })

  it('User - Unuccessful user creation - First four fields filled', () => {
    cy
      .get(locators.REGISTRATION.EMAIL).eq('0').clear().type(randomEmail)
      .get(locators.REGISTRATION.FIRSTNAME).eq('1').clear().type(credentials.REGISTRATION.FIRSTNAME)
      .get(locators.REGISTRATION.LASTNAME).eq('2').clear().type(credentials.REGISTRATION.LASTNAME)
      .get(locators.REGISTRATION.PASSWORD).eq('3').clear().type(credentials.REGISTRATION.PASSWORD)
      .get(locators.REGISTRATION.SUBMIT).click()
      .get(locators.REGISTRATION.PASSWORD).then(($input) => {
        expect($input[4].validationMessage).to.contain('Please fill in this field.')
      })    
  })

  it('User - Unuccessful user creation - Invalid email', () => {
    cy
      .get(locators.REGISTRATION.EMAIL).eq('0').clear().type(randomAlphabeticalString)
      .get(locators.REGISTRATION.FIRSTNAME).eq('1').clear().type(credentials.REGISTRATION.FIRSTNAME)
      .get(locators.REGISTRATION.LASTNAME).eq('2').clear().type(credentials.REGISTRATION.LASTNAME)
      .get(locators.REGISTRATION.PASSWORD).eq('3').clear().type(credentials.REGISTRATION.PASSWORD)
      .get(locators.REGISTRATION.PASSWORD).eq('4').clear().type(credentials.REGISTRATION.PASSWORD)
      .get(locators.REGISTRATION.SUBMIT).click()
      .get(locators.REGISTRATION.EMAIL).then(($input) => {
        expect($input[0].validationMessage).to.contain('Please include an \'@\' in the email address.')
      })    
  })

  it('User - Unuccessful user creation - Password do not mach', () => {
    cy
      .get(locators.REGISTRATION.EMAIL).eq('0').clear().type(randomEmail)
      .get(locators.REGISTRATION.FIRSTNAME).eq('1').clear().type(credentials.REGISTRATION.FIRSTNAME)
      .get(locators.REGISTRATION.LASTNAME).eq('2').clear().type(credentials.REGISTRATION.LASTNAME)
      .get(locators.REGISTRATION.PASSWORD).eq('3').clear().type(credentials.REGISTRATION.PASSWORD)
      .get(locators.REGISTRATION.PASSWORD).eq('4').clear().type(credentials.REGISTRATION.WRONGPASSWORD)
      .get(locators.REGISTRATION.SUBMIT).click()
      .get(locators.REGISTRATION.ERROR).contains(' Passwords do not match ').should('be.visible')
  })
  
  it('User - Successful user creation', () => {
    cy
      .get(locators.REGISTRATION.EMAIL).eq('0').clear().type(randomEmail)
      .get(locators.REGISTRATION.FIRSTNAME).eq('1').clear().type(credentials.REGISTRATION.FIRSTNAME)
      .get(locators.REGISTRATION.LASTNAME).eq('2').clear().type(credentials.REGISTRATION.LASTNAME)
      .get(locators.REGISTRATION.PASSWORD).eq('3').clear().type(credentials.REGISTRATION.PASSWORD)
      .get(locators.REGISTRATION.PASSWORD).eq('4').clear().type(credentials.REGISTRATION.PASSWORD)
      .get(locators.REGISTRATION.SUBMIT).click()
      .wait('@Company')
      .get(locators.REGISTRATION.INPUTNAME).contains('Company name')
        .should('be.visible')
  })

})