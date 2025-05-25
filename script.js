// Array of words categorized by levels for the typing game
var words =[
    // Level 1 words
    [ 
        "start",
        "short",
        "nice",
        "bottle",
        "full",
        "soda",
        "vast",
        "glue",
        "close",
        "hurry",
        "robin",
        "trace",
        "rock",
        "absent",
        "cover",
        "note",
        "burst",
        "relax",
        "group",
        "sad",
        "rob",
        "yell",
        "pop",
        "mix",
        "fix",
        "hot",
        "pin",
        "hill",
        "wiry",
        "dirt",
    ],
    // Level 2 words
    [
        "paddle",
        "answer",
        "awesome",
        "distance",
        "fertile",
        "wakeful",
        "belief",
        "slippery",
        "bizarre",
        "learned",
        "vivacious",
        "grandmother",
        "illegal",
        "thirsty",
        "wholesale",
        "tenuous",
        "skillful",
        "deteriorate",
        "poised",
        "humorous",
        "scrape",
        "replace",
        "languid",
        "adjoining",
        "interesting",
        "stranger",
        "polite",
        "scissors",
        "brainy",
        "interrogation",  
    ],
    // Level 3 words (coding-related)
    [
        "return;",
        "#include",
        "'helloworld'",
        "obj:1",
        "call()",
        "&lt;html&gt;",
        "not_easy",
        "more-dashes",
        "camelCase",
        "ASCII",
        "array[]",
        "printf('')",
        "&lt;/html&gt;",
        "^regex$",
        "System.out.println()",
    ],
    // Empty level placeholder
    [

        
    ],
]

// Variables to track game state
var pointer = 0; // Current word index
var level = 0; // Current game level
var current = words[level][pointer]; // Current word to type
var input = document.getElementById("input"); // Input field element
var box = document.getElementById("scrollingwords"); // Scrolling words container
var orignamOffset = 133; // Initial offset for scrolling
var offset = 133; // Current offset for scrolling
var nextOffset = 31; // Offset increment for each word
var red = 0, green = 255, blue = 0; // RGB color values for visual effects
var rotationOffset = -90; // Initial rotation offset for visual effects
var colorAddition = 25.5; // Increment for color changes
var rotationAddition = 9; // Increment for rotation changes
var countdown = 4; // Countdown timer for game
var quaters = document.querySelectorAll('.quaters'); // Quarter elements for visual effects
var score = 0; // Current score
var highscore = 0; // High score

// Preload game-over audio
const gameOverAudio = new Audio('resources/GameOver.mp3');
gameOverAudio.load();

// Preload gunshot audio
const gunShotAudio = new Audio('resources/GunShot.mp3');
gunShotAudio.load();

// Initialize the game when the window loads
window.onload = function() {
    var final = ""; // HTML string for word list
    for(var i = 0; i < words[level].length; i++) {
        final += "<li>" + words[level][i] + "</li>"; // Add each word as a list item
    }
    // Add initial animations and styles
    document.getElementsByClassName("bouncy")[0].classList.add("bouncyIntro");
    document.getElementById("q1").classList.add("q1c");
    document.getElementById("q2").classList.add("q2c");
    document.getElementById("q3").classList.add("q3c");
    document.getElementById("q4").classList.add("q4c");
    document.getElementsByTagName("ul")[0].innerHTML = final; // Populate word list
    document.getElementById("word").innerHTML = current; // Display current word
    var currentScroll = document.getElementsByTagName("li")[pointer]; // Highlight current word
    currentScroll.style.fontSize = "19pt";
    currentScroll.style.fontWeight = "bold";
    currentScroll.style.color = "rgba(255, 255, 255, 0.7)";
}

// Clear placeholder text when input field is focused
input.onfocus = function() {
    input.placeholder = "";
}

// Reset placeholder text when input field loses focus
input.onblur = function() {
    input.placeholder = "Type the text above to begin...";
}

// Function to update colors and rotation for visual effects
function setColors() {
    if (green === 255 && red < 255 && blue === 0) {
        red += colorAddition; // Increase red value
        rotationOffset += rotationAddition; // Update rotation
        for (var i = 1; i < 4; i++) {
            document.getElementsByClassName('movers')[i].style.transform = "rotate(" + rotationOffset.toString() + "deg)";
        }
    }
    else if (green > 0 && red === 255 && blue === 0) {
        green -= colorAddition; // Decrease green value
        rotationOffset += rotationAddition; // Update rotation
        for (var i = 2; i < 4; i++) {
            document.getElementsByClassName('movers')[i].style.transform = "rotate(" + rotationOffset.toString() + "deg)";
        }
    }
    else if (green === 0 && red === 255 && blue < 255) {
        blue += colorAddition; // Increase blue value
        rotationOffset += rotationAddition; // Update rotation
        for (var i = 3; i < 4; i++) {
            document.getElementsByClassName('movers')[i].style.transform = "rotate(" + rotationOffset.toString() + "deg)";
        }
    }
}

