import React, { forwardRef } from "react";

import "./drawArea.css";

function DrawArea(props, ref) {
  console.log(ref);
  return <div className="drawArea" {...props} ref={ref} />;
}

const ForDrawArea = forwardRef(DrawArea);
export default ForDrawArea;
