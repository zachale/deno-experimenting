import { LGraphNode } from "@comfyorg/litegraph";

export class Watcher extends LGraphNode {
  value: number = 0;
  constructor() {
    super("Watcher");
    this.addInput("value", 0, { label: "" });
  }

  override onExecute() {
    if (this.inputs[0]) {
      this.value = this.getInputData(0) as unknown as number;
    }
  }

  override getTitle() {
    if (this.flags.collapsed && this.inputs[0]?.label) {
      return this.inputs[0].label;
    }
    return this.title;
  }

  override onDrawBackground(_ctx) {
    if (this.value && this.inputs) {
      this.inputs[0].label = this.value.toString();
    }
  }
}
