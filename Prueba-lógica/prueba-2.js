function generateRandomNumber() {
  const { min, max } = { min: 1, max: 5000 };
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}

function generatePrimeNumbers(count = 9) {
  const generatedPrimeNumbers = [];
  let number = generateRandomNumber();

  while (generatedPrimeNumbers.length < count) {
    if (validateIfTheNumberIsPrime(number)) {
      generatedPrimeNumbers.push(number);
    }
    number = generateRandomNumber();
  }

  return generatedPrimeNumbers;
}

function validateIfTheNumberIsPrime(number) {
  for (let i = 2, sqrt = Math.sqrt(number); i <= sqrt; i++) {
    if (number % i === 0) {
      return false;
    }
  }
  return number > 1;
}

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Ingrese la cantidad de números primos a generar: ", (answer) => {
  const count = parseInt(answer, 10) || 9;

  const primeNumbers = generatePrimeNumbers(count);
  console.log("Los números primos son: ", primeNumbers.join(", "));

  rl.close();
});
