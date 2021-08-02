const tick = new Audio('tick.wav');

// TODO: Create calculation history; Able to hide.
// TODO: Slider for lighter theme? (Like windows?) -> Color switch

// Number being inputted
stageNumber = (number) => {
    let stagedNumber = document.getElementById("number-stage").innerHTML;
    if (stagedNumber === "0" || stagedNumber === "Not a number") {
        document.getElementById("number-stage").innerHTML = number;
        document.getElementById("ac").innerHTML = "C";
    }
    else {
        document.getElementById("number-stage").innerHTML = stagedNumber+number;
    }
}

// Number being stored so next can be inputted
storeNumber = () => {
    let stagedNumber = document.getElementById("number-stage").innerHTML;
    if (stagedNumber === "Not a number") {
        tick.play();
    }
    else {
        document.getElementById("number-store").innerHTML = stagedNumber;
        document.getElementById("number-stage").innerHTML = "0";
    }
}

// AC / C button
allClear = () => {
    currentStagedNumber = document.getElementById("number-stage").innerHTML;
    currentStoredNumber = document.getElementById("number-store").innerHTML;
    if (currentStagedNumber === "0") {
        document.getElementById("number-store").innerHTML = "";
    }
    document.getElementById("number-stage").innerHTML = "0"; // Always clear stage
    document.getElementById("ac").innerHTML = "AC";
    console.log("Here")
}

evaluate = (first, second, operator) => {
    let result = 0;
    switch (operator) {
        case "/":
            if (Number(second) === 0) {
                result = "Not a number";
            }
            else {
                result = Number(first) / Number(second);
            }
            break;
        case "x":
            result = Number(first) * Number(second);
            break;
        case "-":
            result = Number(first) - Number(second);
            break;
        case "+":
            result = Number(first) + Number(second);
            break;
    }
    return result;
}

// Function to evaluate numbers based on 4 calculator states. 
operate = (operator) => {
    currentStoredNumber = document.getElementById("number-store").innerHTML;
    currentStagedNumber = document.getElementById("number-stage").innerHTML;
    if (currentStagedNumber === "Not a number") {
        tick.play();
        return;
    }
    if (currentStoredNumber === "" && currentStagedNumber !== "") { // Only first number staged, nothing stored yet, just add operator
        storeNumber();
        document.getElementById("number-store").innerHTML += " " + operator; // Space added before operator for format
    }
    else if (currentStoredNumber !== "" && (currentStagedNumber === "" || currentStagedNumber === "0")) { // First number stored, second number not staged, just change operator
        storedSplit = currentStoredNumber.split(" ");
        document.getElementById("number-store").innerHTML = storedSplit[0] + " " + operator;
        document.getElementById("number-stage").innerHTML = "0";
    }
    else if (currentStoredNumber !== "" && (currentStagedNumber !== "" || currentStagedNumber != "0")) { // First number stored, second number staged, evaluate, then apply operator again.
        first = currentStoredNumber.split(" ")[0];
        result = evaluate(first, currentStagedNumber, operator);
        document.getElementById("number-store").innerHTML = result + " " + operator;
        document.getElementById("number-stage").innerHTML = "0";
    }
    else { // No numbers stored.
        return;
    }
}

// = button
equals = () => {
    currentStoredOperation = document.getElementById("number-store").innerHTML.split(" ");
    first = currentStoredOperation[0];
    operator = currentStoredOperation[1];
    second = document.getElementById("number-stage").innerHTML;

    if (first === "") { // Nothing stored, keep stage same
        tick.play();
        return;
    }
    else {
        result = evaluate(first, second, operator);
        document.getElementById("number-stage").innerHTML = result;
        document.getElementById("number-store").innerHTML = "";
    }
}

// '.' button
addDecimal = () => {
    currentStagedNumber = document.getElementById("number-stage").innerHTML;
    if (!currentStagedNumber.includes(".")) {
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
    currentNumber = Number(document.getElementById("number-stage").innerHTML);
    document.getElementById("number-stage").innerHTML = currentNumber * .01;
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
