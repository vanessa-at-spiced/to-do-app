import { BrowserRouter, Route, NavLink } from "react-router-dom";
import { Container, Navbar, Nav, Alert } from "react-bootstrap";
import Todolist from "./todolist";

export interface Props {
    user?: number;
}

export default function App(props: Props) {
    console.log(props.user);
    return (
        <>
            <BrowserRouter>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand>
                            <Nav.Link key="/" to="/" as={NavLink} exact>
                                todo
                            </Nav.Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mx-auto">
                                <Nav.Link
                                    key="/todos"
                                    to="/todos"
                                    as={NavLink}
                                    exact
                                >
                                    List
                                </Nav.Link>

                                <a className="nav-link" href="/logout">
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
                    </div>
                </Container>
            </BrowserRouter>
        </>
    );
}
