const fs = require("fs");

fs.readFile("nissar.txt", "utf-8", (err, data) => {
  if (err) { console.log(err) }
  let nissar = data.split("\n\n");
  const biggestEnergy = nissar.reduce((prevBiggest, nisse, index) => {
    const totalSum = nisse.split("\n").reduce((total, count) => {
      return total + Number(count)
    }, 0)
    if (totalSum > prevBiggest.count) {
      //Add
      return {name: `Nisse${index + 1}`, count: totalSum}
    }
    return prevBiggest
  }, {name: "", count: 0})
  const nisseEnergies = [];
  nissar.forEach((nisse, index) => {
    const totalSum = nisse.split("\n").reduce((total, count) => {
      return total + Number(count)
    }, 0)
    nisseEnergies.push(totalSum);
  })
  const sortedNisseEnergies = nisseEnergies.sort((a, b) => b - a);
  const top3 = sortedNisseEnergies.reduce((total, count, index) => {
    if (index <= 2) {
      return total + count;
    }
    return total;
  }, 0)
  console.log(top3)
})