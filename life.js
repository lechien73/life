function createArray(dimensions) {
    let mainArray = []

    for(let i = 0; i < dimensions; i++) {
        mainArray.push([]);
    }
    return mainArray;
}

function initialiseArray(gameArray) {
    counter = gameArray.length;
    for(let o = 0; o < counter; o++) {
        for(let i = 0; i < counter; i++) {
            rndValue = Math.floor(Math.random() * 2);
            gameArray[o].push(rndValue);
        }
    }
    return gameArray;
}

function drawGrid(gameArray) {
    let c = document.getElementById("lifeCanvas");
    let ctx = c.getContext("2d");

    ctx.clearRect(0, 0, 400, 400)

    counter = gameArray.length;

    for(let o = 0; o < counter; o++) {
        for(let i = 0; i < counter; i++) {
            if(gameArray[o][i] == 1) {
                ctx.fillStyle = "#FF0000";
                ctx.fillRect(o, i, 1, 1);
            }
        }
    }
}

function oneCycle() {
    cycleCounter++;
    counter = gameArray.length - 1;
    mirrorArray = createArray(400);
    for(let o = 1; o < counter; o++) {
        for(let i = 1; i < counter; i++) {
            let cellsCount = 0;

            document.getElementById("generation").textContent = "Generation: " + cycleCounter;

            cellsCount += gameArray[o][i+1];
            cellsCount += gameArray[o][i-1];
            cellsCount += gameArray[o-1][i];
            cellsCount += gameArray[o-1][i+1];
            cellsCount += gameArray[o-1][i-1];
            cellsCount += gameArray[o+1][i];
            cellsCount += gameArray[o+1][i+1];
            cellsCount += gameArray[o+1][i-1];

            if(cellsCount == 3) {
                mirrorArray[o][i] = 1;
            } else if(cellsCount == 2) {
                mirrorArray[o][i] = gameArray[o][i];
            } else {
                mirrorArray[o][i] = 0;
            }
        }
    }
    gameArray = mirrorArray;
    drawGrid(gameArray)
}

function startGame() {
    gameInterval = setInterval(oneCycle, 100);
}

function stopGame() {
    clearInterval(gameInterval);
}

function resetGame() {
    let blankArray = createArray(400);
    gameArray = initialiseArray(blankArray);
    cycleCounter = 0;

    drawGrid(gameArray);
}
let gameArray;
let gameInterval;
let cycleCounter;
resetGame();