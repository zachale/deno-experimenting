import { LiteGraph } from "@comfyorg/litegraph";
import { Sum } from "./math/sum.ts";
import { Number } from "./types/number.ts";
import { String } from "./types/string.ts";
import { Watcher } from "./base/watcher.ts";
import { Multiply } from "./math/multiply.ts";
import { Text } from "./types/text.ts";

export function resgisterCustomNodes(): boolean {
  try {
    LiteGraph.registerNodeType("math/sum", Sum);
    LiteGraph.registerNodeType("math/multiply", Multiply);
    LiteGraph.registerNodeType("type/number", Number);
    LiteGraph.registerNodeType("type/string", String);
    LiteGraph.registerNodeType("base/watcher", Watcher);
    LiteGraph.registerNodeType("type/text", Text);
  } catch (e) {
    console.error("Error registering custom nodes: ", e);
    return false;
  }
  return true;
}
