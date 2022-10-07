import React from "react";
import ContentLoader from "react-content-loader";

const FoodCategoryLoader = (props) => (
  <ContentLoader
    speed={2}
    width={130}
    height={30}
    viewBox="0 0 130 30"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="245" y="34" rx="0" ry="0" width="120" height="14" />
    <rect x="9" y="7" rx="0" ry="0" width="88" height="14" />
  </ContentLoader>
);

export default FoodCategoryLoader;
