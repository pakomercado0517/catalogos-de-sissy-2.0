import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCompanies } from "../redux/actions";
import { Link } from "react-router-dom";
import SissyCard from "./SissyCard";
import "./styles/CompaniesList.css";

export default function CompaniesList() {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.companies);

  useEffect(() => {
    dispatch(getAllCompanies());
  }, [dispatch]);

  return (
    <section>
      <div className="grid justify-center gap-3 md:grid-cols-2 md:gap-4 md:justify-items-center lg:grid-cols-3">
        {companies.map((el) => {
          return (
            <Link
              key={el.id}
              className="animate-flip-up animate-once"
              to={`/catalogos/${el.id}`}
            >
              <SissyCard image={el.image}>
                <h2 className="text-lg text-center underline">
                  {el.name.toUpperCase()}
                </h2>
              </SissyCard>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
