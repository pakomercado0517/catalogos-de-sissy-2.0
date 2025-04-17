import { Card } from "flowbite-react";

// eslint-disable-next-line react/prop-types
export default function SissyCard({ children, image }) {
  return (
    <article>
          <div
            className="group w-80 relative rounded-2xl overflow-hidden shadow-xl hover:scale-[1.03] transition-transform duration-300"
          >
            <img
              src={image}
              alt="Portada del Catálogo"
              className="w-full h-72 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 py-3 px-4 text-center">
              <p className="text-lg font-semibold tracking-wide group-hover:text-gray-400 transition-colors">
                {children}
              </p>
            </div>
          </div>
    </article>
  );
}
