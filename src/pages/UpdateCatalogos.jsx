/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCompanies, updateCataloguesById } from "../redux/actions";
import { Alert, Spinner } from "flowbite-react";
import AlertAdditionalContent from "../components/AlertAdditionalContent";
import { useNavigate } from "react-router-dom";

export default function UpdateCatalogos() {
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.companies);
  const updateMessage = useSelector((state) => state.updateMessage);

  useEffect(() => {
    dispatch(getAllCompanies());
  }, [dispatch, updateMessage]);

  const handleCataloguesUpdate = (id, name) => {
    dispatch(updateCataloguesById(id));
    setMessage(`Los catalogos de ${name} se actualizaron con exito`);
    setShowAlert(true);
  };

  const handleRedirect = () => navigate("/");

  return (
    <section className="my-24">
      <h1 className="text-center text-2xl font-bold">
        Selecciona la compañia que requieres actualizar los Catálogos
      </h1>
      <div
        className={`mt-8 flex justify-center ${showAlert ? "w-full" : "hidden"}`}
      >
        <Alert
          className="max-w-5xl"
          color="dark"
          additionalContent={
            <AlertAdditionalContent
              handleRedirect={handleRedirect}
              updateMessage={updateMessage}
            />
          }
        >
          {updateMessage === "success" ? (
            <span className="text-center text-lg">{message}</span>
          ) : (
            <Spinner color="pink" size="xl" />
          )}
        </Alert>
      </div>
      <div className="mx-auto mt-16 grid grid-cols-1 justify-items-center gap-10 md:grid-cols-3">
        {companies.map((el) => (
          <div className="" key={el.id}>
            <img
              src={el.image}
              className={`h-44 w-44 rounded-full  `}
              alt="company"
              onClick={() => handleCataloguesUpdate(el.id, el.name)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
