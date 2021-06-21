const formatNumbersCSVToNumbersArr = (numbers) =>
  numbers.split(';').map((numberStr) => parseInt(numberStr, 10))

module.exports = formatNumbersCSVToNumbersArr
