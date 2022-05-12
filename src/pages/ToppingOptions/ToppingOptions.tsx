import React from "react";
import { ChangeEvent } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { formatCurrency } from "../utils/formatCurrenct";
interface ToppingProps {
  name: string;
  imagePath: string;
  updateItem(item: string, value: string): void;
}

export const ToppinOptions = ({
  name,
  imagePath,
  updateItem,
}: ToppingProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateItem(name, e.target.value);
  };
  return (
    <>
      <Row>
        <Col>
          <img
            src={`http://localhost/3030/${imagePath}`}
            alt={`${name} toppings`}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={4}>{name}</Col>

        <Col sm={4}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
            role="spinbutton"
          />
        </Col>
      </Row>
    </>
  );
};
