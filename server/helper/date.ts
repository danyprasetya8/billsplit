export const normalizeDate = (epoch: number) => {
  const date = new Date(epoch)
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  return date
}
