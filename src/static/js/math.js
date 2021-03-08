let expr = document.getElementById('expr');
let pretty = document.getElementById('pretty');
let result = document.getElementById('result');
let eq = document.getElementById("eq");
let parenthesis = 'keep'
let implicit = 'hide'

let mj = function (tex) {
    return MathJax.tex2svg(tex, { em: 16, ex: 6, display: false });
}

// initialize with an example expression
expr.value = "sqrt(75 / 3) + det([[-1, 2], [3, 1]]) - sin(pi / 4)^2";
pretty.innerHTML = "";
pretty.appendChild(mj(math.parse(expr.value).toTex({ parenthesis: parenthesis })));
result.innerHTML = math.format(math.evaluate(expr.value))

expr.oninput = function () {
    let node = null

    try {
        // parse the expression
        node = math.parse(expr.value)

        // evaluate the result of the expression
        result.innerHTML = math.format(node.compile().evaluate())
        eq.innerHTML = " = ";
    }
    catch (err) {
        result.innerHTML = "";
        eq.innerHTML = "";
    }

    try {
        // export the expression to LaTeX
        const latex = node ? node.toTex({ parenthesis: parenthesis, implicit: implicit }) : ""
        console.log("LaTeX expression:", latex)

        // display and re-render the expression
        MathJax.typesetClear();
        pretty.innerHTML = "";
        pretty.appendChild(mj(latex));
    }
    catch (err) { }
}