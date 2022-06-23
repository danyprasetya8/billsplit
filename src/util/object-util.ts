const arrayContainAny = (source = [], target = []) => {
  const result = source.filter(item => target.indexOf(item) > -1)
  return result.length
}

export { arrayContainAny }
