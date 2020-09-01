import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import MovieList from './MovieList';
import NewMovieModal from './NewMovieModal';

import axios from 'axios';

class Main extends Component {
    state = {
        movies: []
    };

    componentDidMount() {
        this.resetState();
    }

    getMovies = () => {
        axios.get('movies/api/all/')
        .then(res => this.setState({ movies: res.data }));
    };

    resetState = () => {
        this.getMovies();
    };

    render() {
        return (
            <Container style= {{marginTop: "20px" }}>
                <Row>
                    <Col>
                        <MovieList
                            movies = {this.state.movies}
                            resetState = {this.resetState}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <NewMovieModal create={true} resetState={this.resetState} />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Main;
