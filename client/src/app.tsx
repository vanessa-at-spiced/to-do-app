import { BrowserRouter, Route, NavLink } from "react-router-dom";
import { Container, Navbar, Nav, Alert } from "react-bootstrap";
import Todolist from "./components/TodoList/todolist";
import TodoItem from "./components/TodoItem/TodoItem";

export interface UserId {
    user?: number;
}

export default function App(props: UserId) {
    console.log(props.user);
    return (
        <>
            <div className="bg-color">
                <BrowserRouter>
                    <Navbar expand="lg">
                        <Container>
                            <Navbar.Brand>
                                <Nav.Link
                                    key="/todos"
                                    to="/todos"
                                    as={NavLink}
                                    className="active logo"
                                >
                                    MYL
                                </Nav.Link>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="mx-auto">
                                    {/* <Nav.Link
                                    key="/todos"
                                    to="/todos"
                                    as={NavLink}
                                    exact
                                >
                                    List
                                </Nav.Link> */}

                                    <a
                                        className="nav-link logout"
                                        href="/logout"
                                    >
                                        Logout
                                    </a>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <Container>
                        <div id="app">
                            <Route exact path="/todos">
                                <Todolist user={props.user} />
                            </Route>
                            <Route exact path="/todo/:id">
                                <TodoItem />
                            </Route>
                        </div>
                    </Container>
                </BrowserRouter>
            </div>
        </>
    );
}
