// defining the variables
let tab = "&emsp;".repeat(3);
let newLine = "<br>";
let output;
let code;
let outputCode;

function generate() {
    // getting the div in which the output will be stored
    output = document.getElementById("output");
    // clearing the output
    output.innerHTML = "";
    outputCode = "";
    output.style.padding = "0";
    output.style.overflow = "visible";
    // getting the user's input
    code = document.getElementById("code").value;

    // splitting the code into lines
    let lines = code.split("\n");

    // defining variables
    let line;
    let pattern;
    let exec;
    let varname;
    let level;

    // iterating through lines
    for (let i = 0, len = lines.length; i < len; i++) {
        // storing the current line in a line variable
        line = lines[i];

        // if "if" is in line
        if (line.includes("if")) {
            line = line.replaceAll("==", "is").slice(0, -1);
            outputCode += line;
            outputCode += newLine;
        } else if (line.includes("for")) {
            level = line.split("    ").length-1 + line.split("\t").length-1;
            outputCode += tab.repeat(level) + "repeat ";

            // if "range" is in line
            if (line.includes("range")) {
                pattern = new RegExp(/for\s+([\w\d_-]*)\s+in\s+range/);
                exec = pattern.exec(line);
                varname = exec[1];
                pattern = new RegExp(/range\s*\(\s*([\d\w_-]+)\s*\)/);
                exec = pattern.exec(line)
                // if the string matches the regular expression
                if (exec) {
                    outputCode += exec[1] + " times, variable: " + varname;
                    outputCode += newLine;
                } else {
                    pattern = new RegExp(/range\s*\(\s*([\d\w_-]+)\s*,\s*([\d\w_-]+)\s*\)/);
                    exec = pattern.exec(line);
                    if (exec) {
                        outputCode += "from " + exec[1] + " to " + exec[2] + ", variable: " + varname;
                        outputCode += newLine;
                    } else {
                        pattern = new RegExp(/range\s*\(\s*([\d\w_-]+)\s*,\s*([\d\w_-]+)\s*,\s*([\d\w_-]+)\s*\)/);
                        exec = pattern.exec(line);
                        if (exec) {
                            outputCode += "from " + exec[1] + " to " + exec[2] + ", adding " + exec[3] +
                                " each time" + ", variable: " + varname;
                            outputCode += newLine;
                        }
                    }
                }
            } else {
                outputCode += "for each element in a list ";
                pattern = new RegExp(/for\s+([\w\W]+)\s+in\s+([\w\W]+)\s*:/);
                exec = pattern.exec(line);
                if (exec) {
                    outputCode += exec[2];
                    outputCode += ", element: " + exec[1];
                    outputCode += newLine;
                }
            }
        } else if (line.includes("while")) {
            line = line.replaceAll("==", "is").slice(0, -1);
            if (line.trim() === "while True:" || line.trim() === "while 1:") {
                alert("here");
                line = "forever";
            }
            outputCode += line;
            outputCode += newLine;
        }
        else {
            outputCode += line.replaceAll("\t", tab).replaceAll("    ", tab);
            outputCode += newLine;
        }
    }

    if (outputCode !== "") {
        // changing the padding of the output div
        output.style.padding = "1%";
        // changing the overflow behaviour
        output.style.overflow = "scroll";
        // showing the output to the user
        output.innerHTML = outputCode;
    }
}