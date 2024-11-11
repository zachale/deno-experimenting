import ollama, { Message } from "ollama";
import { generateResponse } from "./packages/generation-service/generation.service.ts";
import { NodeContext } from "./types.ts";
import { SCRIPT_CONTEXT } from "./constants.ts";

export async function promptDeconstructor(
  prompt: string,
): Promise<NodeContext> {
  const response = await generateResponse(
    `Given a user prompt, analyze the prompt and generate a full JSON object.
      Ensure that the JSON object is completely filled, and that all properties are defined properly.
      The JSON object should have the following structure:
      {
        title: string, // a concise descriptor of the node
        description: string, // an intricate and detailed description of what you think the expected functionality of the node is
        inputs: [{
          label: string, // a concise descriptor
          type: 'number', | 'string',
          }]
        outputs: [{
          label: string, // a concise descriptor
          index: number, // a 0 based index for the outputs place in the array
          type: 'number', | 'string',
          }]
      }, Only return the json object. USER PROMPT: ${prompt}`,
  );
  return await ensureJsonString(response, ["title", "inputs", "outputs"]);
}

export async function scriptBuilder(
  { title, ...context }: NodeContext,
): Promise<string> {
  const script = await generateResponse(
    `Create a javascript function.
    Analyze the following node descriptors to guide your implementation:
      - Description: ${context.description}
      - Inputs: ${JSON.stringify(context.inputs)}
      - Outputs: ${JSON.stringify(context.outputs)}.
    The function must have no arguments.
    Use the following function calls to manipulate the inputs and outputs:
      - this.getInputDataByName(label: string) // returns the data from the input at the given index
      - this.setOutputData(index:number, data: number | string) // sets the data for the output at the given
    Only generate the script as a string of properly formatted javascript. 
    Include inline comments to explain your code. 
      `,
  );
  return await ensureValidScript(script);
}

export async function ensureJsonString<T>(
  prompt: string,
  properties: string[],
): Promise<T> {
  const messages = [{
    role: "system",
    content:
      `Given a string, ensure that it is properly formatted JSON. Return ONLY the string. Do not explain. Do not return any other text. Expected Properties: ${properties} `,
  }, { role: "user", content: prompt }];
  return await transformToJson(messages);
}

async function transformToJson(
  messages: Array<Message>,
) {
  try {
    return JSON.parse(messages[messages.length - 1].content);
  } catch (error) {
    messages.push({
      role: "user",
      content:
        `the response is not properly formatted JSON. Please try again. Ensure you are ONLY returning the JSON string. Here is the error: ${error}`,
    });
    console.log("Response not json, reformatting.");
    const { message } = await ollama.chat({
      model: "llama3.1",
      messages,
    });
    messages.push(message);
    return await transformToJson(messages);
  }
}

export async function ensureValidScript(script: string): Promise<string> {
  const messages = [{
    role: "system",
    content:
      `Given a script, ensure that the script is properly formatted JavaScript. Return ONLY the script.
      `,
  }, { role: "user", content: script }];
  return await transformToJavascript(messages);
}

async function transformToJavascript(
  messages: Array<Message>,
): Promise<string> {
  try {
    const script = messages[messages.length - 1].content;
    new Function(script).call(SCRIPT_CONTEXT); // call the generated function, passing in the proper context. This will throw an error if the script is invalid.
    return script;
  } catch (error) {
    console.log(`Response not valid javascript, reformatting`);
    console.log(error);
    messages.push({
      role: "user",
      content:
        `The response is not properly formatted JavaScript. Please try again. Ensure to ONLY return the JavaScript string. Here is the error: ${error}`,
    });
    const { message } = await ollama.chat({
      model: "llama3.1",
      messages,
    });
    messages.push(message);
    return await transformToJavascript(messages);
  }
}
