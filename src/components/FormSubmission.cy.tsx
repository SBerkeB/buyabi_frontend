import React from 'react'
import FormSubmission from './FormSubmission'

describe('<FormSubmission />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<FormSubmission />)
  })
})