import { useState } from "react";
import { FormEvent } from "react";
import { ChangeEvent } from "react";
import { Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
interface Props {
  name: string;
  imagePath: string;
  updateItem(item: string, value: string): void;
}

export const SundaeOptions = ({ name, imagePath, updateItem }: Props) => {
  const [value, setValue] = useState(0);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(+e.target.value);
    updateItem(name, e.target.value);
  };
  return (
    <>
      <Row>
        <Col sm={3}>
          <img alt={`${name} scoops`} src={imagePath} />
        </Col>
      </Row>
      <Row>
        <Col sm={3}>{name}</Col>
      </Row>
      <Row>
        <Col sm={6}>
          <Form.Group controlId={`${name}-count`} as={Row}>
            <Form.Label>{name}</Form.Label>
            <Form.Control
              type="number"
              onChange={handleChange}
              role="spinbutton"
              defaultValue={0}
              isInvalid={value < 0}
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};
