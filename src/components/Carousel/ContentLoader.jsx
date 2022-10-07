import React from "react";
import ContentLoader from "react-content-loader";

const Loader = (props) => (
  <ContentLoader
    speed={2}
    width={150}
    height={100}
    viewBox="0 0 150 100"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="73" cy="36" r="29" />
    <rect x="48" y="74" rx="0" ry="0" width="52" height="13" />
  </ContentLoader>
);

export default Loader;
