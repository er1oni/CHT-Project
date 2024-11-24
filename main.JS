// MAIN.JS

// Travel tips data for destinations
const travelTips = {
    paris: "Paris, the City of Light, is famous for its art, fashion, and landmarks like the Eiffel Tower. Don't miss the Louvre Museum!",
    tokyo: "Tokyo offers a perfect blend of traditional and modern attractions. Visit the Meiji Shrine and experience Shibuya Crossing.",
    "new-york": "New York City is vibrant and diverse. Explore Times Square, Central Park, and the Statue of Liberty.",
    sydney: "Sydney is known for its stunning Opera House, Harbour Bridge, and beautiful beaches like Bondi."
};

// Handle getting travel tips based on the selected destination
function getDestinationInfo() {
    const selectElement = document.getElementById("destination-select");
    const selectedDestination = selectElement.value;
    const infoDiv = document.getElementById("destination-info");

    if (travelTips[selectedDestination]) {
        infoDiv.textContent = travelTips[selectedDestination];
    } else {
        infoDiv.textContent = "No travel tips available for the selected destination.";
    }
}

// Function to call the AI API
async function askAI() {
    const userInput = document.getElementById("user-query").value.trim();
    const responseDiv = document.getElementById("chatbot-response");

    if (!userInput) {
        responseDiv.textContent = "Please ask a question!";
        return;
    }

    // Show a loading message
    responseDiv.textContent = "Thinking...";

    try {
        // Replace 'YOUR_API_KEY' with your actual OpenAI API key
        const apiKey = "YOUR_API_KEY";
        const response = await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: `You are an AI travel assistant. Answer the following question: ${userInput}`,
                max_tokens: 150,
                temperature: 0.7
            })
        });

        const data = await response.json();
        if (data.choices && data.choices.length > 0) {
            responseDiv.textContent = data.choices[0].text.trim();
        } else {
            responseDiv.textContent = "Sorry, I couldn't understand your question. Please try again.";
        }
    } catch (error) {
        console.error("Error fetching AI response:", error);
        responseDiv.textContent = "An error occurred while fetching the AI response. Please try again later.";
    }
}
