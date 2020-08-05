import React, { Component } from 'react';
import { 
    Nav,
    Navbar,
    Container,
    Button,
}from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import LanguageSelect from '../LanguageSelect';

let pkg = require('../../../package.json');

class Navigation extends Component {
    render() {
        return (
            <Navbar>
                <Container>
                    <Navbar.Brand to="/" as={Link}>foresight</Navbar.Brand>
                    <Nav.Link 
                        className="px-1 align-bottom mr-2"
                        style={{ fontSize: "0.85rem" }}
                        eventKey="disabled" 
                        disabled>
                            {
                                pkg ? "v" + pkg.version : "v0.0.0"
                            }
                    </Nav.Link>
                    <Nav.Link
                        className="px-1 align-bottom mr-2"
                        style={{ fontSize: "0.85rem" }}
                        eventKey="disabled"
                        disabled>
                        {
                            pkg ? pkg.dotaVersion : "Unknown"
                        }
                    </Nav.Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link to="/" as={Link}>home</Nav.Link>
                            <Nav.Link to="/app" as={Link}>calculator</Nav.Link>
                        </Nav>
                        <div className="mr-2">
                            <LanguageSelect/>
                        </div>
                        <a href="https://github.com/JoshLmao/foresight">
                            <Button variant="outline-secondary">
                                <FontAwesomeIcon icon={faGithub} />
                            </Button>
                        </a>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default Navigation;