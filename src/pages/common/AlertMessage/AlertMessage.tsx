import { Alert } from "react-bootstrap";

interface Props {
  message?: string;
  variant?: string;
}
export const AlertMessage = ({ message, variant }: Props) => {
  const alertMessage = message || "An error has occurred";
  const variantAlert = variant || "danger";

  return <Alert variant={variantAlert}>{alertMessage}</Alert>;
};
