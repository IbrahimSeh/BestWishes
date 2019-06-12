import React from 'react';
import WishContext from './WishContext';
import { Modal, Button } from 'react-bootstrap';
export default class CreateNewEventAlert extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            show: true,
        };
    }
    handleClose() {
        this.setState({ show: false });
        this.props.history.push("/UserEvents/" + this.context.userID);
    }
    render() {
        return (
            <>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Event Id Is:</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>eventId: {this.context.eventId}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}
CreateNewEventAlert.contextType = WishContext;