const tick = new Audio('tick.wav');

// TODO: Create calculation history; Able to hide.
// TODO: Slider for lighter theme? (Like windows?) -> Color switch

// Number being inputted
stageNumber = (number) => {
    let staged = document.getElementById("number-stage").innerHTML;
    if (staged === "0" || staged === "Not a number") {
        document.getElementById("number-stage").innerHTML = number;
        document.getElementById("ac").innerHTML = "C";
    }
    else {
        document.getElementById("number-stage").innerHTML = staged+number;
    }
}

// Number being stored so next can be inputted
storeNumber = () => {
    let staged = document.getElementById("number-stage").innerHTML;
    if (staged === "Not a number") {
        tick.play();
    }
    else {
        document.getElementById("number-store").innerHTML = staged;
        document.getElementById("number-stage").innerHTML = "0";
    }
}

// AC / C button
allClear = () => {
    staged = document.getElementById("number-stage").innerHTML;
    stored = document.getElementById("number-store").innerHTML;
    if (staged === "0") {
        document.getElementById("number-store").innerHTML = "";
    }
    document.getElementById("number-stage").innerHTML = "0"; // Always clear stage
    document.getElementById("ac").innerHTML = "AC";
}

evaluate = (stored, staged, operator) => {
    let result = 0;
    switch (operator) {
        case "/":
            if (Number(staged) === 0) {
                result = "Not a number";
            }
            else {
                result = Number(stored) / Number(staged);
            }
            break;
        case "x":
            result = Number(stored) * Number(staged);
            break;
        case "-":
            result = Number(stored) - Number(staged);
            break;
        case "+":
            result = Number(stored) + Number(staged);
            break;
    }
    return result;
}

// Function to evaluate numbers based on 4 calculator states. 
operate = (operator) => {
    stored = document.getElementById("number-store").innerHTML;
    staged = document.getElementById("number-stage").innerHTML;
    if (staged === "Not a number") {
        tick.play();
        return;
    }
    if (stored === "" && staged !== "") { // Only first number staged, nothing stored yet, just add operator
        storeNumber();
        document.getElementById("number-store").innerHTML += " " + operator; // Space added before operator for format
    }
    else if (stored !== "" && (staged === "0")) { // First number stored, second number not staged, just change operator
        storedSplit = stored.split(" ");
        document.getElementById("number-store").innerHTML = storedSplit[0] + " " + operator;
        document.getElementById("number-stage").innerHTML = "0";
    }
    else if (stored !== "" && (staged != "0")) { // First number stored, second number staged, evaluate, then store new operator.
        storedSplit = stored.split(" ");
        storedOperator = storedSplit[1];
        storedNumber = storedSplit[0];
        result = evaluate(storedNumber, staged, storedOperator);
        document.getElementById("number-store").innerHTML = result + " " + operator;
        document.getElementById("number-stage").innerHTML = "0";
    }
    else { // No numbers stored.
        return;
    }
}

// = button
equals = () => {
    stored = document.getElementById("number-store").innerHTML.split(" ");
    storedNumber = stored[0];
    operator = stored[1];
    staged = document.getElementById("number-stage").innerHTML;

    if (storedNumber === "") { // Nothing stored, keep stage same
        tick.play();
        return;
    }
    else {
        result = evaluate(storedNumber, staged, operator);
        document.getElementById("number-stage").innerHTML = result;
        document.getElementById("number-store").innerHTML = "";
    }
}

// '.' button
addDecimal = () => {
    staged = document.getElementById("number-stage").innerHTML;
    if (!staged.includes(".")) {
        document.getElementById("number-stage").innerHTML += ".";
    } 
    else {
        tick.play();
    }
}

// +/- button
flipSign = () => {
    document.getElementById("number-stage").innerHTML *= -1;
}

// % button
percentage = () => {
    staged = Number(document.getElementById("number-stage").innerHTML);
    document.getElementById("number-stage").innerHTML = staged * .01;
}

// Main operator buttons
document.getElementById("division").onclick = () => {
    operate("/");
};
document.getElementById("multiply").onclick = () => {
    operate("x");
}
document.getElementById("subtract").onclick = () => {
    operate("-");
}
document.getElementById("add").onclick = () => {
    operate("+");
}
document.getElementById("decimal").onclick = () => {
    addDecimal();
}
