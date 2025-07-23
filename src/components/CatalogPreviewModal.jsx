/* eslint-disable react/prop-types */
import { Modal } from "flowbite-react";
import { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

export default function CatalogPreviewModal({
  openModal,
  closeModal,
  catalogue,
}) {
  const [loading, setLoading] = useState(true);

  const handleOpenCatalog = () => {
    window.open(catalogue.url, "_blank", "noopener,noreferrer");
  };

  return (
    <section>
      <Modal
        size="4xl"
        show={openModal}
        onClose={closeModal}
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
        <div className="relative p-4">
          <button
            onClick={closeModal}
            className="absolute right-4 top-4 text-gray-400 transition-colors hover:text-white"
          >
            <IoMdClose size={24} />
          </button>

          {/* Header */}
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-bold text-purple-300">
              {catalogue.name}
            </h3>
            <p className="mt-2 text-gray-400">{catalogue.company}</p>
          </div>

          {/* Preview Image */}
          <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden rounded-lg">
            {loading && (
              <div className="absolute inset-0 animate-pulse bg-neutral-700" />
            )}
            <img
              src={catalogue.image}
              alt={catalogue.name}
              className="h-full w-full object-cover"
              onLoad={() => setLoading(false)}
            />
          </div>

          {/* Description and Action */}
          <div className="text-center">
            <p className="mb-6 text-gray-300">
              Este catálogo contiene una amplia selección de productos. Para una
              mejor experiencia, te recomendamos verlo en una nueva ventana.
            </p>

            <button
              onClick={handleOpenCatalog}
              className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-3 text-white transition-colors hover:bg-purple-700"
            >
              <span>Ver Catálogo Completo</span>
              <FaExternalLinkAlt />
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
}
