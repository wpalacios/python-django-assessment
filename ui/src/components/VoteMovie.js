import React, { Component, Fragment } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class VoteMovie extends Component {

    state = {
        selectedStar: 0
    }

    onChange = e => {
        this.setState({ selectedStar: e.target.value });
    };

    voteMovie = e => {
        e.preventDefault();
        axios.post('movies/' + this.props.pk + '/vote/', {rating: this.state.selectedStar}, {
            headers: {
                Authorization: `Token ${this.props.getToken()}`
            }
        }).then((data) => {
            this.props.resetState("vote");
            this.props.toggle();
        });
    };

    render() {
        return (
            <Fragment>
                <p>Vote for this movie:</p>
                <Form onSubmit={this.voteMovie}>
                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="radio" 
                                name="stars" 
                                value="1" 
                                onChange={this.onChange}
                                checked={this.state.selectedStar === "1"}
                            />1</Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="radio" 
                                name="stars" 
                                value="2" 
                                onChange={this.onChange}
                                checked={this.state.selectedStar === "2"}
                            />2</Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="radio" 
                                name="stars" 
                                value="3" 
                                onChange={this.onChange}
                                checked={this.state.selectedStar === "3"}
                            />3</Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="radio" 
                                name="stars" 
                                value="4" 
                                onChange={this.onChange}
                                checked={this.state.selectedStar === "4"}
                            />4</Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="radio" 
                                name="stars" 
                                value="5" 
                                onChange={this.onChange}
                                checked={this.state.selectedStar === "5"}
                            />5</Label>
                    </FormGroup>
                    <Button>Save</Button>
                </Form>               
            </Fragment>

        );
    }
}

export default VoteMovie;