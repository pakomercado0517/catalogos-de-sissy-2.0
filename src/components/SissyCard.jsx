// eslint-disable-next-line react/prop-types
export default function SissyCard({ children, image }) {
  return (
    <article>
      <div className="group relative w-80 overflow-hidden rounded-2xl shadow-xl transition-transform duration-300 hover:scale-[1.03]">
        <img
          src={image}
          alt="Portada del Catálogo"
          className="h-72 w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-4 py-3 text-center">
          <p className="text-lg font-semibold tracking-wide transition-colors group-hover:text-gray-400">
            {children}
          </p>
        </div>
      </div>
    </article>
  );
}
