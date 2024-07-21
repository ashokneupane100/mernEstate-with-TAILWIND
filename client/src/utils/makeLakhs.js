import numberToWords from 'number-to-words';

export const makeLakhs = (num) => {
  const crores = Math.floor(num / 10000000);
  const lakhs = Math.floor((num % 10000000) / 100000);
  const thousands = Math.floor((num % 100000) / 1000);
  const remainder = num % 1000;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  let result = "";

  if (crores > 0) {
    const croresText = capitalizeFirstLetter(numberToWords.toWords(crores));
    result += crores === 1
      ? `${croresText} Crore `
      : `${croresText} Crores `;
  }

  if (lakhs > 0) {
    const lakhsText = capitalizeFirstLetter(numberToWords.toWords(lakhs));
    result += lakhs === 1
      ? `${lakhsText} Lakh `
      : `${lakhsText} Lakhs `;
  }

  if (thousands > 0) {
    const thousandsText = capitalizeFirstLetter(numberToWords.toWords(thousands));
    result += thousands === 1
      ? `${thousandsText} Thousand `
      : `${thousandsText} Thousands `;
  }

  if (remainder > 0) {
    result += `${capitalizeFirstLetter(numberToWords.toWords(remainder))}`;
  }

  return result.trim();
};
