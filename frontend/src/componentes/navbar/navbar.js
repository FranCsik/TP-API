import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBarComponente(){

    const cerrarSesion = () => {
        localStorage.removeItem('usuario');
    }

    return(
        <Navbar expand="lg" variant="dark" bg="dark">
                <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
                <Nav>
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/reclamo-unidad">Reclamar Unidad</Nav.Link>
                    <Nav.Link href="/reclamo-comun">Reclamar Sector Comun</Nav.Link>
                    <Nav.Link href="/mis-edificios">Mis Edificios</Nav.Link>
                    <Nav.Link href="/mis-reclamos">Mis Reclamos</Nav.Link>
                    <Nav.Link href="/mi-perfil">Mi Perfil</Nav.Link>
                    <button onClick={() => {cerrarSesion()}}>
                        <Nav.Link href="/">Cerrar Sesion</Nav.Link>
                    </button>
                </Nav>
        </Navbar>
    );
}

export default NavBarComponente;