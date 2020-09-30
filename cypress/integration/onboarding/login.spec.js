import credentials from '../../fixtures/credentials.json'
import locators from '../../fixtures/locators.json'
import {randomEmail, randomPassword, randomAlphabeticalString} from '../../utils/index.js'


describe('Login module', () => {

  beforeEach(() => {
    cy
      .server()
      .route('GET', '/api/company').as('conformio')
    })

    before(() => {
      cy
        .visit('/login')
      })
  
  it('Layout - Login', () => {
    cy
      .get(locators.LOGIN.TITLE).contains('Login')
        .should('be.visible')
      .get(locators.LOGIN.EMAIL)
        .should('be.visible').click()
      .get(locators.LOGIN.PASSWORD)
        .should('be.visible').click()
      .get(locators.LOGIN.SUBMIT)
        .should('be.visible')
  })

  it('Unsuccessful Login - both credentials are wrong', () => {
    cy
      .get(locators.LOGIN.EMAIL).clear().type(randomEmail)
      .get(locators.LOGIN.PASSWORD).clear().type(randomPassword)
      .get(locators.LOGIN.SUBMIT).click()
      .get(locators.LOGIN.ALERT).contains('Your email and password do not match.')
        .should('be.visible')
  })

  it('Unsuccessful Login - email is wrong, password is correct', () => {
    cy
      .get(locators.LOGIN.EMAIL).clear().type(randomEmail)
      .get(locators.LOGIN.PASSWORD).clear().type(credentials.LOGIN.PASSWORD)
      .get(locators.LOGIN.SUBMIT).click()
      .get(locators.LOGIN.ALERT).contains('Your email and password do not match.')
        .should('be.visible')
  })

  it('Unsuccessful Login - email is correct, password is wrong', () => {
    cy
      .get(locators.LOGIN.EMAIL).clear().type(credentials.LOGIN.EMAIL)
      .get(locators.LOGIN.PASSWORD).clear().type(randomPassword)
      .get(locators.LOGIN.SUBMIT).click()
      .get(locators.LOGIN.ALERT).contains('Your email and password do not match.')
        .should('be.visible')
  })

  it('Unsuccessful Login - email input field is empty', () => {
    cy
      .get(locators.LOGIN.EMAIL).clear()
      .get(locators.LOGIN.PASSWORD).clear().type(credentials.LOGIN.PASSWORD)
      .get(locators.LOGIN.SUBMIT)
        .should('be.disabled')
  })

  it('Unsuccessful Login - password input field is empty', () => {
    cy
      .get(locators.LOGIN.EMAIL).clear().type(credentials.LOGIN.EMAIL)
      .get(locators.LOGIN.PASSWORD).clear()
      .get(locators.LOGIN.SUBMIT)
        .should('be.disabled')
  })

  it('Unsuccessful Login - email is invalid', () => {
    cy
      .get(locators.LOGIN.EMAIL).clear().type(randomAlphabeticalString)
      .get(locators.LOGIN.PASSWORD).clear().type(credentials.LOGIN.PASSWORD)
      .get(locators.LOGIN.SUBMIT).click()
      .get(locators.LOGIN.EMAIL).then(($input) => {
          expect($input[0].validationMessage).to.contain('Please include an \'@\' in the email address.')
        })    

  })

  it('Successful Login', () => {
    cy
      .get(locators.LOGIN.EMAIL).clear().type(credentials.LOGIN.EMAIL)
      .get(locators.LOGIN.PASSWORD).clear().type(credentials.LOGIN.PASSWORD)
      .get(locators.LOGIN.SUBMIT).click()
      .wait('@conformio')
      .get(locators.LOGIN.USERNAME).contains(credentials.LOGIN.FULLNAME)
        .should('be.visible')
  })

})
