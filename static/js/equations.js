/*
* Back end for equations.html
* Handles:
*   - switching between tools
*   - linear equation calculator
 */

let visualizationDiv = document.getElementById("visualization");
let calculatorDiv = document.getElementById("calculator");
let equation = document.getElementById("equation");
let xa = document.getElementById("xa");
let ya = document.getElementById("ya");
let xb = document.getElementById("xb");
let yb = document.getElementById("yb");

let visualizationDisplay = false;
let calculatorDisplay = false;

let vis = Desmos.GraphingCalculator(visualizationDiv);
setupVisualization("2\\cos\\left(2x\\right)", null);

function visualization() {
    setupVisualization("2\\cos\\left(2x\\right)", null);
}

function calculator() {
    setupCalculator();
}

function setupVisualization(latex, points) {
    vis.setBlank();
    vis.setExpression({ id: "graph1", latex: latex });
    if (points) {
        vis.setExpression({
            type: "table",
            columns: [
                {
                    latex: "x",
                    values: [points[0][0], points[1][0]]
                },
                {
                    latex: "y",
                    values: [points[0][1], points[1][1]],
                },
            ]
        });
    }

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
        let by = parseInt(eval(yb.value));
        let ay = parseInt(eval(ya.value));
        let bx = parseInt(eval(xb.value));
        let ax = parseInt(eval(xa.value));
        let slope = (by - ay) / (bx - ax);
        if (!isInt((by - ay) / (bx - ax))) {
            slope = reduce((by - ay), (bx - ax));
            slope = `${slope[0]} / ${slope[1]}`;
        }
        let s = reduce((by - ay), (bx - ax));
        let r = reduce(s[0], s[1])
        let b = ay - ax * r[0] / r[1];
        let b_display = b;
        if (!isInt(b)) {
            b_display = reduce(ax * r[0], r[1])
            if (b_display[1] < 0)
                b_display = ay + " + " + b_display[0] + " / " + -b_display[1];
            else
                b_display = ay + " - " + b_display[0] + " / " + b_display[1];
        }
        if (b > 0)
            equation.innerText = `y = ${simplify(slope)}x + ${b_display}`;
        else if (b < 0)
            equation.innerText = `y = ${simplify(slope)}x - ${b_display}`;
        else
            equation.innerText = `y = ${simplify(slope)}x`;
    }
}

function view() {
    setupVisualization(equation.innerText, [[eval(xa.value), eval(ya.value)], [eval(xb.value), eval(yb.value)]]);
}

function simplify(slope) {
    if (slope === 1)
        return "";
    else if (slope === -1)
        return "-";
    else
        return slope;
}

function reduce(numerator,denominator) {
    let gcd = function gcd(a, b) {
        return b ? gcd(b, a % b) : a;
    };
    gcd = gcd(numerator,denominator);
    return [numerator/gcd, denominator/gcd];
}

function isInt(number) {
    return parseInt(number) === number;
}
