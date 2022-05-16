import React, { useState } from "react";
import { OrderOptions } from "../OrderOptions";
import { Col, Row } from "react-bootstrap";
import { formatCurrency } from "../utils/formatCurrenct";
import { useOrderOptions } from "../OrderOptions/useOrderOptions";
import Alert from "react-bootstrap/Alert";

interface Props {
  changePage(page: string): void;
}
export const OrderEntry = ({ changePage }: Props) => {
  const { totals } = useOrderOptions();
  const [isSundaeSelected, setIsSundaeSelected] = useState(true);

  const handleReviewOrder = () => {
    setIsSundaeSelected(true);
    if (totals.total > 0) {
      changePage("Review");
    } else {
      setIsSundaeSelected(false);
    }
  };

  return (
    <>
      <Row>
        <Col
          xs={12}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <span>Design Your Sundae!</span>
        </Col>
      </Row>
      <Row>
        <Col xs={12} style={{ display: "flex", flexDirection: "row" }}>
          <OrderOptions typeOfOrder="scoops" />
        </Col>
      </Row>
      <Row>
        <Col xs={12} style={{ display: "flex", flexDirection: "row" }}>
          <OrderOptions typeOfOrder="toppings" />
        </Col>
      </Row>
      <Row>
        <Col sm={4}>Grand Total: {formatCurrency(totals.total)}</Col>
      </Row>
      <Row>
        <Col sm={4}>
          <button type="button" onClick={handleReviewOrder}>
            Order Sundae
          </button>
        </Col>
      </Row>
      {!isSundaeSelected && (
        <Alert variant={"danger"}>No Sundae selected</Alert>
      )}
    </>
  );
};
