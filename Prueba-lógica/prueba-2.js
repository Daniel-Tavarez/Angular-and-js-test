function generatePrimeNumbers(count = 9) {
  const generatedPrimeNumbers = [];
  let number = 2;

  while (generatedPrimeNumbers.length < count) {
    if (validateIfTheNumberIsPrime(number)) {
      generatedPrimeNumbers.push(number);
    }
    number++;
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

  if (answer < 1 || count == 0) {
    console.log("La cantidad no puede ser menor a 1, intente de nuevo");
    readLine.close();
    return;
  }

  const primeNumbers = generatePrimeNumbers(count);
  console.log("Los números primos son: ", primeNumbers.join(", "));

  rl.close();
});
