import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import NewMovie from './NewMovie';

class NewMovieModal extends Component {
    state = {
        modal: false
    };

    toggle = () => {
        this.setState(previous => ({
            modal: !previous.modal
        }));
    };

    render() {
        const create = this.props.create;
        var caption = "Updating movie";
        var button = <Button className="warning" onClick={this.toggle}>Update</Button>;
        if (create) {
            caption = "Creating new movie";
            button = (
                <Button
                  color="success"
                  className="float-right"
                  onClick={this.toggle}
                  style={{ minWidth: "150px" }}
                >
                  Create New
                </Button>
              );
            }
            return (
                <Fragment>
                    {button}
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>{caption}</ModalHeader>
                        <ModalBody>
                            <NewMovie
                                resetState={this.props.resetState}
                                toggle={this.toggle}
                                movie={this.props.movie}
                                getToken={this.props.getToken}
                            />
                        </ModalBody>
                    </Modal>
                </Fragment>
            );
        }
}

export default NewMovieModal;