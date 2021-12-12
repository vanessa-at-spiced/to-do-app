# todo App MVP

-   [ ] write components in TypeScript
-   [ ] user login
-   [ ] add, edit, delete own todos

## Feature

-   build group option

    -   invite people to goup

-   assign todo to other user
    -   add, edit, delete todos

## Deploying

-   git-cli?
-   git-hooks:

-   linitng
-   formatting

## Testing / code organization

-   storybook

-   cypress (testing clickevents etc)

-   jsdoc

---

# TODO MVP :)

## todoList page

### Client

-   [ ] get todos from db
-   [ ] loop over

-   [ ] import todoItem Component
-   [ ] pass props to todoItemComponet

-   [ ] Input field "Add new Item"

### Server

-   [ ] GET Routing "/todos"
-   [ ] POST Routing "/todos"

### DB

-   [ ] get todos from db
    -   [ ]sort by date
-   [ ] add new todo to db

## todoItem Teaser Component

### Client

-   [ ] show titel
-   [ ] add delete / edit / done options
-   [ ] edit -> links to todoitem Full Page

### Server

-   [ ] POST Routing "/todos/delete/:id"
-   [ ] POST Routing "/todos/status/:id"

### DB

-   [ ] delete item
-   [ ] update item status

## todoItem Full

### Client

-   [ ] show title, description, date
-   [ ] textarea for description
-   [ ] add or edit description
-   [ ] edit title

### Server

-   [ ] GET Routing "/todos/:id"
-   [ ] POST Routing "/todos/:id"

### DB

-   [ ] get todo by id
-   [ ] update description
-   [ ] update title
