import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../img/scalar-logo.png';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';

const links = [
  { uri: '/', text: 'Home'},
  { uri: '/movies', text: 'Movies'}
];

const createNavItem = ({ uri, text }) => (
  <NavItem>
    <NavLink to={uri} style={{ marginRight: 10 }}>{text}</NavLink>
  </NavItem>
)

class Header extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      navCollapsed: true,
      showNavBar: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar className="navbar-fixed-top" role="navigation" light expand="md">
          <div className="container">
            <NavbarBrand href="#"><img src={logo} width="200" alt="Scalar"/></NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {links.map(createNavItem)}
                <a href="/admin">Admin</a>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </div>
    );
  }
}

export default Header;