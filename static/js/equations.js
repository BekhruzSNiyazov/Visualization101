let visualizationDiv = document.getElementById("visualization");
let calculatorDiv = document.getElementById("calculator");
let equation = document.getElementById("equation");
let xa = document.getElementById("xa");
let ya = document.getElementById("ya");
let xb = document.getElementById("xb");
let yb = document.getElementById("yb");

let visualizationDisplay = false;
let calculatorDisplay = false;

setupVisualization();
let vis = Desmos.GraphingCalculator(visualizationDiv);
vis.setExpression({ id: "graph1", latex: "y=x^2" });

function visualization() {
    setupVisualization();
}

function calculator() {
    setupCalculator();
}

function setupVisualization() {
    if (!visualizationDisplay) {
        visualizationDiv.style.display = "block";
        calculatorDiv.style.display = "none";
        visualizationDisplay = true;
        calculatorDisplay = false;
    }
}

function setupCalculator() {
    if (!calculatorDisplay) {
        calculatorDiv.style.display = "block";
        visualizationDiv.style.display = "none";
        calculatorDisplay = true;
        visualizationDisplay = false;
    }
}

function calculate() {
    if (!xa.value || !xb.value || !ya.value || !yb.value) {
        alert("You must fill in all input fields!");
    } else {
        // y = mx + b
        let by = parseInt(yb.value);
        let ay = parseInt(ya.value);
        let bx = parseInt(xb.value);
        let ax = parseInt(xa.value);
        let slope = (by - ay) / (bx - ax);
        let b = ay - slope * ax;
        equation.innerText = `y = ${slope}x + ${b}`;
    }
}
