import React from 'react';
import { ListGroup } from 'react-bootstrap'

class WebsiteList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      websites: this.props.websites
    }
  }

  static getDerivedStateFromProps(props,state) {
    if (props.websites !== state.websites && props){
      return {
        websites: props.websites.sort( (a,b) => a.websiteName.localeCompare(b.websiteName))
        }
    }
    return null
  }

  render() {
    const {websites} = this.state;
    return (
      <div >
        <ListGroup className="my-4">
          {websites.map( websiteModel => (
              <ListGroup.Item 
                action variant="primary" 
                key={websiteModel.websiteName}
                className="p-2 small"
                >{websiteModel.websiteName}
              </ListGroup.Item>
            ))}
        </ListGroup>  
      </div>
    )
  }

}
export default WebsiteList;