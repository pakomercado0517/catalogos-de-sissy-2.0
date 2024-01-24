import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCataloguesByCompany,
  resetCataloguesByCompany,
  getCompanyById,
} from "../redux/actions";
// import { Toast } from "flowbite-react";
import { useParams } from "react-router-dom";
import SissyCard from "../components/SissyCard";
import CardSkeleton from "./CardSkeleton";

export default function SissyCatalogues() {
  const dispatch = useDispatch();
  // const [openModal, setOpenModal] = useState(false);
  const currentCatalogues = useSelector((state) => state.currentCatalogues);
  // const company = useSelector((state) => state.company);
  const { id } = useParams();

  useEffect(() => {
    // Cuando el componente se monta o cuando cambia 'id'
    dispatch(getCataloguesByCompany(id));
    dispatch(getCompanyById(id));

    // La función de limpieza se ejecutará antes de cada nueva ejecución del efecto.
    return () => {
      // Cuando el componente se desmonta o cuando cambia 'id'
      dispatch(resetCataloguesByCompany());
      dispatch(getCompanyById(""));
    };
  }, [id]);

  // Resto del componente...

  //buscamos el nombre del catálogo dentro del objeto y guardamos el catálogo en el state para utilizarlo y renderizarlo
  // allCatalogues.forEach((entry) => {
  //   for (const key in entry)
  //     if (Object.hasOwnProperty.call(entry, key)) {
  //       if (key === name) {
  //         const item = entry[name];
  //         setGetCatalogs(item);
  //       }
  // }

  // const handleModal = () => {
  //   if (currentCatalogues.length === 0) setOpenModal(true);
  // };

  return (
    <section className="grid justify-center gap-3 md:grid-cols-2 md:justify-items-center lg:grid-cols-4">
      {currentCatalogues.length > 0 ? (
        currentCatalogues.map((cat) => {
          return (
            <a
              href={cat.url}
              target="_blank"
              rel="noreferrer"
              key={cat.id}
              className="animate-fade-down animate-once"
            >
              <SissyCard image={cat.image}>
                {cat.name ? <h2 className="text-center">{cat.name}</h2> : ""}
              </SissyCard>
            </a>
          );
        })
      ) : (
        <>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </>
        // <div className="w-full my-48 flex md:justify-center md:items-center lg:justify-items-center lg:self-center ">
        //   <Modal show={handleModal}>
        //     <Modal.Header>{company.name?.toUpperCase()}</Modal.Header>
        //     <Modal.Body className="flex justify-center">
        //       <div className="flex gap-5 items-center">
        //         <Spinner
        //           color="purple"
        //           aria-label="Espera, cargando catalogos"
        //           size="xl"
        //         />
        //         <p className="text-center text-gray-700">
        //           Espera, cargando catalogos...
        //         </p>
        //       </div>
        //     </Modal.Body>
        //   </Modal>
        // </div>
      )}
    </section>
  );
}
