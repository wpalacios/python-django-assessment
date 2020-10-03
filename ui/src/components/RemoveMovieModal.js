import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, Button, ModalFooter } from 'reactstrap';
import axios from 'axios';

class RemoveMovieModal extends Component {
    state = {
        modal: false
    };

    toggle = () => {
        this.setState(previous => ({
            modal: !previous.modal
        }));
    };

    deleteMovie = pk => {
        axios.delete('movies/delete/' + pk + '/', {
            headers: {
                Authorization: `Token ${this.props.getToken()}`
            }
        }).then(() => {
            this.props.resetState("remove");
            this.toggle();
        });
    };

    render() {
        return (
            <Fragment>
                <Button color="danger" onClick={() => this.toggle()}>
                    Delete
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Do you really want to delete <em>{this.props.title}</em>?
                    </ModalHeader>
                    <ModalFooter>
                        <Button type="button" onClick={() => this.toggle()}>
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            color="primary"
                            onClick={() => this.deleteMovie(this.props.pk)}
                        >
                            Yes
                        </Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        );
    }
}

export default RemoveMovieModal;