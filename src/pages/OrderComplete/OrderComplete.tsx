import { Col, Row } from "react-bootstrap";
import { useOrderOptions } from "../OrderOptions/useOrderOptions";
interface Props {
  changePage(page: string): void;
}

export const OrderComplete = ({ changePage }: Props) => {
  const { resetOrder } = useOrderOptions();
  const handleChangePage = () => {
    resetOrder();
    changePage("");
  };
  return (
    <>
      <Row>
        <Col xs={12}>Thank You</Col>
      </Row>
      <Row>
        <button type="button" onClick={handleChangePage}>
          Create new order
        </button>
      </Row>
    </>
  );
};
