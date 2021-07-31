stageNumber = (number) => {
    let currentValue = document.getElementById("number-stage").innerHTML;
    document.getElementById("number-stage").innerHTML = currentValue+number;
}

allClear = () => {
    document.getElementById("number-stage").innerHTML = "";
    document.getElementById("number-store").innerHTML = "";
}

storeNumber = () => {
    let stagedNumber = document.getElementById("number-stage").innerHTML;
    document.getElementById("number-store").innerHTML = stagedNumber;
    document.getElementById("number-stage").innerHTML = "";
}

evaluate = (first, second, operator) => {
    let result = 0;
    switch (operator) {
        case "/":
            result = first / second;
            break;
        case "x":
            result = first * second;
            break;
        case "-":
            result = first - second;
            break;
        case "+":
            result = first + second;
            break;
    }
    return result;
}

// 2 Cases for Operands to Handle
// 1) No number in store yet on operand click
// 2) Number in store and stage


operate = (operator) => {
    currentStoredNumber = document.getElementById("number-store").innerHTML;
    currentStagedNumber = document.getElementById("number-stage").innerHTML;
    if (currentStoredNumber === "" && currentStagedNumber !== "") { // Only first number inputted, nothing stored yet, just add operator
        storeNumber();
        document.getElementById("number-store").innerHTML += " " + operator;
    }
    else if (currentStoredNumber !== "" && currentStagedNumber === "") { // First number stored, second number not staged, just change operator
        storedSplit = currentStoredNumber.split(" ");
        document.getElementById("number-store").innerHTML = storedSplit[0] + " " + operator;
    }
    else if (currentStoredNumber !== "" && currentStagedNumber !== "") { // First number stored, second number staged, evaluate, then apply operator again.
        first = currentStoredNumber.split(" ")[0];
        result = evaluate(first, currentStagedNumber, operator);
        document.getElementById("number-store").innerHTML = result + " " + operator;
        document.getElementById("number-stage").innerHTML = "";
    }
    else {
        console.log("Nothing to operate on");
    }
}

equals = () => {
    currentStoredNumber = document.getElementById("number-store").innerHTML.split(" ");
    first = currentStoredNumber[0];
    operator = currentStoredNumber[1];
    second = document.getElementById("number-stage").innerHTML;
    
    result = evaluate(first, second, operator);
    document.getElementById("number-stage").innerHTML = result;
    document.getElementById("number-store").innerHTML = "";
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