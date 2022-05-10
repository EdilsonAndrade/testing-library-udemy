import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Popover, OverlayTrigger } from "react-bootstrap";

import Checkbox from "react-bootstrap/FormCheck";

const Summary = () => {
  const [checked, setChecked] = useState(false);

  const popOver = () => (
    <Popover id="popover-basic">
      <Popover.Body>No Ice Crem Will Actually be Delivered</Popover.Body>
    </Popover>
  );
  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger trigger={["hover", "focus"]} overlay={popOver}>
        <span style={{ color: "blue" }}>Terms and Conditions</span>
      </OverlayTrigger>
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

export { Summary };
