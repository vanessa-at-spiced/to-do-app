
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import Registration from './welcome/registration';
import Login from './welcome/login';
import { Container, Navbar, Nav } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

export default function Welcome() {
    return (
        <BrowserRouter>

            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>
                        <Nav.Link
                            key="/"
                            to="/"
                            as={NavLink}
                            activeclassname="active"
                        >TODO
                        </Nav.Link>
                    </Navbar.Brand>


                </Container>
            </Navbar>


            <Container>


                <div id="welcome">


                    <Route exact path="/">
                        <Registration />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>

                </div>
            </Container>
        </BrowserRouter>
    );
}
