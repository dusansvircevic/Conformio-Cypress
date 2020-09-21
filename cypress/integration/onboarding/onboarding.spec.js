import {firstName, lastName, fullName, password} from '../../fixtures/data.json'
import {email, companyName} from '../../utils/index.js'


describe('Conformio Register, Login and Onboarding', () => {

  before(() => {
    cy.visit('/')
  })

  it('Register, Login and Onboarding', () => {
    //REGISTERATION
    //Izbor jezika
    cy.get('h1').contains('Welcome to Conformio!').should('be.visible')
    cy.get('h4').contains('Interface language').should('be.visible')
    cy.get('.cf-c-select-native__field').select('English')
    cy.get('.cf-c-preonboarding__next').click()

    //Email, Ime, Prezime, Password, Password confirmation
    cy.get('h4').contains('Email address').should('be.visible')
    cy.get('h4').contains('First name').should('be.visible')
    cy.get('h4').contains('Last name').should('be.visible')
    cy.get('h4').contains('Password').should('be.visible')
    cy.get('h4').contains('Retype Password').should('be.visible')
    cy.get('[type=submit]').should('be.visible')
    cy.get('.cf-c-input__field').eq('0').type(email)
    cy.get('.cf-c-input__field').eq('1').type(firstName)
    cy.get('.cf-c-input__field').eq('2').type(lastName)
    cy.get('.cf-c-input__field').eq('3').type(password)
    cy.get('.cf-c-input__field').eq('4').type(password)
    cy.get('[type=submit]').click()
    cy.wait(3000)
    
    //Ime kompanije
    cy.get('h4').contains('Company name').should('be.visible')
    cy.get('.cf-c-input__field').type(companyName)
    cy.get('[type=submit]').click()

    //LOGIN
    cy.get('h3').contains('Login').should('be.visible')
    cy.get('[type=email]').type(email)
    cy.get('[type=password]').type('test1234')
    cy.get('[type=submit]').click()

    //Kada test stigne do ove tacke, u bazi podataka u tabeli 'company_pricing_plans' u koloni 'pricing_plans_id' promeniti vrednost na '1'
    cy.pause()

    //ONBOARDING
    //STEP 1: Account
    cy.get('h2').contains('Account setup').should('be.visible')
    cy.get('.cf-c-btn').click()
    cy.wait(5000)

    //STEP 2: Basic information
    cy.get('h2').contains('Some basic information').should('be.visible')
    cy.get('.cf-c-select-native__field').select('Australia')
    cy.get('.cf-c-btn').contains('Next section').click()
    cy.wait(5000)

    //STEP 3: Working with conformio
    cy.get('h2').contains('Working with Conformio').should('be.visible')
    cy.get('.cf-c-btn').contains('Next section').click()
    cy.wait(5000)

    //STEP 4: People included
    cy.get('h2').contains('People included in your ISO 27001 project').should('be.visible')
    cy.get('.cf-c-input__field').eq('0').type(email)
    cy.get('.cf-c-input__field').eq('1').type(email)
    cy.get('.cf-c-input__field').eq('2').type(email)
    cy.get('.cf-c-input__field').eq('3').type(email)
    cy.get('.vs__search').eq('0').type('CEO {enter}')
    cy.get('.vs__search').eq('1').type('CEO {enter}')
    cy.get('.vs__search').eq('2').type('CEO {enter}')
    cy.get('.vs__search').eq('3').type('CEO {enter}')
    cy.get('.cf-c-btn').contains('Next section').click()
    cy.wait(4000)

    //STEP 5: Company departments
    cy.get('h2').contains('Departments in your company').should('be.visible')
    cy.get('.cf-c-btn').contains('Next section').click()
    cy.wait(4000)

    //STEP 6: Integrations
    cy.get('h2').contains('How would you like to collaborate with your colleagues?').should('be.visible')
    cy.get('.cf-c-btn').contains('Next section').click()
    cy.wait(5000)

    //STEP 7: Security objectives
    //cy.get('h2').contains('Security objectives').should('be.visible')
    //cy.get('.cf-c-btn').contains('Next section').click()
    //cy.wait(5000)
    
    //Asertacija da je prosao Onboarding i da je novi korisnik ulogovan
    cy.get('h2').contains('ISO 27001 main steps').should('be.visible')
    cy.get('.cf-c-header-dropdown__label-text').contains(fullName).should('be.visible')
  })

})