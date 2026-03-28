const mathDisplay = document.querySelector(".math-display");

const objMath = {
   firstNumber: '',
   operator: '',
   secondNumber: '',
   calculated: false
}

function calculate() {
   const {firstNumber, operator, secondNumber} = objMath;
   if (!isEmpty(firstNumber) && !isEmpty(operator) && !isEmpty(secondNumber)) {
      let sumResult;
      let firstFloat = parseFloat(firstNumber);
      let secondFloat = parseFloat(secondNumber);

      switch (operator) {
         case "+":
            sumResult = firstFloat + secondFloat;
            break;
         case "-":
            sumResult = firstFloat - secondFloat;
            break;
         case "×":
            sumResult = firstFloat * secondFloat;
            break;
         case "÷":
            sumResult = firstFloat / secondFloat;
            break;
      }
      if (sumResult === Infinity) {
         objMath.firstNumber = "ERROR";
      } else {
         objMath.firstNumber = parseFloat(sumResult.toFixed(7)).toString();
      }
      objMath.operator = '';
      objMath.secondNumber = '';
      objMath.calculated = true;
      updateDisplay();
   }
}

function updateDisplay(){
   const result = Object.entries(objMath).filter(([key]) => key !== "calculated").map(([key, value]) => `${value}`).join("");
   mathDisplay.value = isEmpty(result) ? '0' : result;
}

function inputNumber(value) {
   const {firstNumber, operator, calculated} = objMath;
   if (calculated) {
      objMath.firstNumber = value;
      objMath.calculated = false;
   } else {
      if (isEmpty(firstNumber)) {
         objMath.firstNumber = value;
      } else if (!isEmpty(firstNumber) && isEmpty(operator)) {
         objMath.firstNumber += value;
      } else {
         objMath.secondNumber += value;
      }0
   }
   updateDisplay();
}

function inputOperator(value) {
   const {firstNumber, operator, secondNumber, calculated} = objMath;
   if (!calculated) {
      if (firstNumber === 'ERROR') {
         return;
      } else if (isEmpty(firstNumber)) {
         if (value === "-") {
            objMath.firstNumber = "-";
         } else {
            return;
         }
      } else if (isEmpty(operator)) {
         if (firstNumber !== "-") objMath.operator = value;
      } else {
         if (!isEmpty(secondNumber)) {
            calculate();
         } else {
            objMath.operator = value;
         }
      }
   }
   updateDisplay();
}

function inputDecimal(value) {
   if (objMath.calculated) clearAll();
   const {firstNumber, operator, secondNumber, calculated} = objMath;
   if (isEmpty(calculated)) {
      if (isEmpty(operator)) {
         if (isEmpty(firstNumber)) {
            objMath.firstNumber += "0.";
         } else {
            if (firstNumber.includes(".")){
               return;
            } else { 
               objMath.firstNumber += ".";
            }
         }
      } else {
         if (isEmpty(secondNumber)) {
            objMath.secondNumber += "0.";
         } else {
            if (secondNumber.includes(".")) {
               return;
            } else {
               objMath.secondNumber += ".";
            }
         }
      }
   }
   updateDisplay();
}

function backSpace(){
   if (objMath.calculated) clearAll();
   const {firstNumber, operator, secondNumber, calculated} = objMath;
   if (!calculated) {
      if(!isEmpty(secondNumber)) {
         objMath.secondNumber = secondNumber.slice(0, -1);
      } else if (!isEmpty(operator)) {
         objMath.operator = '';
      } else if (!isEmpty(firstNumber)){
         objMath.firstNumber = firstNumber.slice(0, -1);
      }
      updateDisplay();
   }
}

function clearAll() {
   objMath.firstNumber = '';
   objMath.operator = '';
   objMath.secondNumber = '';
   objMath.calculated = false;
   mathDisplay.value = 0;
}

document.querySelector('.calculator-buttons').addEventListener('click', (event) => {
   const {target} = event;

   if (!target.matches('button')) {
      return;
   }

   if (target.classList.contains('operator')) {
      inputOperator(target.value);
      return;
   }

   if (target.classList.contains('number')) {
      inputNumber(target.value);
      return;
   }

   if (target.classList.contains('decimal')) {
      inputDecimal(target.value);
      return;
   }
   

   if (target.classList.contains('backspace')) {
      backSpace();
      return;
   }

   if (target.classList.contains('equal')) {
      calculate();
      return;
   }

   if (target.classList.contains('clear-all')) {
      clearAll();
      return;
   }
});

document.addEventListener("keydown", function(event) {
   const key = event.key;

   if (!isNaN(key)) {
      inputNumber(key);
   } else if (["+", "-", "*", "/"].includes(key)) {
      let operator;
      if (key === "*") {
         operator = "×";
      } else if ( key === "/5.2/") {
         operator = "÷"
      } else {
         operator = key;
      }
      inputOperator(operator);
   } else if (key === ".") {
      inputDecimal();
   } else if (key === "Enter" || key === "=") {
      calculate();
   } else if (key === "Backspace") {
      backSpace();
   } else if (key === "Escape") {
      clearAll();
   }
});

function isEmpty(value) {
  return (
    value === null ||
    value === undefined ||
    value === "" ||
    value === false
  )
}