import credentials from '../../fixtures/credentials.json'
import locators from '../../fixtures/locators.json'
import {randomEmail, randomAlphabeticalString} from '../../utils/index.js'


describe('Conformio Onboarding', () => {

  before(() => {
    cy.visit('/preonboarding/language')
  })

  it('Registration - Language', () => {
    cy
      .get(locators.REGISTRATION.TITLE).contains('Interface language')
        .should('be.visible')
      .get(locators.REGISTRATION.LANGUAGE).select('English')
      .get(locators.REGISTRATION.SUBMIT).click()
  })

  it('Registration- Credentials', () => {
    cy
      .get(locators.REGISTRATION.INPUTNAME).contains('Email address')
        .should('be.visible')
      .get(locators.REGISTRATION.INPUTNAME).contains('First name')
        .should('be.visible')
      .get(locators.REGISTRATION.INPUTNAME).contains('Last name')
        .should('be.visible')
      .get(locators.REGISTRATION.INPUTNAME).contains('Password')
        .should('be.visible')
      .get(locators.REGISTRATION.INPUTNAME).contains('Retype Password')
        .should('be.visible')
      .get(locators.REGISTRATION.SUBMIT)
        .should('be.visible')
      .get(locators.REGISTRATION.SUBMIT).eq('0').type(randomEmail)
      .get(locators.REGISTRATION.FIRSTNAME).eq('1').type(credentials.ONBOARDING.FIRSTNAME)
      .get(locators.REGISTRATION.LASTNAME).eq('2').type(credentials.ONBOARDING.LASTNAME)
      .get(locators.REGISTRATION.PASSWORD).eq('3').type(credentials.ONBOARDING.PASSWORD)
      .get(locators.REGISTRATION.PASSWORD).eq('4').type(credentials.ONBOARDING.PASSWORD)
      .get(locators.REGISTRATION.SUBMIT).click()
      .wait(3000)
  })

  it('Registration - Company', () => {
    cy
      .get(locators.REGISTRATION.INPUTNAME).contains('Company name')
        .should('be.visible')
      .get(locators.REGISTRATION.COMPANY).type(randomAlphabeticalString)
      .get(locators.REGISTRATION.SUBMIT).click()    
  })

  it('Login', () => {
    cy
      .get(locators.LOGIN.TITLE).contains('Login')
        .should('be.visible')
      .get(locators.LOGIN.EMAIL).type(randomEmail)
      .get(locators.LOGIN.PASSWORD).type(credentials.ONBOARDING.PASSWORD)
      .get(locators.LOGIN.SUBMIT).click()
  })

  it('Onboarding', () => {
    //Kada test stigne do ove tacke, u bazi podataka u tabeli 'company_pricing_plans' u koloni 'pricing_plans_id' promeniti vrednost na '1'
    cy.pause()

    //STEP 1: Account
      .get(locators.ONBOARDING.TITLE).contains('Account setup')
        .should('be.visible')
      .get(locators.ONBOARDING.BUTTONNEXT).contains('Next section').click()
      .wait(5000)

    //STEP 2: Basic information
      .get(locators.ONBOARDING.TITLE).contains('Some basic information')
        .should('be.visible')
      .get(locators.ONBOARDING.COUNTRY).select('Australia')
      .get(locators.ONBOARDING.BUTTONNEXT).contains('Next section').click()
      .wait(5000)

    //STEP 3: Working with conformio
      .get(locators.ONBOARDING.TITLE).contains('Working with Conformio')
        .should('be.visible')
      .get(locators.ONBOARDING.BUTTONNEXT).contains('Next section').click()
      .wait(5000)

    //STEP 4: People included
      .get(locators.ONBOARDING.TITLE).contains('People included in your ISO 27001 project')
        .should('be.visible')
      .get(locators.ONBOARDING.USEREMAIL).eq('0').type(randomEmail)
      .get(locators.ONBOARDING.USEREMAIL).eq('1').type(randomEmail)
      .get(locators.ONBOARDING.USEREMAIL).eq('2').type(randomEmail)
      .get(locators.ONBOARDING.USEREMAIL).eq('3').type(randomEmail)
      .get(locators.ONBOARDING.JOBTITLE).eq('0').type('CEO {enter}')
      .get(locators.ONBOARDING.JOBTITLE).eq('1').type('CEO {enter}')
      .get(locators.ONBOARDING.JOBTITLE).eq('2').type('CEO {enter}')
      .get(locators.ONBOARDING.JOBTITLE).eq('3').type('CEO {enter}')
      .get(locators.ONBOARDING.BUTTONNEXT).contains('Next section').click()
      .wait(4000)

    //STEP 5: Company departments
      .get(locators.ONBOARDING.TITLE).contains('Departments in your company')
        .should('be.visible')
      .get(locators.ONBOARDING.BUTTONNEXT).contains('Next section').click()
      .wait(4000)

    //STEP 6: Integrations
      .get(locators.ONBOARDING.TITLE).contains('How would you like to collaborate with your colleagues?')
        .should('be.visible')
      .get(locators.ONBOARDING.BUTTONNEXT).contains('Next section').click()
      .wait(5000)

    //STEP 7: Security objectives
      .get(locators.ONBOARDING.TITLE).contains('What would you like to achieve with your ISO 27001 project?')
        .should('be.visible')
      .get(locators.ONBOARDING.BUTTONFINISH).contains('Finish wizard').click()
      .wait(10000)
    
    //Asertacija da je prosao Onboarding i da je novi korisnik ulogovan
      .get(locators.ONBOARDING.TITLE).contains('ISO 27001 main steps')
        .should('be.visible')
      .get(locators.ONBOARDING.USERNAME).contains(credentials.ONBOARDING.FULLNAME)
        .should('be.visible')
  })

})
