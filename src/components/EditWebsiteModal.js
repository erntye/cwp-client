import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'


class EditWebsiteModal extends Component{

  constructor(props) {
    super(props);
    this.websiteName = React.createRef();
    this.websiteSize = React.createRef();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // console.log(this.websiteName.current.value)
    // console.log(this.websiteSize.current.value)
    this.props.handleSubmit(this.websiteName.current.value, this.websiteSize.current.value)
  }
  
  render() {
    return (
      <>
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Website</Modal.Title>
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
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Website Size</Form.Label>
                <Form.Control 
                as="select"
                ref={this.websiteSize}
                >
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                  <option>XL</option>
                </Form.Control>
              </Form.Group>
            </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.props.handleClose}>
              Close
              </Button>
            <Button variant="primary" type="submit" onClick={this.props.handleClose}>
              Save Changes
              </Button>
          </Modal.Footer>
          </Form>
        </Modal>
      </>
    );
  }
}

export default EditWebsiteModal;