// Function to change the game level
function changeLevel(newLevel) {
    input.value = ""; // Clear input field
    // Reset animations and styles
    document.getElementById("q1").classList.add("q1c");
    document.getElementById("q2").classList.add("q2c");
    document.getElementById("q3").classList.add("q3c");
    document.getElementById("q4").classList.add("q4c");
    red = blue = 0; // Reset colors
    green = 255;
    rotationOffset = -90; // Reset rotation
    quaters.forEach(quater => {
        var c = "rgb(" + red.toString() + "," + green.toString() + "," + blue.toString() + ")";
        quater.style.borderLeftColor = c;
        quater.style.borderTopColor = c;
        quater.style.transform = "rotate(" + rotationOffset.toString() + "deg)";
    })
    level = newLevel; // Update level
    pointer = 0; // Reset pointer
    current = words[level][pointer]; // Update current word
    var final = ""; // HTML string for word list
    for(var i = 0; i < words[level].length; i++) {
        final += "<li>" + words[level][i] + "</li>"; // Add each word as a list item
    }
    document.getElementsByTagName("ul")[0].innerHTML = final; // Populate word list
    document.getElementById("word").innerHTML = current; // Display current word
    offset = orignamOffset; // Reset scrolling offset
    var currentScroll = document.getElementsByTagName("li")[pointer]; // Highlight current word
    currentScroll.style.fontSize = "19pt";
    currentScroll.style.fontWeight = "bold";
    currentScroll.style.color = "rgba(255, 255, 255, 0.7)";
    var setLevel = level===2?"Coding":level; // Display level name
    document.getElementById("message").innerHTML = "Level-" + level.toString();
    box.style.marginTop = offset.toString() + "px"; // Update scrolling position
}

// Function to update the score
function setScore() {
    score += countdown; // Add countdown value to score
    document.getElementById("score").innerHTML = score.toString(); // Update score display
}

// Function to update the high score
function setHighScore() {
    if (score > highscore) {
        highscore = score; // Update high score if current score is higher
        document.getElementById("highscore").innerHTML = highscore.toString(); // Update high score display
    }
    score = 0; // Reset current score
    document.getElementById("score").innerHTML = score.toString(); // Reset score display
}

// Function to decode HTML entities in a string
function decodeHtml(html) {
    var textArea = document.createElement("textarea"); // Create a textarea element
    textArea.innerHTML = html; // Set its innerHTML to the input string
	return textArea.value; // Return the decoded string
}

// Event handler for user input
input.oninput = function() {
    if (level === 0 && pointer === 0 && input.value.length === 1) {
        var timed = setInterval(clockHandler, 1000); // Start countdown timer
        function clockHandler() {
            if (countdown > 0) {
                countdown--; // Decrease countdown
                if (countdown === 0) {
                    document.getElementById("message").innerHTML = "Game Over"; // Display game over message
                    input.blur(); // Remove focus from input field
                    input.value = ""; // Clear input field
                    // Play the game-over sound
                    var gameOverSound = document.getElementById("gameOverSound");
                    gameOverSound.play();
                    setTimeout(() => {
                        clearInterval(timed);    // Stop the timer
                        changeLevel(0); // Reset to level 0
                        countdown = 4; // Reset countdown
                        setHighScore(); // Update high score
                        document.getElementById("secs").innerHTML = countdown; // Reset countdown display
                    }, 1000);
                }
            }
            document.getElementById("secs").innerHTML = countdown; // Update countdown display
        }
    }
    document.getElementsByClassName("bouncy")[0].classList.remove("bouncyIntro"); // Remove intro animation
    document.getElementsByClassName("bouncy")[0].style.opacity = "1"; // Set opacity
    document.getElementById("q1").classList.remove("q1c"); // Reset quarter styles
    document.getElementById("q2").classList.remove("q2c");
    document.getElementById("q3").classList.remove("q3c");
    document.getElementById("q4").classList.remove("q4c");
    document.getElementsByClassName("bouncy")[0].classList.remove("bounce"); // Reset bounce animation
    if (input.value === decodeHtml(words[level][pointer])) { // Check if input matches current word
        gunShotAudio.play(); // Play gunshot sound
        setColors(); // Update colors
        setScore(); // Update score
        if (level === 0 && pointer >=19 && pointer != 29)
            countdown = 3; // Adjust countdown for specific conditions
        else
            countdown = 4; // Reset countdown
        document.getElementById("secs").innerHTML = countdown; // Update countdown display
        if (blue === 255) { // Check if level is complete
            var n = level + 1; // Move to next level
            changeLevel(n);
        }
        else {
            pointer += 1; // Move to next word
            current = words[level][pointer]; // Update current word
            document.getElementById("word").innerHTML = current; // Display current word
            var currentScroll = document.getElementsByTagName("li")[pointer-1]; // Update previous word style
            currentScroll.style.fontSize = "13pt";
            currentScroll.style.fontWeight = "";
            currentScroll.style.color = "rgba(255, 255, 255, 0.2)";
            currentScroll = document.getElementsByTagName("li")[pointer]; // Highlight current word
            currentScroll.style.fontSize = "19pt";
            currentScroll.style.fontWeight = "bold";
            currentScroll.style.color = "rgba(255, 255, 255, 0.7)";
            document.getElementsByClassName("bouncy")[0].classList.add("bounce"); // Add bounce animation
            offset = offset - nextOffset; // Update scrolling offset
            quaters.forEach(quater => {
                var c = "rgb(" + red.toString() + "," + green.toString() + "," + blue.toString() + ")";
                quater.style.borderLeftColor = c; // Update quarter colors
                quater.style.borderTopColor = c;
            })
            box.style.marginTop = offset.toString() + "px"; // Update scrolling position
            input.value = ""; // Clear input field
        }   
    }
}
