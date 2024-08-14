import { Button, Container } from 'react-bootstrap'
import React from 'react'
import Header from './Header'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
    <Header/>
    <Container className='mt-5'>
      <h1>Welcome to My Store!</h1>
     <p>Discover a wide range of quality products at amazing prices. Start shopping now and find the perfect items for you!</p>
     <Link to="/store"><Button>Explore the store</Button></Link> 
      </Container>
    </div>
  )
}
