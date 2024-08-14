import React, { useEffect } from "react";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, removeitem } from "../Redux/Action/Action";
import { Link } from "react-router-dom";
import { Details } from "@mui/icons-material";

const CartPage = () => {
  const getdata = useSelector((state) => state.CartReducer.carts);
  
  console.log(getdata.length);

  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(getdata));
  }, [getdata]);

  



  

  const handleincrement = (itemid) => {
    dispatch(increment(itemid));
  };
  const handledecrement = (itemid) => {
    dispatch(decrement(itemid));
  };

  const handleremove = (itemid) => {
    dispatch(removeitem(itemid));
  };

  const totalPrice = getdata.reduce((acc, item) => {
    const itemPrice = Number(item.price) * item.quantity;
    return acc + itemPrice;
  }, 0);


  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h1 className="text-primary text-center">Shopping Cart</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          {getdata.length > 0 ? (
            <ListGroup>
              {getdata.map((item) => (
                <ListGroup.Item className="d-flex flex-column flex-lg-row align-items-center mb-3 p-3 border-0 shadow-sm rounded bg-light">
                  <Col
                    xs={12}
                    sm={4}
                    md={3}
                    lg={2}
                    className="text-center mb-3 mb-lg-0"
                  >
                    <img
                      src={item.image}
                      alt="Item"
                      className="img-fluid rounded"
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                  </Col>
                  <Col
                    xs={12}
                    sm={5}
                    md={6}
                    lg={6}
                    className="text-center text-lg-start mb-3 mb-lg-0"
                  >
                    <h5 className="text-dark">{item.name}</h5>
                    <p className="text-muted">Rs.{Number(item.price )* item.quantity}</p>

                  </Col>
                  <Col
                    xs={12}
                    sm={6}
                    md={3}
                    lg={2}
                    className="d-flex justify-content-center justify-content-lg-end align-items-center mb-3 mb-lg-0"
                  >
                    <div className="d-flex align-items-center">
                      <Button
                        variant="secondary"
                        className="mr-2"
                        style={{
                          backgroundColor: "#6c757d",
                          borderColor: "#6c757d",
                        }}
                        onClick={() => handledecrement(item.id)}
                      >
                        -
                      </Button>
                      
                        <span className="mx-3">{item.quantity}kg</span>
                      
                      <Button
                        variant="secondary"
                        className="ml-2"
                        style={{
                          backgroundColor: "#6c757d",
                          borderColor: "#6c757d",
                        }}
                        disabled={item.quantity >= 10}
                        onClick={() => handleincrement(item.id)}
                      >
                        +
                      </Button>
                    </div>
                  </Col>
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={2}
                    className="d-flex justify-content-center justify-content-lg-end align-items-center"
                  >
                    <Button
                      variant="danger"
                      style={{
                        backgroundColor: "#dc3545",
                        borderColor: "#dc3545",
                      }}
                      onClick={() => {
                        handleremove(item.id);
                      }}
                    >
                      Remove
                    </Button>
                  </Col>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <h1 className="text-center">Your Cart Is Empty :( </h1>
          )}
        </Col>
      </Row>
      <Row className="my-4">

        <Col xs={12} md={8} className="d-flex align-items-center">
          <h4 className="text-dark mb-0">TOTAL : <span className="text-danger">{totalPrice}</span> Rs.</h4>
        </Col>
        <Col
          xs={12}
          md={4}
          className="d-flex justify-content-center justify-content-md-end"
        >
          <Button
            variant="primary"
            style={{ backgroundColor: "#007bff", borderColor: "#007bff" }}
            disabled={getdata.length===0}
          >
            Checkout
          </Button>

          <Button
            as={Link}
            to="/store"
            variant="primary"
            className="ms-2"
            style={{ backgroundColor: "#007bff", borderColor: "#007bff" }}
          >
            Go to store
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
