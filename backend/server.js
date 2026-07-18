import express from "express";
import User from "./models/User.js";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log(err);
    });

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
app.post("/api/signup", async (req, res) => {

    try {

        const {

            name,
            email,
            password

        } = req.body;

        const existingUser = await User.findOne({

            email

        });

        if (existingUser) {

            return res.status(400).json({

                message: "User already exists"

            });

        }

        const user = new User({

            name,
            email,
            password

        });

        await user.save();

        res.json({

            message: "Signup successful"

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});
app.post("/api/login", async (req, res) => {

    try {

        const {

            email,
            password

        } = req.body;

        const user = await User.findOne({

            email,
            password

        });

        if (!user) {

            return res.status(401).json({

                message:
                    "Wrong email or password"

            });

        }

        res.json({

            message:
                "Login successful"

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

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
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB connected successfully");
    })
    .catch((err) => {
        console.log(err);
    });
    import User from "./models/User.js";

app.post("/api/signup", async (req, res) => {

    const { name, email, password } = req.body;

    const user = new User({

        name,
        email,
        password

    });

    await user.save();

    res.json({

        message: "Signup successful"

    });

});
app.post("/api/login", async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({

        email,
        password

    });

    if (!user) {

        return res.status(401).json({

            message: "Wrong email or password"

        });

    }

    res.json({

        message: "Login successful"

    });

});
import User from "./models/User.js";

app.post("/api/login", async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({

        email,
        password

    });

    if (!user) {

        return res.status(401).json({

            message:
                "Wrong email or password"

        });

    }

    res.json({

        message:
            "Login successful"

    });

});