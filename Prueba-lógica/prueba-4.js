function generateRandomNumbers(quantity = 100) {
  const { min, max } = { min: 10, max: 20 };
  const numbers = [];

  while (numbers.length < quantity) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    numbers.push(randomNumber);
  }

  return numbers;
}

function validateIfTheNumberIsPrime(number) {
  for (let i = 2, sqrt = Math.sqrt(number); i <= sqrt; i++) {
    if (number % i === 0) {
      return false;
    }
  }
  return number > 1;
}

function generateFibonacci(quantity) {
  let x = 1;
  let y = 0;
  let result;
  const numbers = [];
  for (let index = 0; index < quantity; index++) {
    result = x + y;
    numbers.push(result);
    y = x;
    x = result;
  }

  console.log("Números generados: " + numbers.join(", "));
}

function runConsoleApp() {
  const generatedPrimeNumbers = [];
  const randomNumbers = generateRandomNumbers();

  randomNumbers.forEach((number) => {
    if (validateIfTheNumberIsPrime(number)) generatedPrimeNumbers.push(number);
  });

  const maxPrime = Math.max(...generatedPrimeNumbers);
  const quantity = generatedPrimeNumbers.filter((x) => x == maxPrime).length;

  generateFibonacci(quantity);
}

runConsoleApp();
