import React from 'react';
import { Spinner, Container, ListGroup, Col, Row } from 'react-bootstrap'

class WebsiteList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      websites: this.props.websites,
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.websites !== state.websites && props) {
      return {
        websites: props.websites.sort((a, b) => a.websiteName.localeCompare(b.websiteName))
      }
    }
    return null
  }

  render() {
    const { websites } = this.state;
    return (

      <ListGroup className="my-3 ">
        {websites.map(websiteModel =>
          <ListGroup.Item
            action variant="primary"
            key={websiteModel.websiteName}
            className="p-1 small"
          >
            <Row noGutters={true}>
              <Col xs={{ span: 4, offset: 4 }} >
                {websiteModel.websiteName}
              </Col>
              <Col className="d-flex align-items-center justify-content-end">
                {websiteModel.status == 'creating'? (<Spinner animation="border" variant="primary" size="sm"
                ></Spinner>) : null}
              </Col>
            </Row>
          </ListGroup.Item>
        )}
      </ListGroup>

    )
  }

}
export default WebsiteList;