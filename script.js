



stageNumber = (number) => {
    let currentValue = document.getElementById("number-stage").innerHTML;
    document.getElementById("number-stage").innerHTML = currentValue+number;
    console.log(currentValue+number);
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
        case " /":
            result = first / second;
            break;
    }
    return result;
}

// 2 Cases for Operands to Handle
// 1) No number in store yet on operand click
// 2) Number in store and stage


divide = () => {
    currentStoredNumber = document.getElementById("number-store").innerHTML;
    currentStagedNumber = document.getElementById("number-stage").innerHTML;
    if (currentStoredNumber === "" && currentStagedNumber !== "") { // Only first number inputted, nothing stored yet
        storeNumber();
        document.getElementById("number-store").innerHTML += " /";
    }
    else if (currentStoredNumber !== "" && currentStagedNumber === "") { // First number stored, second number not staged, just change operand
        storedSplit = currentStoredNumber.split(" ");
        document.getElementById("number-store").innerHTML = storedSplit + " /";
    }
    else if (currentStoredNumber !== "" && currentStagedNumber !== "") { // First number stored, second number staged, evaluate, then apply operand again.
        first = currentStoredNumber.split(" ")[0];
        result = evaluate(first, currentStagedNumber, " /");
        document.getElementById("number-store").innerHTML = result + " /";
        document.getElementById("number-stage").innerHTML = "";
    }
    else {
        console.log("Nothing to divide");
    }
}

equals = () => {
    currentStoredNumber = document.getElementById("number-store").innerHTML.split(" ");
    first = currentStoredNumber[0];
    operator = currentStoredNumber[1];
    second = document.getElementById("number-stage").innerHTML;
    
    result = evaluate(first, second, " " + operator);
    document.getElementById("number-stage").innerHTML = result;
    document.getElementById("number-store").innerHTML = "";
}