
import React, { Component } from 'react';

import { Container, NavContainer } from './navbar-style'

class NavBar extends Component {
    constructor(props) {
        super(props);
      
      }

    render(){
        return(
    <Container>
        <NavContainer>
            <h2>cultured.</h2>
        </NavContainer>
    </Container>
        )
    }
}
export default NavBar