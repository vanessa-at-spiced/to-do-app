const { v4: uuidv4 } = require('uuid');

describe("todo", () => {
    it('user can create todo', () => {
        //login
        cy.visit('/login');

        cy.findByRole('textbox', { name: /email address/i }).type('vanessa.pertsch@posteo.de');

        cy.findByLabelText(/password/i).type('test');

        cy.findByRole('button', { name: /log in/i }).click();


        // we should be redirected to /todos
        cy.url().should('include', '/todos');

        // our auth cookie should be present
        cy.getCookie('session').should('exist');

        //add todo
        const note = uuidv4().slice(0, 5);
        cy.findByRole('textbox').type(`Feed Cat-${note}`);
        cy.findByRole('button', { name: /add todo/i }).click();

        cy.findByText(`Feed Cat-${note}`).click();


        cy.findByRole('button', { name: /add description/i }).click();

        cy.findByRole('textbox').type('add special xyz');
        // cy.wait(500);

        cy.findByRole('button', { name: /save/i }).click();

        cy.get('.description-detail').contains('add special xyz');

        cy.findByRole('button', { name: /back to list/i }).click();

        //click on add todo


        // cy.get('.to-title').contains('add special xyz');

        // cy.get('.todo-item').contains(`Feed Cat-${note}`);

        cy.get('.todo-item').contains(`Feed Cat-${note}`).parent().find('.done').click();
        cy.wait(2000);

        cy.get('.todo-item').contains(`Feed Cat-${note}`).closest('div').should('have.class', 'done');


    });
});
