import React from "react";
import ContentLoader from "react-content-loader";

const Loader = (props) => (
  <ContentLoader
    speed={2}
    width={400}
    height={250}
    viewBox="0 0 400 250"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="1" rx="0" ry="0" width="397" height="162" />
    <rect x="1" y="184" rx="0" ry="0" width="143" height="31" />
    <rect x="282" y="180" rx="0" ry="0" width="114" height="24" />
    <rect x="282" y="208" rx="0" ry="0" width="114" height="24" />
    <rect x="1" y="226" rx="0" ry="0" width="196" height="10" />
  </ContentLoader>
);

export default Loader;
