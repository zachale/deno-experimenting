import express from "express";
import ollama from "ollama";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/joke", async (req, res) => {
  const { response } = await ollama.generate({
    model: "llama3.1",
    prompt: "tell me a brief joke",
    options: { temperature: 0, seed: 1 },
  });
  res.send({ response });
});

const nodeGenerationPromptBase = Object.freeze({
  task:
    "You are a node builder. You take a prompt and return a formated json string with the required properties. This json will be turned into a visual node. Only return a properly formatted string with the required properties. Ensure that you create and label inputs and outputs correctly, and utilize them correctly within the provided javascript function",
  required_properties: {
    title: "concise descriptor of the node",
    script:
      "a javascript snippet that completes any requested functionality. Use the functions this.getInputDataByName(label:string) and this.setOutputData(index:number, value:any). The index is the index of the output in the outputs array, the label is the label of the input in the inputs array. The value is effectively the data you want to pass to the next node",
    inputs: [{
      label: "a concise descriptor",
      type: "you can set the type as either 'number' or 'string'",
    }],
    outputs: [{
      label: "a concise descriptor",
      type: "you can set the type as either 'number' or 'string'",
    }],
  },
  // user_prompt: "I want a node that will add two numbers",
  important:
    "THE USER WILL NOT SEE YOUR RESPONSE. ONLY RESPOND WITH A FORMATTED JSON STRING. DO NOT GIVE AN EXPLAINATION OR ANY OTHER TEXT",
});

app.post("/generate", async (req: { body: { prompt: string } }, res) => {
  const { user_prompt } = req.body;
  const messages = [{
    content:
      `You are a node builder. You take a prompt and build a json string that will describe a bespoke node made for the users prompts. To see required fields, an example json object and its prompt are shown. This json will be turned into a visual node. Only return a properly formatted string with the required properties. Ensure that you create and label inputs and outputs correctly, and utilize them correctly within the provided javascript function.
      exmple response to the prompt 'I want a node that will add two numbers' :
      {
  "title": "Sum Two Numbers",
  "script": "this.setOutputData(0, Number(this.getInputDataByName('num1') || 0) + Number(this.getInputDataByName('num2'))" // a javascript snippet that completes the requested functionality. Use the functions this.getInputDataByName(label:string) and this.setOutputData(index:number, value:any). The index is the index of the output in the outputs array, the label is the label of the input in the inputs array. The value is effectively the data you want to pass to the next node. Say nothing if you understand.",
  "inputs": [{
    "label":  "num1", //a concise descriptor,
    "type": "number", //"you can set the type as either 'number' or 'string'"
  },{
    "label":  "num2",
    "type": "number",
  }],
  "outputs": [{
    "label": "sum",
    "type": "number",
  }]
}`,
    role: "user",
  }];
  const { message: firstResponse } = await ollama.chat({
    model: "llama3.1",
    messages,
  });
  console.log(firstResponse);
  messages.push({
    content: user_prompt,
    role: "user",
  });
  const { message: secondResponse } = await ollama.chat({
    model: "llama3.1",
    messages,
  });
  messages.push(secondResponse);
  messages.push({
    content:
      "remove all mardown notation and formatting. Only return the json string. Do not include any other text",
    role: "user",
  });
  const { message: cleanResponse } = await ollama.chat({
    model: "llama3.1",
    messages,
  });
  const parsedResponse = JSON.parse(cleanResponse.content);
  console.log(parsedResponse);
  res.send({ response: parsedResponse });
});

app.listen(
  3000,
  () => console.log("server has started on http://localhost:3000 🚀"),
);
