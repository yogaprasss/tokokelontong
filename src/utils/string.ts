import dayjs from 'dayjs';

export const capitalizeWord = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1, word.length);
}

export const formatCurrency = (value: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  return formatter.format(value);
};

export const isoDateToString = (isoDate: string) => {
  const date = dayjs(isoDate);
  return date.format('D MMMM YYYY');
}