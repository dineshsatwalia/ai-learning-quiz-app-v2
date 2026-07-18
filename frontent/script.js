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
import "./style.css";

async function generateQuiz() {

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

function toggleTheme() {

    document.body.classList.toggle(
        "light-mode"
    );

}

function startVoice() {

    if (!("webkitSpeechRecognition" in window)) {

        alert(
            "Voice input is not supported in this browser."
        );

        return;

    }

    const recognition = new webkitSpeechRecognition();

    recognition.lang = "en-US";

    recognition.start();

    recognition.onresult = function (event) {

        document.getElementById(
            "prompt"
        ).value = event.results[0][0].transcript;

    };

}

function speakText() {

    const text = document.getElementById(
        "result"
    ).innerText;

    if (text === "") {

        alert("Generate something first");

        return;

    }

    const speech =
        new SpeechSynthesisUtterance(
            text
        );

    speech.lang = "en-IN";

    window.speechSynthesis.speak(
        speech
    );

}

window.onclick = function (event) {

    const popup = document.getElementById(
        "loginBox"
    );

    if (event.target === popup) {

        popup.style.display = "none";

    }

};

function goHome() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

function goSubjects() {

    document
        .querySelector(".subjects")
        .scrollIntoView({

            behavior: "smooth"

        });

}

function goQuiz() {

    document
        .querySelector(".quiz-box")
        .scrollIntoView({

            behavior: "smooth"

        });

}

function goLeaderboard() {

    document
        .querySelector(".leaderboard")
        .scrollIntoView({

            behavior: "smooth"

        });

}

const ctx = document
    .getElementById("quizChart")
    .getContext("2d");

new Chart(ctx, {

    type: "bar",

    data: {

        labels: [

            "Math",

            "Physics",

            "Chemistry",

            "Programming"

        ],

        datasets: [

            {

                label: "Quiz Score",

                data: [

                    90,

                    75,

                    85,

                    95

                ]

            }

        ]

    }

});
async function login() {

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    const response = await fetch(

        "https://ai-learning-quiz-app-v2.onrender.com/api/login",

        {

            method: "POST",

            headers: {

                "Content-Type":
                    "application/json"

            },

            body: JSON.stringify({

                email,
                password

            })

        }

    );

    const data =
        await response.json();

    alert(data.message);

    if (response.ok) {

        closeLogin();
        localStorage.setItem("user", email);

document.querySelector(
    ".nav-buttons"
).innerHTML = `
    <span>
        Welcome, ${email}
    </span>
`;

    }

}
window.onload = function () {

    const user =
        localStorage.getItem("user");

    if (user) {

        document.querySelector(
            ".nav-buttons"
        ).innerHTML = `
            <span>
                Dinesh 
            </span>
        `;

    } else {

        showLogin();

    }

};