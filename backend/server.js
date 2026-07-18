import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

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

        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",

                headers: {
                    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    model: "openai/gpt-oss-20b",

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
                })
            }
        );

        const data = await response.json();

        const answer =
            data.choices?.[0]?.message?.content;

        res.json({
            reply: answer || "No response received"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});

app.get("/", (req, res) => {

    res.send("AI Learning Quiz App Backend is running!");

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});