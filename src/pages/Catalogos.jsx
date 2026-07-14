/* eslint-disable react/prop-types */

import SissyCatalogues from "../components/SissyCatalogues";

export default function Catalogos({ catalogSearch = "" }) {
  return (
    <section className="flex min-h-screen flex-col">
      <SissyCatalogues catalogSearch={catalogSearch} />
    </section>
  );
}
