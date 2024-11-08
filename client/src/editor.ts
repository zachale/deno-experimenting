import { LGraph, LGraphCanvas, LiteGraph } from "@comfyorg/litegraph";
export function createGraph(canvasElement: HTMLCanvasElement) {
  const graph = new LGraph();
  const canvas = new LGraphCanvas(canvasElement, graph);
  const node_const = LiteGraph.createNode("basic/sum");
  node_const.pos = [200, 200];
  graph.add(node_const);
  graph.start();
}
