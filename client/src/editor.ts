import { LGraph, LGraphCanvas, LiteGraph } from "@comfyorg/litegraph";
export function createGraph(canvasElement: HTMLCanvasElement) {
  const graph = new LGraph();
  const canvas = new LGraphCanvas(canvasElement, graph);
  graph.start();
  return { graph, canvas };
}
