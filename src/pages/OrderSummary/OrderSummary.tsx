import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Checkbox from "react-bootstrap/FormCheck";

const OrderSummary = () => {
  const [checked, setChecked] = useState(false);

  const checkboxLabel = (
    <span>
      I agree to <span style={{ color: "blue" }}>Terms and Conditions</span>
    </span>
  );
  return (
    <Form>
      <Form.Group controlId="terms-and-condition">
        <Checkbox
          checked={checked}
          onChange={(c) => setChecked(c.target.checked)}
          id="chkAgree"
          label={checkboxLabel}
        ></Checkbox>
      </Form.Group>
      <Button variant="primary" disabled={!checked} type="submit">
        Confirm order
      </Button>
    </Form>
  );
};

export { OrderSummary };
