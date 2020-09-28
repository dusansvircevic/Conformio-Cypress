import {firstName, lastName, fullName, password, selector} from '../../fixtures/data.json'
import {randomEmail, randomAlphabeticalString} from '../../utils/index.js'


describe('Conformio Register, Login and Onboarding', () => {

  before(() => {
    cy.visit('/')
  })

  it('Register', () => {
    //Izbor jezika
    cy.get(selector.heading1).contains('Welcome to Conformio!').should('be.visible')
    cy.get(selector.heading4).contains('Interface language').should('be.visible')
    cy.get(selector.language).select('English')
    cy.get(selector.submit).click()

    //Email, Ime, Prezime, Password, Password confirmation
    cy.get(selector.heading4).contains('Email address').should('be.visible')
    cy.get(selector.heading4).contains('First name').should('be.visible')
    cy.get(selector.heading4).contains('Last name').should('be.visible')
    cy.get(selector.heading4).contains('Password').should('be.visible')
    cy.get(selector.heading4).contains('Retype Password').should('be.visible')
    cy.get(selector.submit).should('be.visible')
    cy.get(selector.email).eq('0').type(randomEmail)
    cy.get(selector.firstName).eq('1').type(firstName)
    cy.get(selector.lastName).eq('2').type(lastName)
    cy.get(selector.password).eq('3').type(password)
    cy.get(selector.passwordConfirmation).eq('4').type(password)
    cy.get(selector.submit).click()
    cy.wait(3000)
    
    //Ime kompanije
    cy.get(selector.heading4).contains('Company name').should('be.visible')
    cy.get(selector.companyName).type(randomAlphabeticalString)
    cy.get(selector.submit).click()
  })


  it('Login', () => {
    cy.get(selector.heading3).contains('Login').should('be.visible')
    cy.get(selector.loginEmail).type(randomEmail)
    cy.get(selector.loginPassword).type(password)
    cy.get(selector.submit).click()
  })


  it('Onboarding', () => {

    //Kada test stigne do ove tacke, u bazi podataka u tabeli 'company_pricing_plans' u koloni 'pricing_plans_id' promeniti vrednost na '1'
    cy.pause()

    //STEP 1: Account
    cy.get(selector.heading2).contains('Account setup').should('be.visible')
    cy.get(selector.btnNext).contains('Next section').click()
    cy.wait(5000)

    //STEP 2: Basic information
    cy.get(selector.heading2).contains('Some basic information').should('be.visible')
    cy.get(selector.country).select('Australia')
    cy.get(selector.btnNext).contains('Next section').click()
    cy.wait(5000)

    //STEP 3: Working with conformio
    cy.get(selector.heading2).contains('Working with Conformio').should('be.visible')
    cy.get(selector.btnNext).contains('Next section').click()
    cy.wait(5000)

    //STEP 4: People included
    cy.get(selector.heading2).contains('People included in your ISO 27001 project').should('be.visible')
    cy.get(selector.userEmail).eq('0').type(randomEmail)
    cy.get(selector.userEmail).eq('1').type(randomEmail)
    cy.get(selector.userEmail).eq('2').type(randomEmail)
    cy.get(selector.userEmail).eq('3').type(randomEmail)
    cy.get(selector.jobTitle).eq('0').type('CEO {enter}')
    cy.get(selector.jobTitle).eq('1').type('CEO {enter}')
    cy.get(selector.jobTitle).eq('2').type('CEO {enter}')
    cy.get(selector.jobTitle).eq('3').type('CEO {enter}')
    cy.get(selector.btnNext).contains('Next section').click()
    cy.wait(4000)

    //STEP 5: Company departments
    cy.get(selector.heading2).contains('Departments in your company').should('be.visible')
    cy.get(selector.btnNext).contains('Next section').click()
    cy.wait(4000)

    //STEP 6: Integrations
    cy.get(selector.heading2).contains('How would you like to collaborate with your colleagues?').should('be.visible')
    cy.get(selector.btnNext).contains('Next section').click()
    cy.wait(5000)

    //STEP 7: Security objectives
    cy.get(selector.heading2).contains('What would you like to achieve with your ISO 27001 project?').should('be.visible')
    cy.get(selector.btnFinish).contains('Finish wizard').click()
    cy.wait(10000)
    
    //Asertacija da je prosao Onboarding i da je novi korisnik ulogovan
    cy.get(selector.heading2).contains('ISO 27001 main steps').should('be.visible')
    cy.get(selector.userName).contains(fullName).should('be.visible')
  })

})
