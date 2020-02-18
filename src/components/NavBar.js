import React from 'react';
import { Navbar} from 'react-bootstrap'
class NavBar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div >
        <Navbar bg="secondary" variant="dark">
          <Navbar.Brand>CWP Portal</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        </Navbar>
      </div>
    )
  }

}
export default NavBar;


