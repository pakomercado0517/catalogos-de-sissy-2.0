/* eslint-disable react/prop-types */
import { Alert, Button } from "flowbite-react";

export default function ApiErrorMessage({ message, onRetry, className = "" }) {
  if (!message) return null;

  return (
    <Alert color="failure" className={className}>
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <span className="flex-1">{message}</span>
        {onRetry && (
          <Button color="failure" size="sm" outline onClick={onRetry}>
            Reintentar
          </Button>
        )}
      </div>
    </Alert>
  );
}
