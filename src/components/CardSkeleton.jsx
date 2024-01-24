import ContentLoader from "react-content-loader";
import { Spinner } from "flowbite-react";

export default function CardSkeleton(props) {
  return (
    <>
      <ContentLoader
        speed={1}
        width={400}
        height={460}
        viewBox="0 0 400 460"
        backgroundColor="#bababa"
        foregroundColor="#7d7d7d"
        className="transition-all"
        {...props}
      >
        <rect x="128" y="408" rx="2" ry="2" width="211" height="17" />
        <rect x="128" y="84" rx="2" ry="2" width="211" height="320" />
      </ContentLoader>
    </>
  );
}
