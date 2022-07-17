export const numberFormatter = (number: number, currency = ''): string => {
  return currency + number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')
}
