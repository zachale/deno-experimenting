import { LiteGraph } from "@comfyorg/litegraph";
import { Sum } from "./sum.ts";
import { Number } from "./types/number.ts";
import { Watcher } from "./watcher.ts";

export function resgisterCustomNodes(): boolean {
  try {
    LiteGraph.registerNodeType("basic/sum", Sum);
    LiteGraph.registerNodeType("type/number", Number);
    LiteGraph.registerNodeType("basic/watcher", Watcher);
  } catch (e) {
    console.error("Error registering custom nodes: ", e);
    return false;
  }
  return true;
}
