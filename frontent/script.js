function typeWriter(text, element) {

    element.innerHTML = "";

    let i = 0;

    function typing() {

        if (i < text.length) {

            element.innerHTML += text.charAt(i);

            i++;

            setTimeout(typing, 20);
        }
    }

    typing();
}
async function generateQuiz() {
    typeWriter(data.reply, result);

    const prompt = document.getElementById("prompt").value;

    const mode = document.getElementById("mode").value;

    const result = document.getElementById("result");

    if (prompt === "") {

        alert("Please enter a topic");

        return;
    }

    if (mode === "learn") {

        result.innerHTML = `
            📚 Generating Learning Material...
            <br><br>
            ⏳ Please wait...
        `;

    } else {

        result.innerHTML = `
            ❓ Generating Quiz...
            <br><br>
            ⏳ Please wait...
        `;
    }

    try {

        const response = await fetch(
            "https://ai-learning-quiz-app-v2.onrender.com/api/chat",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    message: prompt,
                    mode: mode
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {

            result.innerHTML =
                "❌ Error: " + data.error;

            return;
        }

        typeWriter(data.reply, result);

    } catch (error) {

        result.innerHTML =
            "❌ Server Error: " + error.message;

        console.log(error);
    }
}