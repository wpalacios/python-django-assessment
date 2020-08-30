import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import logo from '../img/scalar-logo.png';

const links = [
  { href: '#', text: 'Home'},
  { href: '/movies', text: 'Movies'},
  { href: '/admin', text: 'Admin'}
];

const createNavItem = ({ href, text }) => (
  <NavItem>
    <NavLink href={href}>{text}</NavLink>
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
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </div>
    );
  }
}

export default Header;