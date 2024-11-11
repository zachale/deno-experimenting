import React, { useEffect, useRef } from "react";
import { createGraph } from "./editor.ts";
import "../node_modules/@comfyorg/litegraph/dist/css/litegraph.css"; // Include the litegraph.css file to ensure proper graph styling
import { useGraph } from "./hooks/useGraph.ts";

export default function App() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const app = useRef<HTMLDivElement>(null);
  useGraph(canvas);

  return (
    <div
      ref={app}
      className="App"
      style={{ width: "100svw", height: "100svh" }}
    >
      <canvas
        ref={canvas}
        id="mycanvas"
        width={String(window.innerWidth) + "px"}
        height={String(window.innerHeight) + "px"}
      >
      </canvas>
    </div>
  );
}
