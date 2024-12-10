let currentParagraph = "";
let startTime = 0;

// Function to get a random paragraph from Wikipedia
async function getRandomParagraphFromWikipedia() {
    try {
        let response = await fetch("https://en.wikipedia.org/api/rest_v1/page/random/summary");
        let data = await response.json();
        return data.extract; // This returns the summary of a random Wikipedia page
    } catch (error) {
        console.error("Error fetching paragraph:", error);
        return "Error generating paragraph. Please try again.";
    }
}

// Start typing with Wikipedia-generated paragraph
async function startTyping() {
    document.getElementById("paragraph").innerText = "Fetching random paragraph from Wikipedia...";
    currentParagraph = await getRandomParagraphFromWikipedia(); // Get paragraph from Wikipedia
    document.getElementById("paragraph").innerText = currentParagraph;
    
    document.getElementById("inputBox").disabled = false;
    document.getElementById("inputBox").value = "";
    document.getElementById("inputBox").focus();
    document.getElementById("result").innerHTML = "";
    document.getElementById("submitButton").disabled = false;
    document.getElementById("resetButton").disabled = false;
    document.getElementById("startButton").disabled = true;
    startTime = new Date().getTime();
}

function submitTyping() {
    let inputText = document.getElementById("inputBox").value.trim();
    let originalText = currentParagraph.trim();

    // Split texts into words
    let inputWords = inputText.split(/\s+/);
    let originalWords = originalText.split(/\s+/);

    // Initialize result variables
    let correctWords = 0;
    let totalWords = originalWords.length;

    // Build highlighted paragraph
    let highlightedParagraph = originalWords.map((word, index) => {
        if (inputWords[index] !== word) {
            return <span class="error">${word}</span>;
        } else {
            correctWords++;
            return word;
        }
    }).join(" ");

    document.getElementById("paragraph").innerHTML = highlightedParagraph;

    // Calculate time taken
    let endTime = new Date().getTime();
    let timeTaken = (endTime - startTime) / 1000; // in seconds
    let wordsPerMinute = (inputWords.length / timeTaken) * 60;

    // Calculate accuracy
    let accuracy = ((correctWords / originalWords.length) * 100).toFixed(2);

    document.getElementById("result").innerHTML = 
        <p>Time Taken: ${timeTaken.toFixed(2)} seconds</p>
        <p>WPM: ${wordsPerMinute.toFixed(2)}</p>
        <p>Accuracy: ${accuracy}%</p>
    ;

    // Disable input after submission
    document.getElementById("inputBox").disabled = true;
    document.getElementById("submitButton").disabled = true;
}

function resetPractice() {
    document.getElementById("paragraph").innerText = "Click 'Start' to begin!";
    document.getElementById("inputBox").value = "";
    document.getElementById("inputBox").disabled = true;
    document.getElementById("result").innerHTML = "";
    document.getElementById("startButton").disabled = false;
    document.getElementById("submitButton").disabled = true;
    document.getElementById("resetButton").disabled = true;
}
