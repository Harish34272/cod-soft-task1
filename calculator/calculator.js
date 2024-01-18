var calculationHistory = [];
var currentOperationIndex = -1; 
function appendToDisplay(value) {
    var display = document.form.display;
    display.value += value;
    operation.innerText += value;
}

function evaluateExpression() {
    var display = document.form.display;
    var operationInput = document.getElementById('lastOperation');

    var operation = display.value;
    var result;

    try {
        result = eval(display.value);
        display.value = result;
    } catch (error) {
        try {
            var expression = display.value.replace(/sin\((.*?)\)/g, "Math.sin($1 * Math.PI/180)")
                .replace(/cos\((.*?)\)/g, "Math.cos($1 * Math.PI/180)")
                .replace(/tan\((.*?)\)/g, "Math.tan($1 * Math.PI/180)")
                .replace(/sec\((.*?)\)/g, "1/Math.cos($1 * Math.PI/180)")
                .replace(/cot\((.*?)\)/g, "1/Math.tan($1 * Math.PI/180)")
                .replace(/csc\((.*?)\)/g, "1/Math.sin($1 * Math.PI/180)")
                .replace(/sinh\((.*?)\)/g, "Math.sinh($1)")
                .replace(/cosh\((.*?)\)/g, "Math.cosh($1)")
                .replace(/tanh\((.*?)\)/g, "Math.tanh($1)")
                .replace(/asin\((.*?)\)/g, "Math.asin($1) * 180/Math.PI")
                .replace(/acos\((.*?)\)/g, "Math.acos($1) * 180/Math.PI")
                .replace(/atan\((.*?)\)/g, "Math.atan($1) * 180/Math.PI")
                .replace(/asec\((.*?)\)/g, "Math.acos(1/$1) * 180/Math.PI")
                .replace(/acot\((.*?)\)/g, "Math.atan(1/$1) * 180/Math.PI")
                .replace(/acsc\((.*?)\)/g, "Math.asin(1/$1) * 180/Math.PI")
                .replace(/asinh\((.*?)\)/g, "Math.asinh($1)")
                .replace(/acosh\((.*?)\)/g, "Math.acosh($1)")
                .replace(/atanh\((.*?)\)/g, "Math.atanh($1)")
                .replace(/log\((.*?)\)/g, "Math.log($1)")
                .replace(/ln\((.*?)\)/g, "Math.log($1)") 
                .replace(/exp\((.*?)\)/g, "Math.exp($1)")
                .replace(/log2\((.*?)\)/g, "Math.log2($1)")
                .replace(/C\((\d+),(\d+)\)/g, "calculateFactorial($1) / (calculateFactorial($2) * calculateFactorial($1 - $2))")
                .replace(/P\((\d+),(\d+)\)/g, "calculateFactorial($1) / calculateFactorial($1 - $2)")
                .replace(/(\d+)!/g, "calculateFactorial($1)")
                .replace(/\^/g, "**")
                .replace(/mod/g, "%")
                .replace(/sqrt\(/g, 'Math.sqrt(')
                .replace(/cbrt\(/g, 'Math.cbrt(')
                .replace(/e/g, "Math.E");

            result = eval(expression);
            var formattedResult = parseFloat(result).toFixed(5);
            display.value = formattedResult;
        } catch (error) {
            display.value = "Error";
        }
    }

    if (result !== undefined && !isNaN(result)) {
        var operationResult = operation + ' = ' + display.value;
        operationInput.value = operationResult;
        calculationHistory.push(operationResult);
    }
}


function showPreviousOperation(event, isNext) {
    event.preventDefault();

    var display = document.form.display;
    var operationInput = document.getElementById('lastOperation');

    if (isNext) {
        // Show the next operation
        if (currentOperationIndex < calculationHistory.length - 1) {
            currentOperationIndex++;
            var nextOperation = calculationHistory[currentOperationIndex];
            operationInput.value = nextOperation;
            display.value = nextOperation.split('=')[1].trim();
        }
    } else {
        // Show the previous operation
        if (currentOperationIndex > 0) {
            currentOperationIndex--;
            var prevOperation = calculationHistory[currentOperationIndex];
            operationInput.value = prevOperation;
            display.value = prevOperation.split('=')[1].trim();
        }
    }
}


function toggleDropdown(event) {
    event.preventDefault();

    var dropdown = document.getElementById('history');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    dropdown.innerHTML = calculationHistory.join('<br>');
}
function calculateFactorial(num) {
    if (num === 0 || num === 1) {
        return 1;
    } else {
        return num * calculateFactorial(num - 1);
    }
}
function clearDisplay() {
    var display = document.form.display;
    display.value = "";
    operation.innerText = "";
}
