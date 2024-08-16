import React from "react";
import Header from "./Header";
import { Col, Container, Row, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { additem } from "../Redux/Action/Action";
import data from "../data.json"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 



export default function Store() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.CartReducer.carts);


  const Add = (item) => {
    const cartQuantity = getItemQuantity(item.id);
    if (cartQuantity < 10) {
      dispatch(additem(item));
      toast.success(`${item.name} is added to the cart`);
    } else {
      toast.error(`${item.name} is out of stock`);
    }
  };


  const getItemQuantity = (itemId) => {
    const item = cartItems.find(item => item.id === itemId);
    return item ? item.quantity : 0;
  };


  return (
    <>
      <Header />
      <Container>
        <Row className="mt-5 mb-2">
          <h1>Store</h1>
          {data.map((item) => (
            <Col lg={4} md={6} className="mt-5" key={item.id}>
              <Card>
                <img
                  src={item.image}
                  className="responsive-img"
                  style={{ width: "100%", height: "12rem", objectFit: "cover" }}
                  alt={item.name}
                />
                <div className="p-3 d-flex justify-content-between">
                  <h4>{item.name}</h4>
                  <h5 className="mt-1">{item.price} Rs<span>/{item.volume}</span></h5>
                </div>
    
                <Button
                  variant="primary"
                  className="mx-2 mb-3"
                  onClick={() => Add(item)}
                  disabled={getItemQuantity(item.id) >= 10} // Disable button if out of stock
                >
                  {getItemQuantity(item.id) < 10 ? "ADD TO CART" : "OUT OF STOCK"}
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
        <ToastContainer autoClose={2000} // Duration in milliseconds (3 seconds)
          pauseOnHover
          draggable
          theme="light" />
      </Container>
    </>
  );
}
