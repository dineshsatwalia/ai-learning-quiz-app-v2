import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { InferenceClient } from "@huggingface/inference";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new InferenceClient(
    process.env.HF_API_KEY
);

app.post("/api/chat", async (req, res) => {

    try {

        const { message, mode } = req.body;

        let systemPrompt = "";

        if (mode === "learn") {

            systemPrompt =
                "Explain the topic in simple words with notes and examples.";

        } else {

            systemPrompt =
                "Generate 10 quiz questions with answers.";
        }

        const result =
            await client.chatCompletion({

                model:
                    "meta-llama/Llama-3.1-8B-Instruct",

                messages: [

                    {
                        role: "system",
                        content: systemPrompt
                    },

                    {
                        role: "user",
                        content: message
                    }
                ]
            });

        const answer =
            result.choices?.[0]?.message?.content;

        res.json({

            reply:
                answer ||
                "No response received"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            error: error.message
        });
    }
});

const PORT =
    process.env.PORT || 5000;
    app.get("/", (req, res) => {
    res.send("AI Learning Quiz App Backend is running!");
});

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});
console.log(process.env.HF_API_KEY);
dotenv.config();