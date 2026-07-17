import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(
  process.env.HF_API_KEY
);

export async function generateQuiz(
  prompt: string
) {
  try {
    const response =
      await client.chatCompletion({
        model: "meta-llama/Llama-3.1-8B-Instruct",

        messages: [
          {
            role: "system",
            content:
              "You are an AI teacher. Generate 5 MCQ questions with answers."
          },
          {
            role: "user",
            content: prompt
          }
        ]
      });

    return (
      response.choices?.[0]?.message?.content ||
      "No response"
    );
  } catch (error) {
    console.log(error);

    return "Error generating quiz";
  }
}