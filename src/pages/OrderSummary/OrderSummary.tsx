import React, { useState, useEffect } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Checkbox from "react-bootstrap/FormCheck";
import { SundaeOptions } from "../SundaeOptions";
import { ToppinOptions } from "../ToppingOptions";
import { AlertMessage } from "../common/AlertMessage";
import { TypeOfOrder } from "../common/types";
import { useOrderSummary } from "./useOrderSummary";
import { Col, Row } from "react-bootstrap";
import { formatCurrency } from "../utils/formatCurrenct";
import { OuterExpressionKinds } from "typescript";
interface SundaeOption {
  name: string;
  imagePath: string;
}
interface Props {
  typeOfOrder: TypeOfOrder;
}

export const OrderSummary = ({ typeOfOrder }: Props) => {
  const [sundaesOption, setSundaesOption] = useState<SundaeOption[]>([]);
  const [hasError, setHasError] = useState(false);

  const { options, updateOptionsItem, totals } = useOrderSummary();

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${typeOfOrder}`)
      .then((response) => {
        setSundaesOption(response.data);
      })
      .catch((error) => {
        setHasError(true);
      });
  }, [typeOfOrder]);

  if (hasError) {
    return <AlertMessage />;
  }

  const optionsOfSundae = sundaesOption.map((sundayOption) => {
    if (typeOfOrder === "scoops") {
      return (
        <SundaeOptions
          key={sundayOption.name}
          name={sundayOption.name}
          imagePath={sundayOption.imagePath}
          updateItem={(name, value) =>
            updateOptionsItem(name, value, typeOfOrder)
          }
        />
      );
    }
    return (
      <ToppinOptions
        key={sundayOption.name}
        name={sundayOption.name}
        imagePath={sundayOption.imagePath}
        updateItem={(name, value) =>
          updateOptionsItem(name, value, typeOfOrder)
        }
      />
    );
  });

  return (
    <>
      {optionsOfSundae}

      <Row>
        <Col sm={4}>Scoops total {formatCurrency(totals.subTotalScoops)}</Col>
      </Row>
      <Row>
        <Col sm={4}>
          Toppings total {formatCurrency(totals.subTotalToppings)}
        </Col>
      </Row>
      <Row>
        <Col sm={4}>Grand Total: {formatCurrency(totals.total)}</Col>
      </Row>
    </>
  );
};
