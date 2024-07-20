import numberToWords from "number-to-words";

export const makeLakhs = (num) => {
    const crores = Math.floor(num / 10000000);
    const lakhs = Math.floor((num % 10000000) / 100000);
    const thousands=Math.floor((num %lakhs/1000))
    const remainder = num % 100000;

    let result = "";
    if (crores > 0) result += `${numberToWords.toWords(crores)} Crores `;
    if (lakhs > 0) result += `${numberToWords.toWords(lakhs)} Lakhs `;
    if (thousands > 0) result += `${numberToWords.toWords(remainder)} `;
    if (remainder > 0) result += `${numberToWords.toWords(remainder)}`

    return result.trim();
  };