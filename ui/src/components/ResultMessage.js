import React, { Component } from 'react';
import { Modal, ModalBody } from 'reactstrap';

class ResultMessage extends Component {

    render() {
        return (
            <Modal>
                <ModalBody>
                    <p>{this.props.status}</p>
                </ModalBody>
            </Modal>
        );
    }
}
