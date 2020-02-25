import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'


class DeleteWebsiteModal extends Component{

  constructor(props) {
    super(props);
    this.websiteName = React.createRef();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // console.log(this.websiteName.current.value)
    // console.log(this.websiteSize.current.value)
    this.props.handleSubmit(this.websiteName.current.value)
  }
  
  render() {
    return (
      <>
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Website</Modal.Title>
          </Modal.Header>
          <Form onSubmit={e => this.handleSubmit(e)}>
            <Modal.Body>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Website Name</Form.Label>
                <Form.Control 
                name="websiteName"
                ref={this.websiteName}
                placeholder="Enter Website Name" />
              </Form.Group>
            </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.props.handleClose}>
              Cancel
              </Button>
            <Button variant="primary" type="submit" onClick={this.props.handleClose}>
              Confirm Delete
            </Button>
          </Modal.Footer>
          </Form>
        </Modal>
      </>
    );
  }
}

export default DeleteWebsiteModal;