import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, removeitem } from "../Redux/Action/Action";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import Confetti from "react-confetti";
import { clearCart } from "../Redux/Action/Action";

const CartPage = () => {
  const getdata = useSelector((state) => state.CartReducer.carts);
  const dispatch = useDispatch();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(getdata));
  }, [getdata]);

  useEffect(() => {
    if (getdata.length === 0) {
      Swal.fire("Oops!", "Your cart is empty :(", "info");
    }
  }, [getdata.length]);

  const handleincrement = (itemid) => {
    dispatch(increment(itemid));
  };

  const handledecrement = (itemid) => {
    dispatch(decrement(itemid));
  };

  const handleremove = (itemid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeitem(itemid));
        Swal.fire(
          "Deleted!",
          "The item has been removed from your cart.",
          "success"
        );
      } else if (result.isDismissed) {
        Swal.fire(
          "Cancelled",
          "The item is safe in your cart.",
          "info"
        );
      }
    });
  };
  

  const totalPrice = getdata.reduce((acc, item) => {
    const itemPrice = Number(item.price) * item.quantity;
    return acc + itemPrice;
  }, 0);

  const handlecheckout = () => {
    setShowConfetti(true);
    Swal.fire({
      title: "Thank You!",
      text: "Your Order has been placed",
      icon: "success",
      confirmButtonText: "OK",
      willClose: () => {
        dispatch(clearCart());
        setShowConfetti(false);
      }
    });
  };

  return (
    <Container>
      {showConfetti && (
        <Confetti
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999 }}
        />
      )}
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
                <ListGroup.Item key={item.id} className="d-flex flex-column flex-lg-row align-items-center mb-3 p-3 border-0 shadow-sm rounded bg-light">
                  <Col xs={12} sm={4} md={3} lg={2} className="text-center mb-3 mb-lg-0">
                    <img
                      src={item.image}
                      alt="Item"
                      className="img-fluid rounded"
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                  </Col>
                  <Col xs={12} sm={5} md={6} lg={6} className="text-center text-lg-start mb-3 mb-lg-0">
                    <h5 className="text-dark">{item.name}</h5>
                    <p className="text-muted">Rs.{Number(item.price) * item.quantity}</p>
                  </Col>
                  <Col xs={12} sm={6} md={3} lg={2} className="d-flex justify-content-center justify-content-lg-end align-items-center mb-3 mb-lg-0">
                    <div className="d-flex align-items-center">
                      <Button
                        variant="secondary"
                        className="mr-2"
                        style={{ backgroundColor: "#6c757d", borderColor: "#6c757d" }}
                        onClick={() => handledecrement(item.id)}
                      >
                        -
                      </Button>
                      <span className="mx-3">{item.quantity}kg</span>
                      <Button
                        variant="secondary"
                        className="ml-2"
                        style={{ backgroundColor: "#6c757d", borderColor: "#6c757d" }}
                        disabled={item.quantity >= 10}
                        onClick={() => handleincrement(item.id)}
                      >
                        +
                      </Button>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={2} className="d-flex justify-content-center justify-content-lg-end align-items-center">
                    <Button
                      className="border-0"
                      style={{ backgroundColor: "#E5E4E2" }}
                      onClick={() => handleremove(item.id)}
                    >
                      <DeleteIcon style={{ color: "red" }} />
                    </Button>
                  </Col>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            ""
          )}
        </Col>
      </Row>
      <Row className="my-4">
        <Col xs={12} md={8} className="d-flex align-items-center">
          <h4 className="text-dark mb-0">
            TOTAL: <span className="text-danger">{totalPrice}</span> Rs.
          </h4>
        </Col>
        <Col xs={12} md={4} className="d-flex justify-content-center justify-content-md-end">
          <div className="d-flex justify-content-center justify-content-md-end mt-lg-0 mt-4 mt-md-0">
            <Button
              variant="primary"
              style={{ backgroundColor: "#007bff", borderColor: "#007bff" }}
              disabled={getdata.length === 0}
              onClick={handlecheckout}
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
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
