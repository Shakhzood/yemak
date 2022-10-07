import React from "react";
import ContentLoader from "react-content-loader";

const FoodLoader = (props) => (
  <ContentLoader
    speed={2}
    width={500}
    height={200}
    viewBox="0 0 500 200"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="20" y="8" rx="0" ry="0" width="208" height="181" />
    <rect x="251" y="21" rx="0" ry="0" width="186" height="25" />
    <rect x="252" y="58" rx="0" ry="0" width="120" height="14" />
    <rect x="254" y="158" rx="0" ry="0" width="150" height="23" />
    <circle cx="465" cy="159" r="21" />
  </ContentLoader>
);

export default FoodLoader;
