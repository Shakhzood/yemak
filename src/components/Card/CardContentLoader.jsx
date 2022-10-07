import React from "react";
import ContentLoader from "react-content-loader";

const CardContentLoader = (props) => (
  <div className="card">
    <ContentLoader
      speed={2}
      width={360}
      height={192}
      viewBox="0 0 360 192"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="4" y="-5" rx="0" ry="0" width="350" height="203" />
    </ContentLoader>
  </div>
);

export default CardContentLoader;
