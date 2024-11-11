import express from "express";
import cors from "cors";
import { generateResponse } from "./packages/generation-service/generation.service.ts";
import {
  ensureJsonString,
  promptDeconstructor,
  scriptBuilder,
} from "./main.controller.ts";

const app = express();
app.use(cors());

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/joke", async (req, res) => {
  const joke = await generateResponse(
    "tell me a brief joke. I'd like to laugh. It would be nice if it were in a json format like {joke: string}. Thanks! Oh also, please give me a little description of the joke, not in the json string :)",
  );
  const cleanResponse = await ensureJsonString(joke, ["joke"]);
  console.log(cleanResponse);
  return res.send(cleanResponse);
});

app.post("/generate", async ({ body: { prompt } }, res) => {
  if (!prompt) return res.status(400).send("Prompt is required.");
  console.log("Received request.", prompt);
  const nodeContext = await promptDeconstructor(prompt);
  const script = await scriptBuilder(nodeContext);
  const node = { ...nodeContext, script };
  console.log("Generated node.", node);
  return res.send(node);
});

app.listen(
  3000,
  () => console.log("server has started on http://localhost:3000 🚀"),
);
