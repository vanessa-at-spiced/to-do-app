import { Link } from 'react-router-dom';
import { Form, Alert, Row, Col, Stack } from 'react-bootstrap';
import useAuthSubmit from '../hooks/useAuthSubmit.js';
import useForm from '../hooks/useForm.js';

import { Button } from "../components/Button/Button";

export default function Login() {
    const [values, handleChange] = useForm();
    const [submit, error] = useAuthSubmit('/login.json', values);

    return (
        <div className='section'>
            {error && <Alert key="warning-login" variant="warning">
                Something went wrong!
            </Alert>}
            <Row>

                <Col md={6}>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange} />
                        <Form.Text className="text-small">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} />
                    </Form.Group>
                    {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="I consent to your privacy policy" />
                    </Form.Group> */}
                    <Stack className='mt-5' direction="horizontal" gap={5}>
                        <Button
                            onClick={submit}
                            label="Log in"
                            size="medium"
                            action="login"
                        ></Button>
                        {/* <Button variant="primary" type="submit" onClick={submit}>
                            Log in
                        </Button> */}

                        {/* </Col> */}
                        {/* <Col md={6}> */}
                        <Link to="/">                        <Button

                            label="Click here to register"
                            size="medium"
                            action="login"
                        ></Button></Link>
                        {/* </Col>
                <Col md={6}> */}

                    </Stack>
                </Col>
            </Row>
        </div>
    );
}
