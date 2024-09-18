export const convertPrice = (price: number) => {
  return price.toLocaleString('ru-RU', {
    style: 'currency',
    currency: 'UAH',
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: 0,
  });
};
