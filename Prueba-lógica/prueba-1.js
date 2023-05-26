function generateRandomNumbers(quantity = 5) {
  const { min, max } = { min: 1, max: 100 };
  const numbers = [];

  while (numbers.length < quantity) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!numbers.includes(randomNumber)) numbers.push(randomNumber);
  }

  return numbers;
}

function runConsoleApp() {
  const readline = require("readline");

  const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readLine.question(
    "Introduzca la cantidad de números a generar: ",
    (answer) => {
      const quantity = parseInt(answer) || 5;

      if (quantity < 1) {
        console.log("La cantidad no puede ser menor a 1, intente de nuevo");
        readLine.close();
        return;
      }

      if (quantity > 20) {
        console.log(
          "No es posible agregar más de 20 números, intente de nuevo"
        );
        readLine.close();
        return;
      }

      const randomNumbers = generateRandomNumbers(quantity);
      console.log("Números generados:", randomNumbers.join(", "));
      readLine.close();
    }
  );
}

runConsoleApp();
