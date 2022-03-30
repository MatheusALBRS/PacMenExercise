var list = [
  ["./images/PacMan1.png", "./images/PacMan2.png"],
  ["./images/PacMan3.png", "./images/PacMan4.png"],
];

var paclist = [];

function createButtons() {
  const factoryButton = document.createElement("button");
  const runButton = document.createElement("button");

  factoryButton.classList = "btn btn-outline-primary";
  factoryButton.id = "factoryButton";
  factoryButton.innerText = "Create Pacman";
  factoryButton.onclick = factoryAction;

  runButton.classList = "btn btn-primary active";
  runButton.id = "runButton";
  runButton.innerText = "Run";
  runButton.onclick = runAction;

  document.getElementById("factoryDiv").appendChild(factoryButton);
  document.getElementById("runDiv").appendChild(runButton);
}

const toggleClass = () => {
  if (document.getElementById("runButton").classList == "btn btn-primary active") {
    document.getElementById("runButton").classList = "btn btn-primary disabled";
  } else {
    document.getElementById("runButton").classList = "btn btn-primary active";
  }
};

const setToRandom = (scale) => {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
};

const makePac = () => {
  const pacman = document.createElement("img");
  const position = setToRandom(500);
  const velocity = setToRandom(10);

  pacman.src = list[0][0];
  pacman.classList = "pacman";
  pacman.style.left = position.x + "px";
  pacman.style.top = position.y + "px";
  document.getElementById("area").appendChild(pacman);
  return { pacman, position, velocity };
};

const factoryAction = () => {
  paclist.push(makePac());
};

const runAction = () => {
  toggleClass();
  createStopButton(setInterval(updatePosition, 20));
};

const checkPosition = (item) => {
  if (item.position.x + item.velocity.x + item.pacman.width > document.getElementById("area").offsetWidth || item.position.x + item.velocity.x < 0) {
    item.velocity.x = -item.velocity.x;
  }

  if (item.position.y + item.velocity.y + item.pacman.height > document.getElementById("area").offsetHeight || item.position.y + item.velocity.y < 0) {
    item.velocity.y = -item.velocity.y;
  }
};

const updatePosition = () => {
  paclist.forEach((item) => {
    checkPosition(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.pacman.style.left = item.position.x + "px";
    item.pacman.style.top = item.position.y + "px";
  });
};

const createStopButton = (func) => {
  const stopProgram = () => {
    clearInterval(f);
    document.getElementById("runButton").classList = "btn btn-primary active";
    document.getElementById("main").removeChild(stopDiv);
  };

  var f = func;
  const stopDiv = document.createElement("div");
  const main = document.getElementById("main");
  stopDiv.id = "stopDiv";
  main.appendChild(stopDiv);

  const stopButton = document.createElement("button");
  stopButton.classList = "btn btn-danger";
  stopButton.id = "stopButton";
  stopButton.innerText = "Stop";
  stopButton.onclick = stopProgram;
  stopDiv.appendChild(stopButton);
};
