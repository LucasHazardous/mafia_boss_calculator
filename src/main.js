const { invoke } = window.__TAURI__.tauri;

let equationInput;
let buttonHolder;
let lastSign = false;

async function compute() {
  equationInput.value = await invoke("compute", { equation: equationInput.value });
}

const grid = [
  '1', '2', '3',
  '4', '5', '6',
  '7', '8', '9',
  '0', '.', '+',
  '-', '*', '/', 
  '^', '(', ')', 
  '←', 'C', '='
];

const specialActions = {
  'C': () => {
    lastSign = false;
    equationInput.value = "";
  },
  '=': () => {
    compute(equationInput.value);
  },
  '←': () => {
    equationInput.value = equationInput.value.substring(0, 
      equationInput.value.length-2) + " ";
  }
};

function updateEquation(input) {
  if(equationInput.value == 'Invalid') {
    specialActions['C']();
  }

  const isCurrentSign = /^[\d\.]$/.test(input);

  if(lastSign && isCurrentSign) {
    equationInput.value = equationInput.value.substring(0, 
      equationInput.value.length-1);
  }
  
  equationInput.value += input + " ";
  
  lastSign = isCurrentSign;  
}

window.addEventListener("DOMContentLoaded", () => {
  buttonHolder = document.querySelector("#button-holder");
  equationInput = document.querySelector("#equation-input");

  grid.forEach(element => {
    const elementNode = document.createElement("button");
    elementNode.innerText = element;

    if(specialActions[element] != undefined) {
      elementNode.addEventListener("click", specialActions[element]);
    } else {
      elementNode.addEventListener("click", () => {
        updateEquation(element);
      });
    }

    buttonHolder.appendChild(elementNode);
  });

  document.addEventListener("keydown", (e) => {
    const action = e.key.toLocaleLowerCase();
    if(action == 'enter') {
      specialActions['=']();
    }
  });
});
