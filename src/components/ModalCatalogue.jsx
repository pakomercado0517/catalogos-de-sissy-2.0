/* eslint-disable react/prop-types */
"use client";
import { Modal } from "flowbite-react";
import Iframe from "react-iframe";

export default function ModalCatalogue({
  openModal,
  closeModal,
  catalogueName,
  catalogueURL,
}) {
  return (
    <section>
      <Modal size="5xl" show={openModal === true} onClose={closeModal}>
        <Modal.Header>{catalogueName}</Modal.Header>
        <Modal.Body>
          <section className="h-[100vh]">
            <Iframe
              width="100%"
              height="100%"
              className=""
              id=""
              src={catalogueURL}
            />
          </section>
        </Modal.Body>
      </Modal>
    </section>
  );
}
