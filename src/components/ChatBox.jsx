import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCatalogues } from "../redux/actions";
import { Button, Modal } from "flowbite-react";
import { FaComments, FaExternalLinkAlt } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import SissyCard from "./SissyCard";
import { filterCataloguesByInput } from "../ia/openaiCatalogueFilter";

export default function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [filteredCatalogues, setFilteredCatalogues] = useState([]);
  const allCatalogues = useSelector((state) => state.allCatalogues);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen && allCatalogues.length === 0) {
      dispatch(getAllCatalogues());
    }
  }, [dispatch, isOpen, allCatalogues.length]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    try {
      const filtered = await filterCataloguesByInput(userInput, allCatalogues);
      setFilteredCatalogues(filtered);
      setModalOpen(true);
      setUserInput("");
    } catch (error) {
      console.error("Error al procesar la búsqueda:", error);
    }
  };

  return (
    <>
      {/* Botón flotante del chat */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-purple-600 p-4 text-white shadow-lg transition-all duration-300 hover:bg-purple-700"
      >
        <FaComments className="text-2xl" />
      </button>

      {/* Ventana del chat */}
      <div
        className={
          "fixed bottom-24 right-6 z-50 w-96 rounded-lg border border-purple-500/30 bg-neutral-800 shadow-xl transition-all duration-300 " +
          (isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0")
        }
      >
        <div className="border-b border-purple-500/30 p-4">
          <h3 className="text-lg font-semibold text-purple-300">
            Asistente de Catálogos
          </h3>
        </div>
        <div className="p-4">
          <p className="mb-4 text-gray-300">
            ¿Qué tipo de productos estás buscando? Te ayudaré a encontrar los
            catálogos más relevantes.
          </p>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ej: zapatos deportivos, vestidos..."
              className="flex-1 rounded-lg border-none bg-neutral-700 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Button
              type="submit"
              color="purple"
              className="hover:bg-purple-700"
            >
              <IoSend className="text-xl" />
            </Button>
          </form>
        </div>
      </div>

      {/* Modal para mostrar resultados */}
      <Modal
        size="7xl"
        show={modalOpen}
        onClose={() => setModalOpen(false)}
        theme={{
          root: {
            base: "fixed top-0 right-0 left-0 z-50 h-modal h-screen bg-neutral-900/90 overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
            show: {
              on: "flex bg-neutral-900/90",
              off: "hidden",
            },
          },
          content: {
            base: "relative h-full w-full p-4 md:h-auto",
            inner:
              "relative rounded-lg bg-neutral-800 shadow border border-purple-500/30",
          },
        }}
      >
        <Modal.Header className="border-b border-purple-500/30">
          <h3 className="text-xl font-semibold text-purple-300">
            Catálogos Encontrados
          </h3>
        </Modal.Header>
        <Modal.Body className="bg-neutral-800">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCatalogues.map((cat) => (
              <div
                key={cat.id}
                className="group relative animate-fade-down cursor-pointer overflow-hidden rounded-lg transition-transform duration-300 animate-once hover:scale-105"
                onClick={() =>
                  window.open(cat.url, "_blank", "noopener,noreferrer")
                }
              >
                <SissyCard image={cat.image}>
                  <div className="text-center">
                    <h2 className="mb-1 text-xl font-semibold text-white">
                      {cat.name}
                    </h2>
                    {cat.company && (
                      <p className="text-sm text-purple-300">{cat.company}</p>
                    )}
                  </div>
                </SissyCard>
                <div className="absolute inset-0 flex items-center justify-center bg-purple-900/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-white">
                    Ver Catálogo
                    <FaExternalLinkAlt className="text-sm" />
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center text-gray-400">
            <p className="text-sm">
              * Haz clic en cualquier catálogo para verlo en una nueva ventana
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
