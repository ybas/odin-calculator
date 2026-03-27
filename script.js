const mathDisplay = document.querySelector(".math-display");

const objMath = {
   firstNumber: '',
   operator: '',
   secondNumber: '',
   calculated: false
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
      if (sumResult === Infinity) {
         objMath.firstNumber = "ERROR";
      } else {
         objMath.firstNumber = sumResult;
      }
      objMath.operator = '';
      objMath.secondNumber = '';
      objMath.calculated = true;
      updateDisplay();
   }
}

function updateDisplay(){
   const result = Object.entries(objMath).filter(([key]) => key !== "calculated").map(([key, value]) => `${value}`).join("");
   mathDisplay.value = result;
}

function inputNumber(value) {
   const {firstNumber, operator, calculated} = objMath;
   if (calculated) {
      objMath.firstNumber = value;
      objMath.calculated = false;
   } else {
      if (firstNumber === '') {
         objMath.firstNumber = value;
      } else if (firstNumber !== '' && operator === '') {
         objMath.firstNumber += value;
      } else {
         objMath.secondNumber += value;
      }
   }
   updateDisplay();
}

function inputOperator(value) {
   const {firstNumber, operator, secondNumber, calculated} = objMath;
   if (!calculated) {
      if (firstNumber === 'ERROR') {
         return;
      } else if (firstNumber === '') {
         if (value === "-") {
            objMath.firstNumber = "-";
         } else {
            return;
         }
      } else if (operator === '') {
         objMath.operator = value;
      } else {
         if (secondNumber !== '') {
            calculate();
         } else {
            objMath.operator = value;
         }
      }
   }
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

   if (target.classList.contains('equal')) {
      calculate();
      return;
   }

   if (target.classList.contains('clear-all')) {
      clearAll();
      return;
   }
});