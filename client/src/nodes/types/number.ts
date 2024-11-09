import { LGraphNode } from "@comfyorg/litegraph";

export class Number extends LGraphNode {
  value: number = 0;
  constructor() {
    super("Const Number");
    this.addWidget("number", "value", 1, (value) => {
      if (value) {
        this.value = value;
      }
    });
    this.addOutput("A+B", "number");
    this.properties = { precision: 1 };
  }

  override onExecute() {
    this.setOutputData(0, this.value);
  }
}
