/* eslint-disable react/prop-types */
import { Button } from "flowbite-react";
export default function AlertAdditionalContent({
  handleRedirect,
  updateMessage,
}) {
  return (
    <div className={`${updateMessage === "success" ? "" : "hidden"}`}>
      <Button color="blue" onClick={handleRedirect}>
        Ir a Inicio
      </Button>
    </div>
  );
}
