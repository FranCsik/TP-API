import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBarAdmin(){

    const cerrarSesion = () => {
        localStorage.removeItem('usuario');
    }

    return(
        <Navbar expand="lg" variant="dark" bg="dark">
                <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
                <Nav>
                    <Nav.Link href="/home-admin">Home</Nav.Link>
                    <Nav.Link href="/reclamos">Reclamos</Nav.Link>
                    <Nav.Link href="/edificios">Edificios</Nav.Link>
                    <Nav.Link href="/usuarios">Usuarios</Nav.Link>
                    <Nav.Link href='/perfil'>Mi Perfil</Nav.Link>
                    <button onClick={() => {cerrarSesion()}}>
                        <Nav.Link href="/login-admin">Cerrar Sesion</Nav.Link>
                    </button>
                </Nav>
        </Navbar>
    );
}

export default NavBarAdmin;