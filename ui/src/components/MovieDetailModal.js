import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import VoteMovie from './VoteMovie';
import axios from 'axios';

class MovieDetailModal extends Component {
    state = {
        modal: false
    };

    getMovie = () => {
        axios.get('movies/' + this.props.pk + '/')
        .then(res => this.setState(res.data));
    };

    resetState = () => {
        this.getMovie();
    };

    toggle = () => {
        this.setState(previous => ({
            modal: !previous.modal
        }));
        this.resetState();
    };

    render() {
        return (
            <Fragment>
                <Button color="info" onClick={() => this.toggle()}>
                    Info
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        {this.state.title}
                    </ModalHeader>
                    <ModalBody>
                        <ul>
                            <li><strong>Year:</strong> {this.state.year}</li>
                            <li><strong>Rated:</strong> {this.state.rated}</li>
                            <li><strong>Released on:</strong> {this.state.released_on}</li>
                            <li><strong>Genre:</strong> {this.state.genre}</li>
                            <li><strong>Director:</strong> {this.state.director}</li>
                            <li><strong>Plot:</strong> {this.state.plot}</li>
                        </ul>
                        <VoteMovie
                            resetState={this.props.resetState}
                            pk={this.state.pk}
                            toggle={this.toggle}
                        />
                    </ModalBody>
                </Modal>
            </Fragment>
        );
    }
}

export default MovieDetailModal;