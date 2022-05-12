import { FormEvent } from "react";
import { ChangeEvent } from "react";
import { Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { formatCurrency } from "../utils/formatCurrenct";
interface Props {
  name: string;
  imagePath: string;
  updateItem(item: string, value: string): void;
}

export const SundaeOptions = ({ name, imagePath, updateItem }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateItem(name, e.target.value);
  };
  return (
    <>
      <Row>
        <Col>
          <img alt={`${name} scoops`} src={imagePath} />
        </Col>
      </Row>
      <Row>
        <Col sm={4}>{name}</Col>

        <Col sm={4}>
          <Form.Group controlId={`${name}-count`} as={Row}>
            <Form.Label>{name}</Form.Label>
            <Form.Control
              type="number"
              defaultValue={0}
              onChange={handleChange}
              role="spinbutton"
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};
