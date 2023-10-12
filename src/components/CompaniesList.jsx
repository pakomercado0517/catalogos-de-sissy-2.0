import companies from "../Db/cards.json";
import { Link } from "react-router-dom";
import SissyCard from "./SissyCard";
import "./styles/CompaniesList.css";

export default function CompaniesList() {
  return (
    <section>
      <div className="grid justify-center gap-3 md:grid-cols-2 md:gap-4 md:justify-items-center lg:grid-cols-3">
        {companies.map((el) => {
          return (
            <Link
              key={el.id}
              className="animate-flip-up animate-once"
              to={`/catalogos/${el.name}`}
            >
              <SissyCard imgURL={el.img}>
                <h2 className="text-lg text-center underline">{el.name}</h2>
              </SissyCard>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
