import { LGraphNode } from "@comfyorg/litegraph";
import { ensureAbsolutePath } from "../../../../../../../AppData/Local/deno/npm/registry.npmjs.org/@typescript-eslint/typescript-estree/8.13.0/dist/create-program/shared.d.ts";

export class Text extends LGraphNode {
  value: string = "";
  hasGenerated: boolean = false;
  constructor() {
    super("Generated Text");
    this.addWidget("text", "string", "", (value) => {
      this.value = value;
    });
    this.addWidget("button", "Generate", "Generate", () => {
      console.log(this.value);
      this.generate(this.value);
    });
  }

  generate(prompt: string) {
    fetch("http://localhost:3000/generate", {
      method: "POST",
      body: JSON.stringify({
        prompt,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => response.json())
      .then((response) => {
        this.title = response.title;
        console.log(response.script);
        const test = () => eval(`(${response.script}).call(this)`); // converts recieved function into arrow function
        console.log(test);
        this.onExecute = test;
        response.inputs.forEach((input: { label: string; type: string }) => {
          this.addInput(input.label, input.type);
        });
        response.outputs.forEach((output: { label: string; type: string }) => {
          this.addOutput(output.label, output.type);
        });
      }).catch((err) => console.error(err));
  }

  override onExecute() {
    this.setOutputData(0, this.value);
  }
}
