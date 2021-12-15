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

        cy.findByRole('textbox').type('Feed Cat');
        cy.findByRole('button', { name: /add todo/i });

        cy.findByText(/feed cat/i).click();


        cy.findByRole('button', { name: /add description/i }).click();

        cy.findByRole('textbox').type('add special xyz');
        // cy.wait(500);

        cy.findByRole('button', { name: /save/i }).click();

        cy.get('.description').contains('add special xyz');

        cy.findByRole('button', { name: /back to list/i }).click();

        //click on add todo
        // cy.get('.to-title').contains('add special xyz');

        cy.get('.todo-item').contains('Feed Cat');


        //insert title and click add

        //see todo list again

        //click on title to editü to do

        //see todoitem

        //click add description

        //see textarea and put in some text, click save

        //go back to todo list

        //click on done button


    })
})
