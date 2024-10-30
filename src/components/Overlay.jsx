import React from "react";
import crossSvg from "../style/fonts/cross.png";

function Overlay({ isVisible, hideOverlay, children }) {
  if (!isVisible) {
    return null;
  }
  return (
    <div className="overlay h-100 d-flex align-items-center justify-content-center">
      <div className="scrollable-content">{children}</div>
      <button
        onClick={hideOverlay}
        className="btn btn-danger cancel-buttonOverlay"
      >
        <img src={crossSvg} alt="Close" />
      </button>
    </div>
  );
}

export default Overlay;
