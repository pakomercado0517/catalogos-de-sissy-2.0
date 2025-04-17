import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCompanies } from "../redux/actions";

export default function CompaniesList() {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.companies);

  console.log("companies", companies);

  useEffect(() => {
    dispatch(getAllCompanies());
  }, [dispatch]);

  return (
    <section>
      <div className="min-h-screen bg-neutral-900 px-6 py-10 text-white">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Catálogos de Sissy
        </h1>
        <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3">
          {companies.map((company) => (
            <a
              key={company.name}
              href={`/catalogos/${company.id}`}
              className="group relative w-80 overflow-hidden rounded-2xl shadow-xl transition-transform duration-300 hover:scale-[1.03]"
            >
              <img
                src={company.image}
                alt={company.name}
                className="h-72 w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-4 py-3 text-center">
                <p className="text-lg font-semibold tracking-wide transition-colors group-hover:text-gray-400">
                  {company.name}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
