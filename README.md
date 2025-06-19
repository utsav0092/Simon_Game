# Simon Says Game

A simple web-based **Simon Says** memory game. Test your memory by repeating the color sequence as it grows with each level.

---

## How to Play

1. **Start the Game**  
   Click the **Start Game** button to begin.

2. **Watch the Sequence**  
   The game will flash a sequence of colored buttons.  
   Remember the order!

3. **Repeat the Sequence**  
   Click the colored buttons in the same order.  
   Each level adds a new color to the sequence.

4. **Game Over**  
   If you make a mistake, the game ends and shows your score.  
   Click **Start Game** to try again.

5. **Reset**  
   Click **Reset Game** to restart at any time.

---

## Files

- `gameindex.html` – Main HTML file  
- `gamestyle.css` – Styles for the game  
- `gamescript.js` – Game logic  
- `logo.png` – Game icon

---

## Preview

![Simon Says Game Screenshot](logo.png)

---

## How to Create This Project

### Step 1: Set Up the Project Folder

Create a new directory:

```bash
mkdir simon-says-game
cd simon-says-game
```

### Step 2: Create `gameindex.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Simon Says Game</title>
    <link rel="stylesheet" href="gamestyle.css">
</head>
<body>
    <h1>Simon Says</h1>
    <div id="game-container">
        <div class="btn red" id="red"></div>
        <div class="btn green" id="green"></div>
        <div class="btn blue" id="blue"></div>
        <div class="btn yellow" id="yellow"></div>
    </div>
    <h2 id="level-title">Level 0</h2>
    <button id="start-btn">Start Game</button>
    <button id="reset-btn">Reset Game</button>

    <script src="gamescript.js"></script>
</body>
</html>
```

### Step 3: Create `gamestyle.css`

```css
body {
    text-align: center;
    background-color: #f0f8ff;
    font-family: Arial, sans-serif;
}
h1 {
    color: #4CAF50;
}
.btn {
    width: 100px;
    height: 100px;
    display: inline-block;
    margin: 10px;
    border-radius: 15px;
    cursor: pointer;
}
.red { background-color: red; }
.green { background-color: green; }
.blue { background-color: blue; }
.yellow { background-color: yellow; }
button {
    margin: 15px;
    padding: 10px 20px;
}
```

### Step 4: Create `gamescript.js`

```javascript
let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

document.getElementById("start-btn").addEventListener("click", startGame);
document.getElementById("reset-btn").addEventListener("click", resetGame);

function startGame() {
    if (!started) {
        nextSequence();
        started = true;
    }
}

function resetGame() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    document.getElementById("level-title").textContent = "Level 0";
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    document.getElementById("level-title").textContent = "Level " + level;
    let randomColor = buttonColors[Math.floor(Math.random() * 4)];
    gamePattern.push(randomColor);
    flashButton(randomColor);
}

function flashButton(color) {
    let btn = document.getElementById(color);
    btn.style.opacity = 0.3;
    setTimeout(() => btn.style.opacity = 1, 200);
}

document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", function () {
        let userColor = this.id;
        userClickedPattern.push(userColor);
        flashButton(userColor);
        checkAnswer(userClickedPattern.length - 1);
    });
});

function checkAnswer(currentIndex) {
    if (userClickedPattern[currentIndex] === gamePattern[currentIndex]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        document.getElementById("level-title").textContent = "Game Over! Score: " + (level - 1);
        started = false;
    }
}
```

### Step 5: Add `logo.png`

Place an image named `logo.png` in the same directory as your HTML file. This will serve as the visual preview in the README.

### Step 6: Run the Game

Open `gameindex.html` in your browser to play the game.

---

Feel free to customize the styles or add sound effects to enhance the experience.
