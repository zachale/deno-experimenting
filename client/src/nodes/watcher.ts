import { LGraphNode } from "@comfyorg/litegraph";

export class Watcher extends LGraphNode {
  value: number = 0;
  constructor() {
    super("Watcher");
    this.addInput("Input", 0, { label: "Input" });
  }

  override onExecute() {
    const input = this.getInputData(0) as unknown as number;
    this.value = input;
  }
}
