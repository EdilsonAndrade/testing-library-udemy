import React from "react";

interface ToppingProps {
  name: string;
  imagePath: string;
}

export const ToppinOptions = ({ name, imagePath }: ToppingProps) => {
  return (
    <>
      <img
        src={`http://localhost/3030/${imagePath}`}
        alt={`${name} toppings`}
      />
    </>
  );
};
