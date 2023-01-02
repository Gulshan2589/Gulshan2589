import React from "react";

import "../Resources/default-layout.css";
function DefaultLayout(props) {
  return (
    <div className="layout">
      <div className="content">{props.children}</div>
    </div>
  );
}

export default DefaultLayout;
