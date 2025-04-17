/* eslint-disable react/prop-types */

import SissyCatalogues from "../components/SissyCatalogues";

export default function Catalogos({ companyName }) {
  return (
    <section className="">
      <SissyCatalogues companyName={companyName} />
    </section>
  );
}
