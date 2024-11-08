import React, { useEffect, useRef } from "react";
import { createGraph } from "./editor.ts";
import "../node_modules/@comfyorg/litegraph/dist/css/litegraph.css"; // Include the litegraph.css file to ensure proper graph styling
import { useGraph } from "./hooks/useGraph.ts";

export default function App() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useGraph(canvas);

  return (
    <div className="App">
      <canvas ref={canvas} id="mycanvas" width="1024" height="720"></canvas>
    </div>
  );
}
