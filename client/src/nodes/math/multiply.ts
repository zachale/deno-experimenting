import { LGraphNode } from "@comfyorg/litegraph";

export class Multiply extends LGraphNode {
  constructor() {
    super("Multiply");
    this.addInput("A", "number");
    this.addInput("B", "number");
    this.addOutput("A*B", "number");
    this.properties = { precision: 1 };
  }

  override onExecute() {
    const A = this.getInputData(0) as unknown as number;
    const B = this.getInputData(1) as unknown as number;
    if (A && B) {
      this.setOutputData(0, A * B);
    }
  }
}
