export interface NodeContext {
  title: string;
  description: string;
  inputs: { label: string; type: "number" | "string" }[];
  outputs: { label: string; type: "number" | "string" }[];
}

export interface Node extends NodeContext {
  script: string;
}
