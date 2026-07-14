/* eslint-disable react/prop-types */
import HomeLanding from "../components/home/HomeLanding";
export default function Home({ brandSearch = "" }) {
  return <HomeLanding brandSearch={brandSearch} />;
}
