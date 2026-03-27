const mathDisplay = document.querySelector(".math-display");

const objMath = {
   firstNumber: '',
   operator: '',
   secondNumber: ''
}

function calculate() {
   const {firstNumber, operator, secondNumber} = objMath;
   if (firstNumber !== '' && operator !== '' && secondNumber !== '') {
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
      objMath.firstNumber = sumResult;
      objMath.operator = '';
      objMath.secondNumber = '';
      updateDisplay();
   }
}

function updateDisplay(){
   const result = Object.values(objMath).join("");
   mathDisplay.value = result;
}

function inputNumber(value) {
   if (objMath.firstNumber === '') {
      objMath.firstNumber = value;
   } else if (objMath.firstNumber !== '' && objMath.operator === '') {
      objMath.firstNumber += value;
   } else {
      objMath.secondNumber += value;
   }
   updateDisplay();
}

function inputOperator(value) {
   objMath.operator = value;
   updateDisplay();
}

function inputDecimal(value) {
   if (objMath.operator === '') {
      if (objMath.firstNumber === '') {
         objMath.firstNumber += "0.";
      } else {
         objMath.firstNumber += ".";
      }
   } else {
      objMath.secondNumber += ".";
   }
   updateDisplay();
}

function clearAll() {
   objMath.firstNumber = '';
   objMath.operator = '';
   objMath.secondNumber = '';
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

   if (target.classList.contains('equal')) {
      calculate();
      return;
   }

   if (target.classList.contains('clear-all')) {
      clearAll();
      return;
   }
});