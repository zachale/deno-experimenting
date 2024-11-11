import { LGraphNode } from "@comfyorg/litegraph";

export class String extends LGraphNode {
  value: string = "";
  constructor() {
    super("String");
    this.addWidget("string", "value", 1, (value) => {
      if (value) {
        this.value = value;
      }
    });
    this.addOutput("value", "string");
    this.properties = { precision: 1 };
  }

  override onExecute() {
    this.setOutputData(0, this.value);
  }
}
