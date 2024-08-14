import React from 'react';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import Header from './Header';

export default function About(){
  return (
    <>
    <Header/>
    
    <Container className="my-5">
        
      <Row>
        <Col>
          <h1 className="text-center mb-4">About Us</h1>
          <Card className="p-4 shadow-sm">
            <Row>
              
              <Col md={12}>
                <h2>Who We Are</h2>
                <p>
                  Welcome to our e-commerce platform, where we strive to offer the best products at unbeatable prices. Our team is passionate about providing a seamless shopping experience, ensuring that you find everything you need in one place.
                </p>
                <h2>Our Mission</h2>
                <p>
                  Our mission is to make online shopping simple and enjoyable for everyone. We believe in offering quality products, exceptional customer service, and a hassle-free shopping experience.
                </p>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
};


