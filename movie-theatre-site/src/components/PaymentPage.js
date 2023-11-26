import React from "react";
import { useLocation } from "react-router-dom";
import { Button,CardHeader,Heading, CardBody, CardFooter,Card } from "@chakra-ui/react";

const PaymentPage = () => {
  const location = useLocation();
  const { totalCost, numberOfSeats, selectedSeats, movieTitle } =
    location.state;

  const handlePayment = () => {
    // Handle the payment process here
    console.log("Processing payment for", selectedSeats);
  };

  return (
    <div className="payment-page">
      <Card align="center">
        <CardHeader>
          <Heading size="md"> Payment for Basic Stuff need to talk with DB architect{movieTitle}</Heading>
        </CardHeader>
        <CardBody>
          <p>Number of Seats: {numberOfSeats}</p>
          <p>Selected Seats: {selectedSeats.join(", ")}</p>
          <p>Total Cost: ${totalCost.toFixed(2)}</p>
        </CardBody>
        <CardFooter>
          <Button colorScheme="blue" onClick={handlePayment}>
            Make Payment
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentPage;
