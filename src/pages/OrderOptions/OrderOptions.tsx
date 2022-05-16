import React, { useState, useEffect } from "react";
import axios from "axios";
import { SundaeOptions } from "../SundaeOptions";
import { ToppinOptions } from "../ToppingOptions";
import { AlertMessage } from "../common/AlertMessage";
import { TypeOfOrder } from "../common/types";
import { useOrderSummary } from "./useOrderOptions";
import { Col, Row } from "react-bootstrap";
import { formatCurrency } from "../utils/formatCurrenct";
interface SundaeOption {
  name: string;
  imagePath: string;
}
interface Props {
  typeOfOrder: TypeOfOrder;
}

export const OrderOptions = ({ typeOfOrder }: Props) => {
  const [sundaesOption, setSundaesOption] = useState<SundaeOption[]>([]);
  const [hasError, setHasError] = useState(false);

  const { updateOptionsItem, totals } = useOrderSummary();

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

  const scoopTotalText = typeOfOrder[0].toUpperCase() + typeOfOrder.slice(1);
  const subTotal =
    typeOfOrder == "scoops" ? totals.subTotalScoops : totals.subTotalToppings;
  const optionsOfSundae = sundaesOption.map((sundayOption) => {
    if (typeOfOrder === "scoops") {
      return (
        <SundaeOptions
          key={sundayOption.name}
          name={sundayOption.name}
          imagePath={`http://localhost:3030/${sundayOption.imagePath}`}
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
        imagePath={`http://localhost:3030/${sundayOption.imagePath}`}
        updateItem={(name, value) =>
          updateOptionsItem(name, value, typeOfOrder)
        }
      />
    );
  });

  return (
    <>
      <Row>
        <Col sm={12}>
          {scoopTotalText} total {formatCurrency(subTotal)}
        </Col>
      </Row>
      {optionsOfSundae}
    </>
  );
};