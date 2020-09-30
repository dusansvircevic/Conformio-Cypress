import credentials from '../../fixtures/credentials.json'
import locators from '../../fixtures/locators.json'
import {randomEmail, randomAlphabeticalString} from '../../utils/index.js'


describe('Registration Company module', () => {

  before(() => {
    cy
      .visit('/preonboarding/language')
      .get(locators.REGISTRATION.LANGUAGE).select('English')
      .get(locators.REGISTRATION.SUBMIT).click()
      .get(locators.REGISTRATION.EMAIL).eq('0').type(randomEmail)
      .get(locators.REGISTRATION.FIRSTNAME).eq('1').type(credentials.REGISTRATION.FIRSTNAME)
      .get(locators.REGISTRATION.LASTNAME).eq('2').type(credentials.REGISTRATION.LASTNAME)
      .get(locators.REGISTRATION.PASSWORD).eq('3').type(credentials.REGISTRATION.PASSWORD)
      .get(locators.REGISTRATION.PASSWORD).eq('4').type(credentials.REGISTRATION.PASSWORD)
      .get(locators.REGISTRATION.SUBMIT).click()
      .wait(2500)
    })

  it('Layout - Company name', () => {
    cy
      .get(locators.REGISTRATION.INPUTNAME).contains('Company name')
        .should('be.visible')
      .get(locators.REGISTRATION.COMPANY)
        .should('be.visible').click()
      .get(locators.REGISTRATION.SUBMIT)
        .should('be.visible')
  })

  it('Registration - Unsuccessful Company creation - Company name field empt', () => {
    cy
      .get(locators.REGISTRATION.COMPANY).clear()
      .get(locators.REGISTRATION.SUBMIT).click()
      .get(locators.REGISTRATION.COMPANY).then(($input) => {
          expect($input[0].validationMessage).to.contain('Please fill in this field.')
        })    
  })

  it('Registration - Successful Company creation', () => {
    cy
      .get(locators.REGISTRATION.COMPANY).type(randomAlphabeticalString)
      .get(locators.REGISTRATION.SUBMIT).click()    
      .get(locators.REGISTRATION.LOGIN).contains('Login')
        .should('be.visible')
  })

})