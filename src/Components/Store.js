import React from "react";
import Header from "./Header";
import { Col, Container, Row, Card, Button } from "react-bootstrap";
import image from "../Images/banana.jpg";
import data from "../data.json";
import { useDispatch } from "react-redux";
import { additem } from "../Redux/Action/Action";

export default function Store() {
  const dispatch=useDispatch();

  const Add=(item)=>
  {
     dispatch(additem(item))
  }
  return (
    <>
      <Header />
      <Container>
        <Row className="mt-5 mb-2">
          <h1>Store</h1>
          {data.map((item) => (
            <Col lg={4} className="mt-5" key={item.id}>
              <Card style={{ width: "22rem" }} >
                <img
                  src={item.image}
                  style={{ width: "100%", height: "12rem", objectFit: "cover" }}
                ></img>
                <div className="p-3 d-flex justify-content-between">
                  <h4>{item.name}</h4>
                  <h4>{item.price} Rs.</h4>
                </div>
                <Button variant="primary" className="mx-2 mb-3" onClick={()=>{Add(item)}}>
                  Add to Cart
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
