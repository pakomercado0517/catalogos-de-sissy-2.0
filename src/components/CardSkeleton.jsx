import ContentLoader from "react-content-loader";

export default function CardSkeleton(props) {
  return (
    <>
      <ContentLoader
        speed={1}
        width={320}
        height={288}
        viewBox="0 0 320 288"
        backgroundColor="#333333"
        foregroundColor="#444444"
        className="w-80 overflow-hidden rounded-2xl"
        {...props}
      >
        {/* Imagen principal */}
        <rect x="0" y="0" rx="0" ry="0" width="320" height="288" />
        {/* Overlay gradiente */}
        <rect
          x="0"
          y="228"
          rx="0"
          ry="0"
          width="320"
          height="60"
          opacity="0.8"
        />
        {/* Texto del título */}
        <rect
          x="20"
          y="248"
          rx="2"
          ry="2"
          width="280"
          height="20"
          opacity="0.9"
        />
      </ContentLoader>
    </>
  );
}
