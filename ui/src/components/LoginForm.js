import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
    Container,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    FormFeedback
} from 'reactstrap';
import axios from 'axios';
import '../App.css';

class LoginForm extends Component {
    state = {
        username: "",
        password: "",
        isAuthenticated: false,
        invalid: false
    };

    onSubmit = e => {
        e.preventDefault();
        axios.post('movies/auth/', this.state)
        .then(res => {
            if (res.status == 200) {
                this.setState({ isAuthenticated: true });
                localStorage.setItem("accessToken", res.data.token);
            }
        })
        .catch(() => {
            this.setState({ invalid: true })
        });
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        if (this.state.isAuthenticated) {
            return (<Redirect to="/movies" />);
        }
        return (
            <Container className="Container">
                <h2 style={{textAlign: "center", marginBottom: "25px"}}>Welcome to the Movies App</h2>
                <Form onSubmit={this.onSubmit}>
                    <Col>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Enter your username"
                                onChange={this.onChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input 
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter your password"
                                onChange={this.onChange}
                                invalid={this.state.invalid}
                            />
                            <FormFeedback>Invalid credentials</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Button className="float-right" color="primary">Login</Button>
                        </FormGroup>
                    </Col>
                </Form>
            </Container>
        )
    }
}

export default LoginForm;