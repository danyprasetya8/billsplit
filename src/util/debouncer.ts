const debouncerIds: { [key: string]: NodeJS.Timeout } = {}

export default function debounce (func: () => any, delay: number, id: string = '') {
  const debouncerId: string = func + id
  clearTimeout(debouncerIds[debouncerId])
  debouncerIds[debouncerId] = setTimeout(func, delay)
}
