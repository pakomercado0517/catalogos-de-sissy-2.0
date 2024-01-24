/* eslint-disable react/prop-types */

import SissyCatalogues from "../components/SissyCatalogues";

export default function Catalogos({ companyName }) {
  return (
    <section className="relative top-20">
      <SissyCatalogues companyName={companyName} />
    </section>
  );
}
