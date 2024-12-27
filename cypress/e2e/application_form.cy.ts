/// <reference types="cypress" />

describe('ApplicationForm', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('renders the form', () => {
        cy.get('input[name="firstname"]').should('exist');
        cy.get('input[name="lastname"]').should('exist');
        cy.get('input[name="studentNumber"]').should('exist');
        cy.get('input[name="email"]').should('exist');
        cy.get('input[name="phone"]').should('exist');
        cy.get('select[name="nationality"]').should('exist');
        cy.get('select[name="department"]').should('exist');
        cy.get('select[name="grade"]').should('exist');
        
    });

    it('submits the form', () => {
        cy.get('input[name="firstname"]').type('John');
        cy.get('input[name="lastname"]').type('Doe');
        cy.get('input[name="studentNumber"]').type('2101544');
        cy.get('input[name="email"]').type('samiberke2003@gmail.com');
        cy.get('input[name="phone"]').type('5333747399');
        cy.get('select[name="nationality"]').select('Turkish');
        cy.get('select[name="department"]').select('Software Engineering');
        cy.get('select[name="grade"]').select('Senior');

        cy.get('button[type="submit"]').click();

        // ...assertions for form submission...
    });
});
