import React, { useState } from "react";
import { ChangeEvent } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FormCheck from "react-bootstrap/FormCheck";
import { formatCurrency } from "../utils/formatCurrenct";
import { useEffect } from "react";
import { useCallback } from "react";
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
  const [isChecked, setIscheked] = useState(false);

  const handleChange = useCallback(
    (checked: boolean) => {
      setIscheked(checked);
      updateItem(name, checked ? "1" : "0");
    },
    [name, updateItem]
  );

  return (
    <>
      <Row>
        <Col>
          <img src={imagePath} alt={`${name} toppings`} />
        </Col>
      </Row>
      <Row>
        <Col sm={4}>{name}</Col>

        <Col sm={4}>
          <input
            type={"checkbox"}
            id={`${name}-check`}
            onChange={(e) => handleChange(e.target.checked)}
          />
          <label htmlFor={`${name}-check`}>{name}</label>
          {/* <Form.Group controlId={`${name}-count`} as={Row}>
            <Form.Label>{name}</Form.Label>
            <Form.Check
              type="checkbox"
              role={"checkbox"}
              checked={isChecked}
              onChange={(e) => handleChange(e.target.checked)}
            />
          </Form.Group> */}
        </Col>
      </Row>
    </>
  );
};
