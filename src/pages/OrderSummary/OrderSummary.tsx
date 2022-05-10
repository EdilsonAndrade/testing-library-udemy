import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Checkbox from "react-bootstrap/FormCheck";
import { SundaeOptions } from "../SundaeOptions";
import { ToppinOptions } from "../ToppingOptions";
import { AlertMessage } from "../common/AlertMessage";

interface Scoops {
  name: string;
  imagePath: string;
}
interface Props {
  typeOfOrder: "toppings" | "scoops";
}

export const OrderSummary = ({ typeOfOrder }: Props) => {
  const [scoppings, setScoppings] = useState<Scoops[]>([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${typeOfOrder}`)
      .then((response) => {
        setScoppings(response.data);
      })
      .catch((error) => {
        setHasError(true);
      });
  }, [typeOfOrder]);

  if (hasError) {
    return <AlertMessage />;
  }

  const scoops = scoppings.map((scoop) => {
    if (typeOfOrder === "scoops") {
      return (
        <SundaeOptions
          key={scoop.name}
          name={scoop.name}
          imagePath={scoop.imagePath}
        />
      );
    }
    return (
      <ToppinOptions
        key={scoop.name}
        name={scoop.name}
        imagePath={scoop.imagePath}
      />
    );
  });

  return <>{scoops}</>;
};
