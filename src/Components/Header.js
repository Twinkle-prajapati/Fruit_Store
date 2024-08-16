import React from 'react';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Header() {
  

  

  const getdata = useSelector((state) => state.CartReducer.carts);
    return (
    <Navbar expand="lg" className="bg-body-white p-3" style={{boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto fs-5">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/store">Store</Nav.Link>
            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
          </Nav>
         
        
        </Navbar.Collapse>
        <Link to="/cart" className="text-dark d-flex align-items-end ">
          <Badge badgeContent={getdata.length} color='primary'>
            <ShoppingCartIcon/>
          </Badge>
          </Link>
      </Container>
    </Navbar>
  );
}

