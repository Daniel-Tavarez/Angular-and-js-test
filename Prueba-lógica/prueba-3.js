const denominations = [
  { name: "billete/s de 2000 Pesos", value: 2000 },
  { name: "billete/s de 1000 Pesos", value: 1000 },
  { name: "billete/s de 500 Pesos", value: 500 },
  { name: "billete/s de 200 Pesos", value: 200 },
  { name: "billete/s de 100 Pesos", value: 100 },
  { name: "billete/s de 50 Pesos", value: 50 },
  { name: "moneda/s de 25 Pesos", value: 25 },
  { name: "moneda/s de 10 Pesos", value: 10 },
  { name: "moneda/s de 5 Pesos", value: 5 },
  { name: "moneda/s de 1 Peso", value: 1 },
];

function calculateDenominations(amount) {
  const result = {};

  for (const denomination of denominations) {
    const count = Math.floor(amount / denomination.value);
    if (count > 0) {
      result[denomination.name] = count;
      amount -= count * denomination.value;
    }
  }

  return result;
}

function runConsoleApp() {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readline.question("Ingrese el monto total: ", (amount) => {
    const denominations = calculateDenominations(amount);

    for (const denomination in denominations) {
      console.log(`${denominations[denomination]} ${denomination}`);
    }

    readline.close();
  });
}

runConsoleApp();
