import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';

class NewMovie extends Component {
    state = {
        pk: 0,
        title: '',
        year: '',
        rated: '',
        released_on: '',
        genre: '',
        director: '',
        plot: ''
    };

    componentDidMount() {
        if (this.props.movie) {
            const { pk, title, year, rated, released_on, genre, director, plot } = this.props.movie;
            this.setState({ pk, title, year, rated, released_on, genre, director, plot });
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    createMovie = e => {
        e.preventDefault();
        axios.post('movies/create/', this.state, {
            headers: {
                Authorization: `Token ${this.props.getToken()}`
            }
        }).then(() => {
            this.props.resetState("create");
            this.props.toggle();
        });
    };

    editMovie = e => {
        e.preventDefault();
        axios.put('movies/update/' + this.state.pk + '/', this.state, {
            headers: {
                Authorization: `Token ${this.props.getToken()}`
            }
        }).then(() => {
            this.props.resetState("update");
            this.props.toggle();
        });
    };

    defaultIfEmpty = value => {
        return value === "" ? "" : value;
    };

    render() {
        return (
            <Form onSubmit={this.props.movie ? this.editMovie : this.createMovie}>
                <FormGroup>
                    <Label for="title">Title:</Label>
                    <Input
                        type="text"
                        name="title"
                        onChange={this.onChange}
                        value={this.defaultIfEmpty(this.state.title)}
                    />                    
                </FormGroup>
                <FormGroup>
                    <Label for="year">Year:</Label>
                    <Input
                        type="number"
                        name="year"
                        onChange={this.onChange}
                        value={this.defaultIfEmpty(this.state.year)}
                    />                    
                </FormGroup>
                <FormGroup>
                    <Label for="rated">Rated:</Label>
                    <Input
                        type="text"
                        name="rated"
                        onChange={this.onChange}
                        value={this.defaultIfEmpty(this.state.rated)}
                    />                    
                </FormGroup>
                <FormGroup>
                    <Label for="released_on">Released on:</Label>
                    <Input
                        type="date"
                        name="released_on"
                        onChange={this.onChange}
                        value={this.defaultIfEmpty(this.state.released_on)}
                    />                    
                </FormGroup>
                <FormGroup>
                    <Label for="genre">Genre:</Label>
                    <Input
                        type="text"
                        name="genre"
                        onChange={this.onChange}
                        value={this.defaultIfEmpty(this.state.genre)}
                    />                    
                </FormGroup>
                <FormGroup>
                    <Label for="director">Director:</Label>
                    <Input
                        type="text"
                        name="director"
                        onChange={this.onChange}
                        value={this.defaultIfEmpty(this.state.director)}
                    />                    
                </FormGroup>
                <FormGroup>
                    <Label for="plot">Plot:</Label>
                    <Input
                        type="textarea"
                        name="plot"
                        onChange={this.onChange}
                        value={this.defaultIfEmpty(this.state.plot)}
                    />                    
                </FormGroup>
                <Button>Save</Button>
            </Form>
        );
    }
}

export default NewMovie;