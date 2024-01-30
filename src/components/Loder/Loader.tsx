import React from "react";
import "./Loader.css";
const Loader:React.FC = React.memo(() => {
  return (
    <div className={"h-100 d-flex align-items-center justify-content-center"}>
      <div className="loader"></div>
    </div>
  );
});

export default Loader;