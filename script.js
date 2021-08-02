const tick = new Audio('tick.wav');

// TODO: Create calculation history; Able to hide.
// TODO: Slider for lighter theme? (Like windows?) -> Color switch

stageNumber = (number) => {
    let currentValue = document.getElementById("number-stage").innerHTML;
    if (currentValue === "0") {
        document.getElementById("number-stage").innerHTML = number;
    }
    else {
        document.getElementById("number-stage").innerHTML = currentValue+number;
    }
}

allClear = () => {
    document.getElementById("number-stage").innerHTML = 0;
    document.getElementById("number-store").innerHTML = "";
}

storeNumber = () => {
    let stagedNumber = document.getElementById("number-stage").innerHTML;
    document.getElementById("number-store").innerHTML = stagedNumber;
    document.getElementById("number-stage").innerHTML = "0";
}

evaluate = (first, second, operator) => {
    let result = 0;
    switch (operator) {
        case "/":
            result = Number(first) / Number(second);
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
    if (currentStoredNumber === "" && currentStagedNumber !== "") { // Only first number staged, nothing stored yet, just add operator
        storeNumber();
        document.getElementById("number-store").innerHTML += " " + operator; // Space added before operator for format
    }
    else if (currentStoredNumber !== "" && currentStagedNumber === "") { // First number stored, second number not staged, just change operator
        storedSplit = currentStoredNumber.split(" ");
        document.getElementById("number-store").innerHTML = storedSplit[0] + " " + operator;
        document.getElementById("number-stage").innerHTML = "0";
    }
    else if (currentStoredNumber !== "" && currentStagedNumber !== "") { // First number stored, second number staged, evaluate, then apply operator again.
        first = currentStoredNumber.split(" ")[0];
        result = evaluate(first, currentStagedNumber, operator);
        document.getElementById("number-store").innerHTML = result + " " + operator;
        document.getElementById("number-stage").innerHTML = "0";
    }
    else { // No numbers stored.
        return;
    }
}

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

addDecimal = () => {
    currentStagedNumber = document.getElementById("number-stage").innerHTML;
    if (!currentStagedNumber.includes(".")) {
        document.getElementById("number-stage").innerHTML += ".";
    } 
    else {
        tick.play();
    }
}

flipSign = () => {
    document.getElementById("number-stage").innerHTML *= -1;
}

percentage = () => {
    currentNumber = Number(document.getElementById("number-stage").innerHTML);
    document.getElementById("number-stage").innerHTML = currentNumber * .01;
}

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
