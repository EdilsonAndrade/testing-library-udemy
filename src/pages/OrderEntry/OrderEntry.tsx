import React from "react";
import { OrderOptions } from "../OrderOptions";
import { Col, Row } from "react-bootstrap";
import { formatCurrency } from "../utils/formatCurrenct";
import { useOrderSummary } from "../OrderOptions/useOrderOptions";
export const OrderEntry = () => {
  const { totals } = useOrderSummary();
  return (
    <>
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
    </>
  );
};
