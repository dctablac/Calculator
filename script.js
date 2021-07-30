
stageNumber = (number) => {
    let currentValue = document.getElementById("number-stage").innerHTML;
    document.getElementById("number-stage").innerHTML = currentValue+number;
    console.log(currentValue+number);
}

allClear = () => {
    document.getElementById("number-stage").innerHTML = "";
}