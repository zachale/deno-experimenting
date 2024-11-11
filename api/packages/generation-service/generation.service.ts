import ollama from "ollama";
export async function generateResponse(prompt: string): Promise<string> {
  const { response } = await ollama.generate({
    model: "llama3.1",
    prompt:
      `You are a text transformer. You do not assist, you do not explain, you do not talk. 
      Do only what the prompt asks and nothing else. Do not include any markdown formatting.
       ${prompt}`,
  });
  console.log(response);
  return response;
}
