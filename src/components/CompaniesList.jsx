import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCompanies } from "../redux/actions";
import SissyCard from "./SissyCard";
import CardSkeleton from "./CardSkeleton";
import ApiErrorMessage from "./ApiErrorMessage";
import { ensureArray } from "../utils/ensureArray";

export default function CompaniesList() {
  const dispatch = useDispatch();
  const companies = ensureArray(useSelector((state) => state.companies));
  const error = useSelector((state) => state.apiErrors.companies);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCompanies = async () => {
    setIsLoading(true);
    await dispatch(getAllCompanies());
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCompanies();
  }, [dispatch]);

  return (
    <section>
      <div className="min-h-screen bg-neutral-900 px-6 pb-10 pt-28 text-white">
        <h1 className="mb-8 text-center text-3xl font-bold italic">
          Catálogos de Sissy
        </h1>

        {error && (
          <ApiErrorMessage
            message={error}
            onRetry={fetchCompanies}
            className="mx-auto mb-8 max-w-xl"
          />
        )}

        <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3">
          {isLoading ? (
            <>
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-fade-up">
                  <CardSkeleton />
                </div>
              ))}
            </>
          ) : error ? null : (
            companies.map((company) => (
              <a
                key={company.name}
                href={`/catalogos/${company.id}`}
                className="group relative w-80 animate-fade-down overflow-hidden rounded-2xl shadow-xl transition-transform duration-300 hover:scale-[1.03]"
              >
                <SissyCard image={company.image}>
                  {company.name.toUpperCase()}
                </SissyCard>
              </a>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
