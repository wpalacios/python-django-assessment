import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import MovieList from './MovieList';
import NewMovieModal from './NewMovieModal';

import axios from 'axios';

class Main extends Component {
    state = {
        movies: [],
        message: ""
    };

    getToken = () => {
        return localStorage.getItem("accessToken");
    }

    componentDidMount() {
        this.resetState("list");
    }

    getMovies = (message) => {
        axios.get('movies/', {
            headers: {
                Authorization: `Token ${this.getToken()}`
            }
        })
        .then(res => this.setState({ movies: res.data, message: message }));
    };

    resetState = (origin) => {
        var message = "";
        switch(origin) {
            case "list":
                message = "";
                break;
            case "update":
                message = "The movie was updated successfully";
                break;
            case "create":
                message = "The movie was created successfully";
                break;
            case "remove":
                message = "The movie was removed successfully";
                break;
            case "vote":
                message = "Your vote was recorded successfully";
                break;
        }
        this.getMovies(message);
        setTimeout(() => this.setState({ message: "" }), 3000);
    };

    render() {
        return (
            <Container style= {{marginTop: "20px" }}>
                <Row>
                    <Col>
                        <MovieList
                            movies = {this.state.movies}
                            resetState = {this.resetState}
                            message = {this.state.message}
                            getToken = {this.getToken}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <NewMovieModal 
                            create={true} 
                            resetState={this.resetState} 
                            getToken={this.getToken}
                        />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Main;
