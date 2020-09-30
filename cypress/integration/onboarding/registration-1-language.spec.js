import locators from '../../fixtures/locators.json'


describe('Registration Language module', () => {

  beforeEach(() => {
    cy
      .visit('/preonboarding/language')
    })

  it('Layout - Langugae', () => {
    cy
      .get(locators.REGISTRATION.WELCOME).contains('Welcome to Conformio!')
        .should('be.visible')
      .get(locators.REGISTRATION.INITIALSETUP).contains('Initial Setup')
        .should('be.visible')
  })

  it('Language - English selected', () => {
    cy
      .get(locators.REGISTRATION.LANGUAGE).select('English')
      .get(locators.REGISTRATION.SUBMIT).click()
        .get(locators.REGISTRATION.INPUTNAME).contains('Email address')
          .should('be.visible')
  })

  it('Language - Croatian selected', () => {
    cy
      .get(locators.REGISTRATION.LANGUAGE).select('Croatian')
      .get(locators.REGISTRATION.SUBMIT).click()
        .get(locators.REGISTRATION.INPUTNAME).contains('Prezime')
          .should('be.visible')
  })

  it('Language - none selected', () => {
    cy
      .get(locators.REGISTRATION.SUBMIT).click()
      .get(locators.REGISTRATION.LANGUAGE).then(($input) => {
          expect($input[0].validationMessage).to.contain('Please select an item in the list.')
        })    
  })

})